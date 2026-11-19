export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError
}

// Known error codes from the backend
export const ErrorCodes = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  RATE_LIMITED: "RATE_LIMITED",
  QUOTE_STALE: "QUOTE_STALE",
  IDEMPOTENCY_CONFLICT: "IDEMPOTENCY_CONFLICT",
  PAYMENT_FAILED: "PAYMENT_FAILED",
} as const