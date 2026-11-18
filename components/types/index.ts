export type Category =
  | "AI & Agents"
  | "D2C & E-commerce"
  | "Developer Tools"
  | "Fintech & Payments"
  | "SaaS for SMEs"
  | "EdTech & Creator Tools"
  | "Marketing & SEO"
  | "Crypto & Web3"

export type Listing = {
  id: string
  rank: number
  url: string
  title: string
  description: string
  category: Category
  totalPaidInr: number
  todayDeltaInr: number
  createdAt: string
  avatarInitial: string
  isVerified: boolean
}

export type Battle = {
  id: string
  left: Listing
  right: Listing
  endsAt: string
}

export type Winner = {
  id: string
  name: string
  handle: string
  quote: string
  avatarInitial: string
  rankAchieved: number
  category: Category
}