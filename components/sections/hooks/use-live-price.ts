"use client"

import { useEffect, useState } from "react"

export function useLivePrice(start: number, step = 700, interval = 4000) {
  const [state, setState] = useState({ current: start, previous: start })

  useEffect(() => {
    const id = setInterval(() => {
      setState((s) => ({
        current: s.current + Math.floor(Math.random() * step) + 100,
        previous: s.current,
      }))
    }, interval)
    return () => clearInterval(id)
  }, [step, interval])

  return state
}