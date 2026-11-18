import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/components/ui/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IndiaBids — The live leaderboard for Indian builders",
  description:
    "Bid for rank. Own the board. The live leaderboard for Indian startups, D2C brands, and indie makers.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, geistSans.variable, geistMono.variable)}
    >
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}