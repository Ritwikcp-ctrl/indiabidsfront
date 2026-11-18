"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { formatInr } from "@/components/ui/lib/format"
import { mockListings } from "@/components/ui/lib/mock"

const HYPOTHETICAL_BID = 1_500

export function Mirror() {
  const [url, setUrl] = useState("")
  const [preview, setPreview] = useState<null | { rank: number; gapToFirst: number }>(null)

  function handlePreview(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    const sorted = [...mockListings].sort((a, b) => b.totalPaidInr - a.totalPaidInr)
    const rank = sorted.filter((l) => l.totalPaidInr >= HYPOTHETICAL_BID).length + 1
    const gap = sorted[0].totalPaidInr - HYPOTHETICAL_BID

    setPreview({ rank, gapToFirst: gap })
  }

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">The Mirror</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          See where you'd land.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Drop your URL. No payment yet — just a preview.
        </p>

        <form onSubmit={handlePreview} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yoursite.in"
            className="h-11"
            aria-label="Your website URL"
          />
          <Button type="submit" size="lg" className="h-11 shrink-0">
            Preview →
          </Button>
        </form>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <Card className="border-primary/30 bg-primary/[0.03]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-base font-black tabular-nums">
                      #{preview.rank}
                    </Badge>
                    <div>
                      <p className="font-semibold">{url}</p>
                      <p className="text-xs text-muted-foreground">
                        Hypothetical first bid · {formatInr(HYPOTHETICAL_BID)}
                      </p>
                    </div>
                  </div>
                  <p className="text-right text-sm text-muted-foreground">Not live yet</p>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Distance to #1</span>
                    <span className="tabular-nums">{formatInr(preview.gapToFirst)}</span>
                  </div>
                  <Progress
                    value={Math.max(
                      6,
                      100 - (preview.gapToFirst / mockListings[0].totalPaidInr) * 100
                    )}
                  />
                </div>

                <p className="mt-4 text-sm text-muted-foreground">
                  You're <strong className="text-foreground">{formatInr(preview.gapToFirst)}</strong> away
                  from the crown. Claim this spot to make it real.
                </p>

                <Button className="mt-4 w-full sm:w-auto">Claim this rank →</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}