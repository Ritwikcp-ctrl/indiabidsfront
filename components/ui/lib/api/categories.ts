import { api } from "./client"
import type { Category } from "@/components/types/api";

export async function listCategories(): Promise<Category[]> {
  const data = await api<{ categories: Category[] }>("/categories", {
    method: "GET",
  })
  return data.categories
}
