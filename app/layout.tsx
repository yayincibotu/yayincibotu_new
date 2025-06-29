import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import RootLayoutContent from "@/components/root-layout-content"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YayinciBotu - Tüm Platformlar için Sosyal Medya Hizmetleri",
  description:
    "Twitch, Instagram, YouTube, TikTok ve daha fazlası için takipçi, izlenme ve etkileşim hizmetleri. Gerçek ve organik sosyal medya büyümesi için YayinciBotu.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <RootLayoutContent>
              {children}
            </RootLayoutContent>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
