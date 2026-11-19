import { api } from "./client"
import type { Board, BoardMembership } from "@/components/types/api";

export async function listBoards(params?: {
  categoryId?: string
  city?: string
  state?: string
}): Promise<Board[]> {
  const q = new URLSearchParams()
  if (params?.categoryId) q.set("categoryId", params.categoryId)
  if (params?.city) q.set("city", params.city)
  if (params?.state) q.set("state", params.state)
  const suffix = q.toString() ? `?${q}` : ""
  const data = await api<{ boards: Board[] }>(`/boards${suffix}`)
  return data.boards
}

export async function getBoard(key: string): Promise<Board> {
  return api<Board>(`/boards/${encodeURIComponent(key)}`)
}

export async function joinBoard(input: {
  boardId: string
  businessId: string
}): Promise<BoardMembership> {
  return api<BoardMembership>(`/boards/${input.boardId}/memberships`, {
    method: "POST",
    body: { businessId: input.businessId },
  })
}