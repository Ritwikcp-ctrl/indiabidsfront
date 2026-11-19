"use client"

import { useSyncExternalStore } from "react"
import type { Listing } from "@/components/types/mock"
import { mockListings } from "@/components/ui/lib/mock"

const STORAGE_KEY = "indiabids:listings"

function getSnapshot(): Listing[] {
  if (typeof window === "undefined") return mockListings
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return mockListings
    return JSON.parse(raw) as Listing[]
  } catch {
    return mockListings
  }
}

function getServerSnapshot(): Listing[] {
  return mockListings
}

let listeners: Array<() => void> = []

function emit() {
  listeners.forEach((l) => l())
}

export function subscribe(listener: () => void) {
  listeners.push(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) emit()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
    window.removeEventListener("storage", onStorage)
  }
}

function persist(listings: Listing[]) {
  const ranked = [...listings]
    .sort(
      (a, b) =>
        b.totalPaidInr - a.totalPaidInr ||
        a.createdAt.localeCompare(b.createdAt)
    )
    .map((l, i) => ({ ...l, rank: i + 1 }))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ranked))
  emit()
}

export function useListings(): Listing[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function addListing(listing: Listing) {
  const current = getSnapshot()
  persist([...current, listing])
}

export function updateListing(id: string, patch: Partial<Listing>) {
  const current = getSnapshot()
  persist(current.map((l) => (l.id === id ? { ...l, ...patch } : l)))
}

export function removeListing(id: string) {
  const current = getSnapshot()
  persist(current.filter((l) => l.id !== id))
}

export function resetStore() {
  localStorage.removeItem(STORAGE_KEY)
  emit()
}