import type { PaiseString } from "@/components/types/api";


export function paiseToInr(paise: PaiseString | bigint): number {
  return Number(paise) / 100
}


export function formatPaise(
  paise: PaiseString | bigint,
  opts: { compact?: boolean } = {}
): string {
  const inr = paiseToInr(paise)
  if (opts.compact) {
    if (inr >= 1_00_00_000) return `₹${(inr / 1_00_00_000).toFixed(2)}Cr`
    if (inr >= 1_00_000) return `₹${(inr / 1_00_000).toFixed(2)}L`
    if (inr >= 1_000) return `₹${(inr / 1_000).toFixed(1)}k`
    return `₹${inr.toFixed(0)}`
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr)
}


export function inrToPaise(inr: number): PaiseString {
  return Math.round(inr * 100).toString()
}


export function formatInr(
  inr: number,
  opts: { compact?: boolean } = {}
): string {
  if (opts.compact) {
    if (inr >= 1_00_00_000) return `₹${(inr / 1_00_00_000).toFixed(2)}Cr`
    if (inr >= 1_00_000) return `₹${(inr / 1_00_000).toFixed(2)}L`
    if (inr >= 1_000) return `₹${(inr / 1_000).toFixed(1)}k`
    return `₹${inr.toFixed(0)}`
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr)
}