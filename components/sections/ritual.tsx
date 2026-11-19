"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { formatInr } from "@/components/ui/lib/money"
import { categories } from "@/components/ui/lib/mock"

const steps = ["Battlefield", "Stake", "Sign"] as const

export function Ritual() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState<string | null>(null)
  const [stake, setStake] = useState(1_500)
  const [url, setUrl] = useState("")
  const [handle, setHandle] = useState("")

  function reset() {
    setStep(0)
    setCategory(null)
    setStake(1_500)
    setUrl("")
    setHandle("")
  }

  return (
    <section className="px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">The Ritual</p>
      <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Claim your rank.</h2>
      <p className="mt-3 text-muted-foreground">
        Three steps. No account. The board updates instantly.
      </p>

      <Button size="lg" className="mt-8" onClick={() => setOpen(true)}>
        Start the claim →
      </Button>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset() }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Step {step + 1} / 3 · {steps[step]}
            </DialogTitle>
          </DialogHeader>

          <Progress value={((step + 1) / 3) * 100} className="mb-4" />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <Card
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`cursor-pointer p-3 text-sm ${
                        category === c ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      {c}
                    </Card>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Set your stake. You can raise it later by paying the difference.
                  </p>
                  <Slider
                    value={[stake]}
                    min={499}
                    max={50_000}
                    step={100}
                    onValueChange={(v) => setStake(Array.isArray(v) ? v[0] : v)}
                  />
                  <p className="text-center text-2xl font-black tabular-nums">
                    {formatInr(stake)}
                  </p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <Input
                    placeholder="https://yoursite.in"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <Input
                    placeholder="@yourhandle"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    You'll pay {formatInr(stake)} via Razorpay (UPI, cards, netbanking).
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Back
            </Button>

            {step < 2 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 0 && !category}
              >
                Next
              </Button>
            ) : (
              <Button disabled={!url || !handle}>Confirm claim</Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}