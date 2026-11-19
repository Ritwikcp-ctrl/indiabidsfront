import { api } from "./client"
import type { LeaderboardEntry, Quote } from "@/components/types/api";

export async function getQuote(input: {
  boardId: string
  businessId: string
}): Promise<Quote> {
  const data = await api<{ quote: Quote }>(
    `/bids/${input.boardId}/quote`,
    { method: "POST", body: { businessId: input.businessId } }
  )
  return data.quote
}

export async function getLeaderboard(
  boardId: string,
  limit = 50
): Promise<LeaderboardEntry[]> {
  const data = await api<{ leaderboard: LeaderboardEntry[] }>(
    `/bids/${boardId}/leaderboard?limit=${limit}`,
    { method: "GET" }
  )
  return data.leaderboard
}