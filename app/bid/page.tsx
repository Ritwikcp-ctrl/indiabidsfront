"use client"

import Link from "next/link"
import { Toaster } from "@/components/ui/sonner"
import { Leaderboard } from "./leaderboards"
import { BidChart } from "./bid-chart"
import { BidForm } from "./bid-form"

export default function BidPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="font-black tracking-tight">
            IndiaBids
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link
              href="/admin"
              className="text-muted-foreground/60 hover:text-muted-foreground"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            The board
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Every bid. Every rank.
          </h1>
          <p className="mt-2 text-muted-foreground">
            Raise your bid to climb. Raise again to stay. Nothing expires.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
          <div className="space-y-8">
            <BidChart />
            <Leaderboard />
          </div>
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <BidForm />
          </aside>
        </div>
      </main>

      <Toaster position="top-right" richColors />
    </div>
  )
}