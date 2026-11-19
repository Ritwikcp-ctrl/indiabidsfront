import type {
  Battle,
  Category,
  Listing,
  Winner,
} from "@/components/types/mock"

export const categories: Category[] = [
  "AI & Agents",
  "D2C & E-commerce",
  "Developer Tools",
  "Fintech & Payments",
  "SaaS for SMEs",
  "EdTech & Creator Tools",
  "Marketing & SEO",
  "Crypto & Web3",
]

export const mockListings: Listing[] = [
  { id: "1", rank: 1, url: "https://zerodha.com", title: "Zerodha", description: "India's largest stock broker.", category: "Fintech & Payments", totalPaidInr: 284_700, todayDeltaInr: 1_500, createdAt: "2026-11-10T09:00:00+05:30", avatarInitial: "Z", isVerified: true },
  { id: "2", rank: 2, url: "https://cred.club", title: "CRED", description: "Credit card bill payments, reimagined.", category: "Fintech & Payments", totalPaidInr: 251_000, todayDeltaInr: 900, createdAt: "2026-11-09T11:00:00+05:30", avatarInitial: "C", isVerified: true },
  { id: "3", rank: 3, url: "https://zepto.com", title: "Zepto", description: "10-minute grocery delivery.", category: "D2C & E-commerce", totalPaidInr: 198_800, todayDeltaInr: 1_200, createdAt: "2026-11-11T14:00:00+05:30", avatarInitial: "Zp", isVerified: true },
  { id: "4", rank: 4, url: "https://groww.in", title: "Groww", description: "Investing made simple.", category: "Fintech & Payments", totalPaidInr: 164_200, todayDeltaInr: 400, createdAt: "2026-11-08T10:00:00+05:30", avatarInitial: "G", isVerified: false },
  { id: "5", rank: 5, url: "https://meesho.com", title: "Meesho", description: "Reseller commerce for Bharat.", category: "D2C & E-commerce", totalPaidInr: 142_500, todayDeltaInr: 300, createdAt: "2026-11-07T16:00:00+05:30", avatarInitial: "M", isVerified: false },
  { id: "6", rank: 6, url: "https://shiprocket.in", title: "Shiprocket", description: "Shipping for e-commerce sellers.", category: "SaaS for SMEs", totalPaidInr: 118_300, todayDeltaInr: 0, createdAt: "2026-11-06T09:00:00+05:30", avatarInitial: "S", isVerified: true },
  { id: "7", rank: 7, url: "https://khatabook.com", title: "Khatabook", description: "Digital ledger for small businesses.", category: "SaaS for SMEs", totalPaidInr: 94_000, todayDeltaInr: 0, createdAt: "2026-11-05T12:00:00+05:30", avatarInitial: "K", isVerified: false },
  { id: "8", rank: 8, url: "https://paisabazaar.com", title: "Paisabazaar", description: "Compare loans and credit cards.", category: "Fintech & Payments", totalPaidInr: 81_500, todayDeltaInr: 0, createdAt: "2026-11-04T15:00:00+05:30", avatarInitial: "P", isVerified: false },
  { id: "9", rank: 9, url: "https://supertails.com", title: "Supertails", description: "Pet care, delivered.", category: "D2C & E-commerce", totalPaidInr: 67_200, todayDeltaInr: 0, createdAt: "2026-11-03T11:00:00+05:30", avatarInitial: "St", isVerified: false },
  { id: "10", rank: 10, url: "https://zoho.in", title: "Zoho", description: "The operating system for business.", category: "SaaS for SMEs", totalPaidInr: 52_000, todayDeltaInr: 0, createdAt: "2026-11-02T10:00:00+05:30", avatarInitial: "Zo", isVerified: true },
]

export const mockBattles: Battle[] = [
  { id: "b1", left: mockListings[0], right: mockListings[1], endsAt:""},
  { id: "b2", left: mockListings[2], right: mockListings[3], endsAt: "" },
]

export const mockWinners: Winner[] = [
  { id: "w1", name: "Ananya", handle: "ananya_builds", quote: "I made #1 in 3 days. The board did the marketing.", avatarInitial: "A", rankAchieved: 1, category: "D2C & E-commerce" },
  { id: "w2", name: "Rohit", handle: "rohitcodes", quote: "My SaaS jumped 400% in signups the week I took #3.", avatarInitial: "R", rankAchieved: 3, category: "SaaS for SMEs" },
  { id: "w3", name: "Priya", handle: "priyadesigns", quote: "The board changed my launch. Investors saw it.", avatarInitial: "P", rankAchieved: 2, category: "EdTech & Creator Tools" },
  { id: "w4", name: "Karan", handle: "karanfintech", quote: "Worth every rupee. The visibility is unreal.", avatarInitial: "K", rankAchieved: 4, category: "Fintech & Payments" },
]