"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatInr } from "@/components/ui/lib/format"
import { mockBattles, mockListings } from "@/components/ui/lib/mock";

export function TensionFeed() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.8fr_1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Live battles</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">Root for the underdog.</h2>

          <div className="mt-8 space-y-4">
            {mockBattles.map((b) => {
              const total = b.left.totalPaidInr + b.right.totalPaidInr
              const leftPct = (b.left.totalPaidInr / total) * 100

              return (
                <Card key={b.id}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{b.left.avatarInitial}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{b.left.title}</span>
                        <span className="text-xs text-muted-foreground">vs</span>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{b.right.avatarInitial}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{b.right.title}</span>
                      </div>
                      <Badge variant="outline" className="tabular-nums">
                        {formatInr(b.left.totalPaidInr)} · {formatInr(b.right.totalPaidInr)}
                      </Badge>
                    </div>
                    <Progress value={leftPct} className="mt-4" />
                    <p className="mt-2 text-xs text-muted-foreground">Battle ends in 22h</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Today's ladder
              </div>
              <Separator className="my-4" />
              <ScrollArea className="h-[420px] pr-2">
                <ol className="space-y-3">
                  {mockListings.slice(0, 10).map((l) => (
                    <li key={l.id} className="flex items-center justify-between gap-2 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-5 text-right text-xs text-muted-foreground tabular-nums">
                          {l.rank}
                        </span>
                        <span className="truncate">{l.title}</span>
                      </span>
                      <span className="tabular-nums font-medium">
                        {formatInr(l.totalPaidInr)}
                      </span>
                    </li>
                  ))}
                </ol>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  )
}