import { api } from "./client"
import type { PaymentOrder, PaymentStatus, PaymentVerifyResult, PaiseString } from "@/components/types/api";

/**
 * Create a Razorpay order on the backend.
 * The Idempotency-Key header prevents double-charges on double-clicks.
 */
export async function createPaymentOrder(input: {
  businessId: string
  boardId: string
  amountPaise: PaiseString
  idempotencyKey: string
}): Promise<PaymentOrder> {
  const { idempotencyKey, ...body } = input
  return api<PaymentOrder>("/payments/orders", {
    method: "POST",
    body,
    headers: { "Idempotency-Key": idempotencyKey },
  })
}

/**
 * Verify a Razorpay payment after checkout. Returns the final status.
 * The webhook is the source of truth — this just gives the user
 * immediate feedback.
 */
export async function verifyPayment(input: {
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
}): Promise<PaymentVerifyResult> {
  return api<PaymentVerifyResult>("/payments/verify", {
    method: "POST",
    body: input,
  })
}

export async function getPayment(id: string): Promise<{
  id: string
  status: PaymentStatus
  amountPaise: PaiseString
}> {
  return api(`/payments/${id}`)
}