"use client"

import { useEffect, useMemo, useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useListings } from "@/components/ui/lib/leaderboard-store"
import { buildPriceHistory } from "@/components/ui/lib/history"

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function BidChart() {
  const listings = useListings()

  // ── Mounted guard: never call buildPriceHistory during prerender ──
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const top5 = listings.slice(0, 5)

  const chartConfig = useMemo<ChartConfig>(() => {
    const c: ChartConfig = {}
    top5.forEach((l, i) => {
      c[l.id] = { label: l.title, color: CHART_COLORS[i] }
    })
    return c
  }, [top5])

  // Only compute the history after hydration
  const data = useMemo(
    () => (mounted ? buildPriceHistory(listings) : []),
    [mounted, listings]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Price history · last 7 days</CardTitle>
      </CardHeader>
      <CardContent>
        {!mounted ? (
          <Skeleton className="h-[320px] w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[320px] w-full">
            <LineChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={64}
                tickFormatter={(v) =>
                  v >= 1_00_000
                    ? `₹${(v / 1_00_000).toFixed(1)}L`
                    : `₹${(v / 1_000).toFixed(0)}k`
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="line"
                    formatter={(v) =>
                      `₹${new Intl.NumberFormat("en-IN").format(Number(v))}`
                    }
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              {top5.map((l, i) => (
                <Line
                  key={l.id}
                  type="monotone"
                  dataKey={l.id}
                  stroke={CHART_COLORS[i]}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive
                />
              ))}
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}