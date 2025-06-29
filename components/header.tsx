"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  ShoppingCart,
  LogIn,
  Twitch,
  Monitor,
  Instagram,
  Youtube,
  Video,
  Facebook,
  MessageSquare,
  Music,
  Twitter,
  Gift,
  ChevronRight,
  Clock,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const platforms = [
  { name: "Twitch", href: "/twitch", icon: Twitch },
  { name: "Kick", href: "/kick", icon: Monitor },
  { name: "Instagram", href: "/instagram", icon: Instagram },
  { name: "Youtube", href: "/youtube", icon: Youtube },
  { name: "Tiktok", href: "/tiktok", icon: Video },
  { name: "Facebook", href: "/facebook", icon: Facebook },
  { name: "Discord", href: "/discord", icon: MessageSquare },
  { name: "Spotify", href: "/spotify", icon: Music },
  { name: "(X) Twitter", href: "/twitter", icon: Twitter },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTopbar, setShowTopbar] = useState(true)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 10)
    })
  }

  return (
    <>
      {showTopbar && (
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white relative">
          <div className="container h-[45px] flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center justify-center bg-purple-700/50 backdrop-blur-sm rounded-full h-7 w-7">
                <Gift className="h-3.5 w-3.5 text-purple-200" />
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-3">
                  <span className="hidden md:inline">Özel Kampanya:</span> Tüm paketlerde %20 indirim
                </span>
                <span className="bg-white/10 backdrop-blur-sm text-xs font-bold py-1 px-2 rounded-md">YENI20</span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="hidden md:flex items-center mr-4">
                <Clock className="h-3.5 w-3.5 text-purple-200 mr-1.5" />
                <span className="text-xs text-purple-200">Kampanya bitimine: 2 gün 5 saat</span>
              </div>
              <Button
                variant="link"
                size="sm"
                className="text-purple-200 hover:text-white p-0 h-auto text-xs font-medium"
              >
                Detaylar
                <ChevronRight className="h-3 w-3 ml-0.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-purple-200 hover:text-white hover:bg-transparent ml-2"
                onClick={() => setShowTopbar(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
          <div className="absolute top-0 left-1/4 w-8 h-8 bg-purple-500/10 rounded-full blur-xl" />
          <div className="absolute top-0 right-1/3 w-12 h-12 bg-purple-400/10 rounded-full blur-xl" />
        </div>
      )}

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-background",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex-shrink-0 relative group">
            <div className="relative flex items-center">
              {/* Background glow effect */}
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Logo container */}
              <div className="relative py-1.5 px-3">
                {/* Text part with sophisticated styling */}
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">
                      Yayıncı<span className="text-foreground">Botu</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 -mt-1">
                    <div className="h-px w-8 bg-gradient-to-r from-purple-500 to-transparent"></div>
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium">
                      Premium Services
                    </span>
                    <div className="h-px w-8 bg-gradient-to-l from-blue-500 to-transparent"></div>
                  </div>
                </div>

                {/* Animated border effect */}
                <div className="absolute -inset-px rounded-lg">
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute -inset-[100%] animate-[spin_8s_linear_infinite] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="flex-1 flex items-center gap-4 mx-4">
            <div className="relative flex w-full items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Platformunuzu Seçin" className="pl-8 bg-background/60" />
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white">
                0
              </span>
            </Button>
            <Button variant="outline" className="hidden sm:flex gap-2">
              <LogIn className="h-4 w-4" />
              Giriş Yap
            </Button>
            <Button className="hidden sm:flex">Kaydol</Button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "w-full border-b transition-all duration-200 bg-background/95 backdrop-blur-md z-40 sticky top-16",
          isScrolled ? "shadow-sm" : "",
        )}
      >
        <div className="container py-2">
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {platforms.map((platform) => (
              <DropdownMenu key={platform.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm flex items-center gap-1.5 group">
                    <platform.icon className="h-4 w-4 text-purple-400 group-hover:text-purple-500 transition-colors" />
                    {platform.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem>
                    <Link href={`${platform.href}/izleyici`} className="w-full">
                      {platform.name} İzleyici
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`${platform.href}/takipci`} className="w-full">
                      {platform.name} Takipçi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`${platform.href}/begeni`} className="w-full">
                      {platform.name} Beğeni
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
