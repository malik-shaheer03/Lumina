import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Lumina",
  description: "Discover the world's most stunning wallpapers with Lumina. Premium quality, cinematic experience.",
  icons: {
    icon: [
      { url: "/your-logo.ico", sizes: "any" },
      { url: "/your-logo.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/your-logo.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Your logo favicon references */}
        <link rel="icon" type="image/x-icon" href="/your-logo.ico" />
        <link rel="icon" type="image/png" href="/your-logo.png" />
        <link rel="shortcut icon" href="/your-logo.ico" />

        {/* Cache busting - change v=1 to v=2 if still not showing */}
        <link rel="icon" href="/your-logo.ico?v=1" />
      </head>
      <body className={`${poppins.variable} ${inter.variable}`}>{children}</body>
    </html>
  )
}
