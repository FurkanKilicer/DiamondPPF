export const QUOTE_BODY_MAX_BYTES = 16 * 1024;

export class BodyLimitError extends Error {
  constructor() {
    super("payload_too_large");
    this.name = "BodyLimitError";
  }
}

export class InvalidJsonError extends Error {
  constructor() {
    super("invalid_json");
    this.name = "InvalidJsonError";
  }
}

export async function readJsonObject(
  request: Request,
  maxBytes = QUOTE_BODY_MAX_BYTES,
): Promise<Record<string, unknown>> {
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const size = Number(contentLength);
    if (Number.isFinite(size) && size > maxBytes) {
      throw new BodyLimitError();
    }
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    throw new BodyLimitError();
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text) as unknown;
  } catch {
    throw new InvalidJsonError();
  }

  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new InvalidJsonError();
  }

  return parsed as Record<string, unknown>;
}
