import { quoteApi } from "@/lib/api/quotes-contract";
import { jsonError, jsonOk } from "@/lib/http/api-response";
import { BodyLimitError, InvalidJsonError, readJsonObject } from "@/lib/http/json-body";
import { isAllowedQuoteOrigin } from "@/lib/http/origin";
import { enforceQuoteRateLimit, type QuoteRateLimitGate, type RateLimitEnv } from "@/lib/rate-limit/quote-rate-limit";
import { insertQuoteRequest, QuotesInsertError, QuotesNotConfiguredError } from "@/lib/services/quotes";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { formatQuoteValidationError, quoteRequestSchema } from "@/lib/validations/quote";
import type { QuoteCreateResult, QuoteRequestRecord } from "@/types/quote";

export type CreateQuoteDeps = {
  insertQuote: (record: QuoteRequestRecord) => Promise<QuoteCreateResult>;
  isConfigured: () => boolean;
  env: NodeJS.ProcessEnv;
  checkRateLimit: (request: Request, env: RateLimitEnv) => Promise<QuoteRateLimitGate>;
};

const defaultDeps: CreateQuoteDeps = {
  insertQuote: insertQuoteRequest,
  isConfigured: isSupabaseConfigured,
  env: process.env,
  checkRateLimit: enforceQuoteRateLimit,
};

export async function handleCreateQuote(
  request: Request,
  deps: Partial<CreateQuoteDeps> = {},
): Promise<Response> {
  const resolved: CreateQuoteDeps = { ...defaultDeps, ...deps };

  if (!isAllowedQuoteOrigin(request, resolved.env)) {
    return jsonError(
      quoteApi.errorStatus.forbiddenOrigin,
      "FORBIDDEN",
      "İstek kaynağı kabul edilmedi.",
    );
  }

  const rateLimit = await resolved.checkRateLimit(request, resolved.env);
  if (!rateLimit.ok) return rateLimit.response;

  let body: Record<string, unknown>;
  try {
    body = await readJsonObject(request);
  } catch (error) {
    if (error instanceof BodyLimitError) {
      return jsonError(
        quoteApi.errorStatus.payloadTooLarge,
        "PAYLOAD_TOO_LARGE",
        "İstek gövdesi çok büyük.",
      );
    }
    if (error instanceof InvalidJsonError) {
      return jsonError(quoteApi.errorStatus.validation, "VALIDATION_ERROR", "Geçersiz JSON gövdesi.");
    }
    return jsonError(
      quoteApi.errorStatus.internal,
      "INTERNAL_ERROR",
      "Teklif kaydı tamamlanamadı. Lütfen tekrar deneyin.",
    );
  }

  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(
      quoteApi.errorStatus.validation,
      "VALIDATION_ERROR",
      "Gönderilen bilgiler doğrulanamadı.",
      formatQuoteValidationError(parsed.error),
    );
  }

  if (!resolved.isConfigured()) {
    return jsonError(
      quoteApi.errorStatus.notConfigured,
      "NOT_CONFIGURED",
      "Teklif kaydı şu anda kullanılamıyor.",
    );
  }

  try {
    const data = await resolved.insertQuote(parsed.data);
    return jsonOk(quoteApi.successStatus, data);
  } catch (error) {
    if (error instanceof QuotesNotConfiguredError) {
      return jsonError(
        quoteApi.errorStatus.notConfigured,
        "NOT_CONFIGURED",
        "Teklif kaydı şu anda kullanılamıyor.",
      );
    }
    if (error instanceof QuotesInsertError) {
      return jsonError(
        quoteApi.errorStatus.internal,
        "INTERNAL_ERROR",
        "Teklif kaydı tamamlanamadı. Lütfen tekrar deneyin.",
      );
    }
    console.error("[quotes] unexpected handler error");
    return jsonError(
      quoteApi.errorStatus.internal,
      "INTERNAL_ERROR",
      "Teklif kaydı tamamlanamadı. Lütfen tekrar deneyin.",
    );
  }
}
