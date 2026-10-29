export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "PAYLOAD_TOO_LARGE"
  | "NOT_CONFIGURED"
  | "INTERNAL_ERROR";

export type ApiErrorBody = {
  ok: false;
  error: {
    code: ApiErrorCode;
    message: string;
    fields?: Record<string, string>;
  };
};

export type ApiSuccessBody<T> = {
  ok: true;
  data: T;
};

export type ApiBody<T> = ApiSuccessBody<T> | ApiErrorBody;
