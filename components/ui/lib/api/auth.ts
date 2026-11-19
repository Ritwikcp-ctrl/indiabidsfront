import { api } from "./client"
import { setAccessToken, clearAccessToken } from "./token"
import type { AuthTokens, User } from "@/components/types/api";

export async function login(input: { email: string; password: string }) {
  const data = await api<AuthTokens & { user: User }>("/auth/login", {
    method: "POST",
    body: input,
    skipAuth: true,
  })
  setAccessToken(data.accessToken)
  return data
}

export async function register(input: { email: string; password: string }) {
  const data = await api<AuthTokens & { user: User }>("/auth/register", {
    method: "POST",
    body: input,
    skipAuth: true,
  })
  setAccessToken(data.accessToken)
  return data
}

export async function logout() {
  try {
    await api<{ ok: true }>("/auth/logout", { method: "POST" })
  } finally {
    clearAccessToken()
  }
}

export async function getMe(): Promise<User> {
  return api<User>("/auth/me")
}