// components/ui/lib/history.ts
import type { Listing } from "@/components/types/mock"

export type PricePoint = Record<string, string | number>

/**
 * Simulates a 7-day price history ending today.
 * Each day back is ~5% cheaper — good enough until a real event log exists.
 *
 * ⚠️ Contains Date.now() — MUST be called only after the component has
 * mounted on the client (see the `mounted` guard in bid-chart.tsx).
 * Calling it during render/prerender triggers Next.js 16's
 * "unstable value" error.
 */
export function buildPriceHistory(
  listings: Listing[],
  days = 7
): PricePoint[] {
  const top5 = listings.slice(0, 5)
  if (top5.length === 0) return []

  const points: PricePoint[] = []
  const now = Date.now()

  for (let d = days - 1; d >= 0; d--) {
    const date = new Date(now - d * 86_400_000)
    const label = date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    })
    const point: PricePoint = { date: label }
    top5.forEach((l) => {
      const factor = 1 - d * 0.05
      point[l.id] = Math.round(l.totalPaidInr * factor)
    })
    points.push(point)
  }
  return points
}