import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { quoteApi } from "@/lib/api/quotes-contract";
import { jsonError } from "@/lib/http/api-response";

/** IP başına POST /api/quotes: 5 istek / 10 dakika (kaydırmalı pencere). */
export const quoteRateLimitWindow = {
  max: 5,
  duration: "10 m",
} as const;

export type QuoteRateLimitGate = { ok: true } | { ok: false; response: Response };

export type RateLimitEnv = {
  NODE_ENV?: string;
  VERCEL?: string;
  RATE_LIMIT_TRUST_PROXY?: string;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
};

let cached: Ratelimit | null = null;

export function isRateLimitConfigured(env: RateLimitEnv = process.env) {
  return Boolean(env.UPSTASH_REDIS_REST_URL?.trim() && env.UPSTASH_REDIS_REST_TOKEN?.trim());
}

export function isProductionEnv(env: RateLimitEnv = process.env) {
  return (env.NODE_ENV ?? "development") === "production";
}

/**
 * x-forwarded-for yalnızca Vercel veya RATE_LIMIT_TRUST_PROXY=true iken.
 * Aksi halde paylaşılan "unknown" kovası (spoof ile limit aşmayı engeller).
 */
export function quoteClientIp(request: Request, env: RateLimitEnv = process.env): string {
  const trust = env.VERCEL === "1" || env.RATE_LIMIT_TRUST_PROXY === "true";
  if (!trust) return "unknown";

  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (!first || first.length > 64) return "unknown";
  return first;
}

function retryAfterSeconds(resetMs: number) {
  const sec = Math.ceil((resetMs - Date.now()) / 1000);
  return Number.isFinite(sec) && sec > 0 ? sec : 60;
}

async function hashedIdentifier(ip: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`quotes:${ip}`));
  const bytes = new Uint8Array(digest).subarray(0, 12);
  let hex = "";
  for (const byte of bytes) hex += byte.toString(16).padStart(2, "0");
  return `quotes:${hex}`;
}

function getRatelimit(env: RateLimitEnv): Ratelimit {
  if (cached) return cached;
  const url = env.UPSTASH_REDIS_REST_URL?.trim() ?? "";
  const token = env.UPSTASH_REDIS_REST_TOKEN?.trim() ?? "";
  cached = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(quoteRateLimitWindow.max, quoteRateLimitWindow.duration),
    prefix: "diamondppf:quotes",
    analytics: false,
    timeout: 2000,
  });
  return cached;
}

export function resetQuoteRateLimitCache() {
  cached = null;
}

function unavailableResponse() {
  return jsonError(
    quoteApi.errorStatus.notConfigured,
    "NOT_CONFIGURED",
    "Teklif kaydı şu anda kullanılamıyor.",
  );
}

export async function enforceQuoteRateLimit(
  request: Request,
  env: RateLimitEnv = process.env,
): Promise<QuoteRateLimitGate> {
  if (!isRateLimitConfigured(env)) {
    if (isProductionEnv(env)) {
      return { ok: false, response: unavailableResponse() };
    }
    return { ok: true };
  }

  try {
    const identifier = await hashedIdentifier(quoteClientIp(request, env));
    const result = await getRatelimit(env).limit(identifier);

    // Varsayılan Upstash timeout'u isteği geçirir; kamuya açık form için fail-closed.
    if (result.reason === "timeout") {
      console.error("[quotes] rate limit unavailable");
      return { ok: false, response: unavailableResponse() };
    }

    if (!result.success) {
      const retryAfter = retryAfterSeconds(result.reset);
      return {
        ok: false,
        response: jsonError(
          quoteApi.errorStatus.rateLimited,
          "RATE_LIMITED",
          "Çok fazla deneme. Lütfen bir süre sonra tekrar deneyin.",
          undefined,
          { "Retry-After": String(retryAfter) },
        ),
      };
    }

    return { ok: true };
  } catch {
    console.error("[quotes] rate limit unavailable");
    return { ok: false, response: unavailableResponse() };
  }
}
