"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { mockWinners } from "@/components/ui/lib/mock"

export function Hall() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">The Hall</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          People like you took the crown.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mockWinners.slice(0, 4).map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{w.avatarInitial}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{w.name}</p>
                      <p className="text-xs text-muted-foreground">@{w.handle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">“{w.quote}”</p>
                  <Badge variant="secondary" className="mt-auto w-fit">
                    #{w.rankAchieved} · {w.category}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
