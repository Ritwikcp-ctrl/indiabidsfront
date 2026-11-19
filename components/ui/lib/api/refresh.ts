import { env } from "@/components/ui/lib/env";
import { setAccessToken } from "./token"

let inflight: Promise<string | null> | null = null

/**
 * Calls POST /auth/refresh. Only one request is in flight at a time;
 * concurrent callers share the same promise.
 * Returns the new access token, or null if refresh failed.
 */
export function refreshAccessToken(): Promise<string | null> {
  if (inflight) return inflight

  inflight = (async () => {
    try {
      const res = await fetch(`${env.apiUrl}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) {
        setAccessToken(null)
        return null
      }
      const json = await res.json().catch(() => null)
      const token = json?.data?.accessToken
      if (typeof token !== "string") {
        setAccessToken(null)
        return null
      }
      setAccessToken(token)
      return token
    } catch {
      setAccessToken(null)
      return null
    } finally {
      inflight = null
    }
  })()

  return inflight
}