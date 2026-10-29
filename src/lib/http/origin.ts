/**
 * Same-origin form koruması. Origin kimlik doğrulama veya spam filtresi değildir.
 *
 * Politika:
 * - Origin (yoksa Referer origin) allowlist’teyse kabul.
 * - Allowlist: NEXT_PUBLIC_SITE_URL origin’i, bu isteğin deployment origin’i,
 *   ve üretim dışı ortamda localhost / 127.0.0.1:3000.
 * - Origin ve Referer yok: üretimde reddet; geliştirmede (curl, birim test) kabul.
 */
export function configuredSiteOrigins(env: NodeJS.ProcessEnv = process.env): string[] {
  const raw = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return [];
  try {
    return [new URL(raw).origin];
  } catch {
    return [];
  }
}

export function developmentOrigins(env: NodeJS.ProcessEnv = process.env): string[] {
  if ((env.NODE_ENV ?? "development") === "production") return [];
  return ["http://localhost:3000", "http://127.0.0.1:3000"];
}

export function requestDeploymentOrigin(request: Request): string | null {
  try {
    return new URL(request.url).origin;
  } catch {
    return null;
  }
}

export function headerOrigin(request: Request): string | null {
  const origin = request.headers.get("origin")?.trim();
  if (origin) return origin;
  const referer = request.headers.get("referer")?.trim();
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

export function isAllowedQuoteOrigin(request: Request, env: NodeJS.ProcessEnv = process.env): boolean {
  const reported = headerOrigin(request);
  const allowed = new Set<string>([
    ...configuredSiteOrigins(env),
    ...developmentOrigins(env),
  ]);
  const deployment = requestDeploymentOrigin(request);
  if (deployment) allowed.add(deployment);

  if (reported) return allowed.has(reported);
  return (env.NODE_ENV ?? "development") !== "production";
}
