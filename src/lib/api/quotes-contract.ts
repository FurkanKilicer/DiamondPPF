/**
 * POST /api/quotes sözleşmesi.
 *
 * Başarı: 201
 * { ok: true, data: { id: string, createdAt: string } }
 *
 * Doğrulama / geçersiz JSON: 400
 * { ok: false, error: { code: "VALIDATION_ERROR", message, fields? } }
 *
 * Extra / bilinmeyen alanlar (id, status, created_at dahil): Zod strictObject → 400
 *
 * Beklenmeyen Origin: 403
 * { ok: false, error: { code: "FORBIDDEN", message } }
 *
 * Aşırı büyük gövde: 413
 * { ok: false, error: { code: "PAYLOAD_TOO_LARGE", message } }
 *
 * Rate limit aşıldı: 429 + Retry-After
 * { ok: false, error: { code: "RATE_LIMITED", message } }
 *
 * Yapılandırma yok (SUPABASE_* veya üretimde Upstash eksik / rate-limit servisi düşmüş): 503
 * { ok: false, error: { code: "NOT_CONFIGURED", message } }
 * Sahte 201 dönülmez. Üretimde rate limit yoksa fail-closed (istek kabul edilmez).
 *
 * Beklenmeyen / veritabanı hatası: 500
 * { ok: false, error: { code: "INTERNAL_ERROR", message } }
 * İstemciye SQL / stack / ortam değerleri gitmez.
 */

export const quoteApi = {
  method: "POST",
  path: "/api/quotes",
  successStatus: 201,
  errorStatus: {
    validation: 400,
    forbiddenOrigin: 403,
    payloadTooLarge: 413,
    rateLimited: 429,
    notConfigured: 503,
    internal: 500,
  },
} as const;
