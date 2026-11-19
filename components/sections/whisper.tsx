"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/components/ui/lib/utils"
import { Separator } from "@/components/ui/separator"
import { formatInr } from "@/components/ui/lib/money"
import { useLivePrice } from "@/components/sections/hooks/use-live-price"

export function Whisper() {
  const { current } = useLivePrice(284_700, 900, 8_000)

  return (
    <section className="px-6 pb-16 pt-12">
      <Separator />
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 pt-10 text-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="tabular-nums">12 people claimed today</span>
        </div>

        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
          The board doesn't wait.
        </h2>
        <p className="text-muted-foreground">
          Top bid is <strong className="text-foreground tabular-nums">{formatInr(current)}</strong>.
          Someone will outbid it today.
        </p>

       <Link
  href="/bid"
  className={cn(buttonVariants({ size: "lg" }), "group")}
>
  Claim your spot
  <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
    →
  </span>
</Link>

        <p className="text-xs text-muted-foreground">
          Privacy · Terms · Refund policy · Contact
        </p>
      </div>
    </section>
  )
}