import { api } from "./client"
import type { Business } from "@/components/types/api";

export type CreateBusinessInput = {
  name: string
  categoryId: string
  description?: string
  websiteUrl?: string
  city?: string
  state?: string
  country?: string
}

export async function listMyBusinesses(): Promise<Business[]> {
  const data = await api<{ businesses: Business[] }>("/businesses?mine=1")
  return data.businesses
}

export async function createBusiness(input: CreateBusinessInput): Promise<Business> {
  return api<Business>("/businesses", { method: "POST", body: input })
}

export async function getBusiness(id: string): Promise<Business> {
  return api<Business>(`/businesses/${id}`)
}