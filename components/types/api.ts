
export type ApiSuccess<T> = { success: true; data: T }
export type ApiFailure = {
  success: false
  error: { code: string; message: string }
}
export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure


export type PaiseString = string


export type UserRole = "USER" | "ADMIN"
export type UserStatus = "ACTIVE" | "SUSPENDED"

export type User = {
  id: string
  email: string
  role: UserRole
  status: UserStatus
}

export type AuthTokens = {
  accessToken: string
  accessTokenExpiresAt?: string
}


export type Category = {
  id: string
  name: string
  slug: string
}


export type Business = {
  id: string
  ownerId: string
  name: string
  slug: string
  description: string | null
  websiteUrl: string | null
  categoryId: string | null
  city: string | null
  state: string | null
  country: string | null
}


export type Board = {
  id: string
  key: string
  name: string
  categoryId: string
  city: string | null
  state: string | null
  country: string | null
  minBidPaise: PaiseString
  bidIncrementPaise: PaiseString
}

export type BoardMembership = {
  id: string
  boardId: string
  businessId: string
  totalSpendPaise: PaiseString
  lastBidAt: string | null
}


export type Quote = {
  board: { id: string; key: string; name: string }
  business: { id: string; name: string }
  currentSpend: { paise: PaiseString; inr: string }
  competitor: {
    businessId: string
    businessName: string
    totalSpend: { paise: PaiseString; inr: string }
  } | null
  alreadyLeading: boolean
  minimumAdditionalBid: { paise: PaiseString; inr: string }
  rules: {
    minimumFirstBidPaise: PaiseString
    bidIncrementPaise: PaiseString
  }
}

export type LeaderboardEntry = {
  rank: number
  businessId: string
  businessName: string
  slug: string
  totalSpendPaise: PaiseString
  lastBidAt: string | null
}

export type PaymentStatus =
  | "CREATED"
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | "REFUNDED"

export type PaymentOrder = {
  paymentId: string
  providerOrderId: string
  amountPaise: PaiseString
  currency: "INR"
  razorpayKeyId: string
}

export type PaymentVerifyResult = {
  paymentId: string
  status: PaymentStatus
}