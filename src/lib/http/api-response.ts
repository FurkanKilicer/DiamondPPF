import type { ApiBody, ApiErrorCode } from "@/types/api";

export function jsonOk<T>(status: number, data: T): Response {
  const body: ApiBody<T> = { ok: true, data };
  return Response.json(body, { status });
}

export function jsonError(
  status: number,
  code: ApiErrorCode,
  message: string,
  fields?: Record<string, string>,
  headers?: HeadersInit,
): Response {
  const body: ApiBody<never> = {
    ok: false,
    error: fields ? { code, message, fields } : { code, message },
  };
  return Response.json(body, { status, headers });
}
