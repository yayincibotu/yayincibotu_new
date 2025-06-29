"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEventListener, useLocalStorage, useMediaQuery } from "usehooks-ts"
import {
  Search,
  ShoppingCart,
  LogIn,
  User,
  Bell,
  Settings,
  Menu,
  X,
  ChevronDown,
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
  Clock,
  ChevronRight,
  Sun,
  Moon,
  Globe,
  Heart,
  TrendingUp,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import SmartSearch from "@/components/search/smart-search"
import AuthAvatar from "@/components/auth/auth-avatar"

const platforms = [
  { name: "Twitch", href: "/twitch", icon: Twitch, color: "text-purple-400", trending: true },
  { name: "Kick", href: "/kick", icon: Monitor, color: "text-green-400", trending: false },
  { name: "Instagram", href: "/instagram", icon: Instagram, color: "text-pink-400", trending: true },
  { name: "Youtube", href: "/youtube", icon: Youtube, color: "text-red-400", trending: true },
  { name: "Tiktok", href: "/tiktok", icon: Video, color: "text-black dark:text-white", trending: true },
  { name: "Facebook", href: "/facebook", icon: Facebook, color: "text-blue-400", trending: false },
  { name: "Discord", href: "/discord", icon: MessageSquare, color: "text-indigo-400", trending: false },
  { name: "Spotify", href: "/spotify", icon: Music, color: "text-green-400", trending: false },
  { name: "(X) Twitter", href: "/twitter", icon: Twitter, color: "text-black dark:text-white", trending: false },
]

interface HeaderV2Props {
  // No props needed - authentication handled by AuthAvatar component
}

export default function HeaderV2({}: HeaderV2Props) {
  // State management
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTopbar, setShowTopbar] = useLocalStorage('show-topbar', true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')

  // Performance optimized scroll handler
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled)
    }
  }, [isScrolled])

  // Throttled scroll listener
  useEventListener('scroll', handleScroll)

  // Close mobile menu on desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }, [isMobile, isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Keyboard shortcuts
  useEventListener('keydown', (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setIsSearchFocused(true)
    }
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false)
      setIsSearchFocused(false)
    }
  })

  return (
    <>
      {/* Promotional Topbar */}
      <AnimatePresence>
        {showTopbar && (
          <motion.div
            initial={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white relative overflow-hidden"
          >
            <div className="container h-auto md:h-[45px] flex flex-col md:flex-row items-center justify-between py-2 md:py-0 gap-2 md:gap-0">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="hidden md:flex items-center justify-center bg-purple-700/50 backdrop-blur-sm rounded-full h-7 w-7">
                  <Gift className="h-3.5 w-3.5 text-purple-200" />
                </div>
                <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                  <span className="text-sm font-medium md:mr-3">
                    <span className="hidden md:inline">Özel Kampanya:</span> 
                    <span className="md:hidden">🎁</span> Tüm paketlerde %20 indirim
                  </span>
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-xs font-bold text-white border-0 mt-1 md:mt-0">
                    YENI20
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-0">
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
                  aria-label="Kampanya mesajını kapat"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
            <div className="absolute top-0 left-1/4 w-8 h-8 bg-purple-500/10 rounded-full blur-xl" />
            <div className="absolute top-0 right-1/3 w-12 h-12 bg-purple-400/10 rounded-full blur-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 1)'
        }}
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200 backdrop-blur-md border-b",
          isScrolled ? "shadow-sm" : "",
        )}
      >
        <div className="container flex h-14 md:h-16 items-center justify-between gap-2 md:gap-4">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menüyü aç"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative group">
            <motion.div
              className="relative py-1.5 px-2 md:px-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-lg md:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">
                    Yayıncı<span className="text-foreground">Botu</span>
                  </span>
                </div>
                <div className="hidden md:flex items-center space-x-1 -mt-1">
                  <div className="h-px w-8 bg-gradient-to-r from-purple-500 to-transparent"></div>
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium">
                    Premium Services
                  </span>
                  <div className="h-px w-8 bg-gradient-to-l from-blue-500 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Search */}
          {!isMobile && (
            <div className="flex-1 flex items-center gap-2 mx-4 max-w-md">
              <div className="relative flex w-full items-center">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Platform ara... (⌘K)"
                  className="pl-9 pr-12 bg-background/60 border-border/50 focus:border-purple-400 transition-colors cursor-pointer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 h-6 w-6"
                  onClick={() => setIsSearchFocused(true)}
                >
                  <Filter className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Mobile Search Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setIsSearchFocused(true)}
              aria-label="Arama"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Desktop Actions */}
          <div className="flex-shrink-0 flex items-center gap-1 md:gap-2">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500">
                3
              </Badge>
            </Button>

            {/* Shopping Cart */}
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <ShoppingCart className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-purple-600">
                0
              </Badge>
            </Button>

            {/* Authentication Avatar */}
            <AuthAvatar 
              showNotificationBadge={true}
              notificationCount={3}
            />
          </div>
        </div>
      </motion.header>

      {/* Platform Navigation */}
      <div className="w-full border-b bg-background/95 backdrop-blur-md z-30 sticky top-14 md:top-16">
        <div className="container py-2">
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {platforms.map((platform) => (
              <DropdownMenu key={platform.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm flex items-center gap-1.5 group relative">
                    <platform.icon className={cn("h-4 w-4 transition-colors", platform.color)} />
                    {platform.name}
                    {platform.trending && (
                      <Badge variant="secondary" className="h-4 px-1.5 text-[10px] bg-red-500 text-white">
                        HOT
                      </Badge>
                    )}
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`${platform.href}/paket`} className="w-full flex items-center gap-2">
                      <Heart className="h-3 w-3" />
                      Premium Paketler
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-0 top-0 h-full w-72 bg-background border-r shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-semibold">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Platformlar</span>
                  {platforms.map((platform) => (
                    <Link
                      key={platform.name}
                      href={platform.href}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <platform.icon className={cn("h-5 w-5", platform.color)} />
                      <span>{platform.name}</span>
                      {platform.trending && (
                        <Badge variant="secondary" className="h-4 px-1.5 text-[10px] bg-red-500 text-white ml-auto">
                          HOT
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smart Search Modal */}
      <SmartSearch
        isOpen={isSearchFocused}
        onClose={() => setIsSearchFocused(false)}
        autoFocus
      />
    </>
  )
} 