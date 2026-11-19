import { env } from "@/components/ui/lib/env";
import type { ApiEnvelope } from "@/components/types/api";
import { ApiError } from "./error";
import { refreshAccessToken } from "./refresh"
import { getAccessToken } from "./token"

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown
  /** Skip Authorization header (for /auth/login, /auth/register, /auth/refresh). */
  skipAuth?: boolean
  /** Internal — prevents infinite 401 loops. */
  _retried?: boolean
}

/**
 * The single fetch wrapper used by every API module.
 *
 * - Injects Authorization from the in-memory token store
 * - On 401, attempts a single refresh and retries once
 * - Unwraps `{ success, data }` envelope
 * - Throws `ApiError` on failure
 */
export async function api<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, skipAuth, _retried, headers: initHeaders, ...rest } = options

  const headers = new Headers(initHeaders)
  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }
  if (!skipAuth) {
    const token = getAccessToken()
    if (token) headers.set("Authorization", `Bearer ${token}`)
  }

  let res: Response
  try {
    res = await fetch(`${env.apiUrl}${path}`, {
      ...rest,
      headers,
      credentials: "include",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch (cause) {
    throw new ApiError(
      "NETWORK_ERROR",
      "Could not reach the server. Check your connection.",
      0
    )
  }

  // 401 → try a single refresh, then retry once
  if (res.status === 401 && !skipAuth && !_retried) {
    const newToken = await refreshAccessToken()
    if (newToken) {
      return api<T>(path, { ...options, _retried: true })
    }
  }

  const json = (await res.json().catch(() => null)) as ApiEnvelope<T> | null

  if (!res.ok || !json || json.success === false) {
    const code = json && json.success === false ? json.error.code : "UNKNOWN"
    const message =
      json && json.success === false
        ? json.error.message
        : `Request failed (${res.status})`
    throw new ApiError(code, message, res.status)
  }

  return json.data
}