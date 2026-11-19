"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/sonner"
import { useListings } from "@/components/ui/lib/leaderboard-store"
import { formatInr } from "@/components/ui/lib/money"
import { BidTable } from "./bid-table"

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const listings = useListings()

  function login(e: React.FormEvent) {
    e.preventDefault()
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "admin"
    if (password === expected) {
      setAuthed(true)
      setError("")
    } else {
      setError("Wrong password")
    }
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <Card className="w-full max-w-sm">
          <CardContent className="pt-6">
            <form onSubmit={login} className="space-y-4">
              <div>
                <h1 className="text-lg font-semibold">Admin access</h1>
                <p className="text-sm text-muted-foreground">
                  Enter the password to continue.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pw">Password</Label>
                <Input
                  id="pw"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>
              <Button type="submit" className="w-full">
                Unlock
              </Button>
              <Link
                href="/"
                className="block text-center text-xs text-muted-foreground hover:text-foreground"
              >
                ← Back to home
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalVolume = listings.reduce((s, l) => s + l.totalPaidInr, 0)
  const todayVolume = listings.reduce((s, l) => s + l.todayDeltaInr, 0)
  const topBid = listings[0]?.totalPaidInr ?? 0

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <span className="font-black tracking-tight">IndiaBids · Admin</span>
          <Button variant="ghost" size="sm" onClick={() => setAuthed(false)}>
            Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Listings", value: listings.length.toString() },
            { label: "Total volume", value: formatInr(totalVolume) },
            { label: "Today's volume", value: formatInr(todayVolume) },
            { label: "Top bid", value: formatInr(topBid) },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-1 text-2xl font-black tabular-nums">
                  {s.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <BidTable />
      </main>

      <Toaster position="top-right" richColors />
    </div>
  )
}