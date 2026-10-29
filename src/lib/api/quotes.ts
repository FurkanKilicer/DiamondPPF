import { quoteApi } from "@/lib/api/quotes-contract";
import type { ApiBody, ApiErrorBody } from "@/types/api";
import type { QuoteCreateResult, QuoteRequestInput } from "@/types/quote";

export type SubmitQuoteFailure = {
  ok: false;
  status: number;
  error: ApiErrorBody["error"];
};

export type SubmitQuoteResult = { ok: true; data: QuoteCreateResult } | SubmitQuoteFailure;

const networkError: SubmitQuoteFailure = {
  ok: false,
  status: 0,
  error: {
    code: "INTERNAL_ERROR",
    message: "Ağ hatası. Bağlantınızı kontrol edip tekrar deneyin.",
  },
};

function fallbackError(status: number): SubmitQuoteFailure["error"] {
  if (status === quoteApi.errorStatus.notConfigured) {
    return { code: "NOT_CONFIGURED", message: "Teklif kaydı şu anda kullanılamıyor." };
  }
  if (status === quoteApi.errorStatus.rateLimited) {
    return { code: "RATE_LIMITED", message: "Çok fazla deneme. Lütfen bir süre sonra tekrar deneyin." };
  }
  if (status === quoteApi.errorStatus.forbiddenOrigin) {
    return { code: "FORBIDDEN", message: "İstek kaynağı kabul edilmedi." };
  }
  if (status === quoteApi.errorStatus.payloadTooLarge) {
    return { code: "PAYLOAD_TOO_LARGE", message: "İstek gövdesi çok büyük." };
  }
  if (status === quoteApi.errorStatus.validation) {
    return { code: "VALIDATION_ERROR", message: "Gönderilen bilgiler doğrulanamadı." };
  }
  return { code: "INTERNAL_ERROR", message: "Teklif kaydı tamamlanamadı. Lütfen tekrar deneyin." };
}

export async function submitQuote(
  input: QuoteRequestInput,
  fetchFn: typeof fetch = fetch,
): Promise<SubmitQuoteResult> {
  let response: Response;
  try {
    response = await fetchFn(quoteApi.path, {
      method: quoteApi.method,
      credentials: "same-origin",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    return networkError;
  }

  let parsed: unknown;
  try {
    parsed = (await response.json()) as unknown;
  } catch {
    return { ok: false, status: response.status, error: fallbackError(response.status) };
  }

  const body = parsed as ApiBody<QuoteCreateResult>;
  if (body && body.ok === true && response.status === quoteApi.successStatus && body.data?.id && body.data.createdAt) {
    return {
      ok: true,
      data: {
        id: String(body.data.id),
        createdAt: String(body.data.createdAt),
      },
    };
  }

  if (body && body.ok === false && body.error?.code && body.error.message) {
    return {
      ok: false,
      status: response.status,
      error: {
        code: body.error.code,
        message: String(body.error.message),
        ...(body.error.fields ? { fields: body.error.fields } : {}),
      },
    };
  }

  return { ok: false, status: response.status, error: fallbackError(response.status) };
}
