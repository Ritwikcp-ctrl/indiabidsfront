"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/components/ui/lib/utils"

// ─────────────────────────────────────────────────────────────
// SlotDigit — a single digit that slides between values.
// Direction is inferred: 4→5 slides up, 7→4 slides down.
// ─────────────────────────────────────────────────────────────
function SlotDigit({ value, prevValue }: { value: string; prevValue?: string }) {
  const reduce = useReducedMotion()
  const prev = prevValue ?? value
  const direction = value >= prev ? 1 : -1

  if (reduce) return <span className="tabular-nums">{value}</span>

  return (
    <span
      className="relative inline-block overflow-hidden align-top"
      style={{ height: "1em", width: "0.62em", lineHeight: 1 }}
      aria-hidden="true"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: direction > 0 ? "100%" : "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: direction > 0 ? "-100%" : "100%" }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="absolute inset-0 flex items-center justify-center leading-none tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// Ticker — takes a formatted "₹2,84,700" string and splits it
// into animated digits + static separators. Right-aligned so
// the ones digit always lands in the same place when the number
// grows.
// ─────────────────────────────────────────────────────────────
function Ticker({ value, prevValue }: { value: string; prevValue?: string }) {
  const chars = value.split("")
  const prevChars = (prevValue ?? value).split("")
  const offset = prevChars.length - chars.length

  return (
    <>
      {chars.map((ch, i) => {
        const rawPrev = prevChars[i + offset]
        const prev = rawPrev && /\d/.test(rawPrev) ? rawPrev : ch
        const isDigit = ch >= "0" && ch <= "9"

        return isDigit ? (
          <SlotDigit key={`${i}-${ch}`} value={ch} prevValue={prev} />
        ) : (
          <span key={`${i}-${ch}`} className="tabular-nums">
            {ch}
          </span>
        )
      })}
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// Pulse — the hero. Live ₹ ticker, watcher pill, claimer avatars.
// ─────────────────────────────────────────────────────────────
const STARTING_PRICE = 284_700 // ₹2,84,700

export function Pulse() {
  const [state, setState] = useState({
    current: STARTING_PRICE,
    previous: STARTING_PRICE,
  })
  const reduce = useReducedMotion()

  // Fake live tick — replace with a websocket / SSE feed later
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setState(s => {
        const bump = Math.floor(Math.random() * 900) + 100
        return { current: s.current + bump, previous: s.current }
      })
    }, 4000)
    return () => clearInterval(id)
  }, [reduce])

  const formatter = useMemo(
    () => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }),
    []
  )
  const formatted = useMemo(
    () => `₹${formatter.format(state.current)}`,
    [formatter, state.current]
  )
  const prevFormatted = useMemo(
    () => `₹${formatter.format(state.previous)}`,
    [formatter, state.previous]
  )

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 py-20">
      {/* ambient glow — subtle warm halo behind the number */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.78_0.14_85_/_0.10)] blur-3xl" />
      </div>

      {/* live watchers pill */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Badge
          variant="outline"
          className="gap-2 rounded-full border-border/60 bg-background/60 px-3 py-1 text-xs font-normal backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="tabular-nums">4</span>
          <span className="text-muted-foreground">watching #1 right now</span>
        </Badge>
      </motion.div>

      {/* the number */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-10 flex flex-col items-center"
      >
        <div
          className={cn(
            "flex items-baseline font-black leading-[0.85] tracking-tighter tabular-nums",
            "text-[clamp(3rem,10vw,8rem)]"
          )}
          aria-live="polite"
          aria-label={`Top bid ${formatted}`}
        >
          <Ticker value={formatted} prevValue={prevFormatted} />
        </div>

        <p className="mt-5 max-w-md text-balance text-center text-base text-muted-foreground sm:text-lg">
          Someone&apos;s about to take the crown.
        </p>
      </motion.div>

      {/* recent claimers */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.5 },
          },
        }}
        className="mt-10 flex items-center gap-3"
      >
        <div className="flex -space-x-2">
          {[
            { name: "alpha", initial: "A" },
            { name: "beta", initial: "B" },
            { name: "gamma", initial: "G" },
          ].map(c => (
            <motion.div
              key={c.name}
              variants={{
                hidden: { opacity: 0, scale: 0.7, y: 6 },
                show: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              <Avatar className="h-8 w-8 ring-2 ring-background">
                <AvatarFallback className="bg-muted text-[11px] font-semibold">
                  {c.initial}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          just claimed · <span className="tabular-nums">12s</span> ago
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 0.5 }}
  className="mt-12 flex flex-col items-center gap-3 sm:flex-row"
>
  <a
    href="#tension-feed"
    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-w-44")}
  >
    Watch it happen
  </a>
  <Link
    href="/bid"
    className={cn(buttonVariants({ size: "lg" }), "group min-w-44")}
  >
    Jump in
    <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
      →
    </span>
  </Link>
</motion.div>
    </section>
  )
}