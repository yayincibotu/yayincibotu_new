"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLocalStorage } from "usehooks-ts"
import {
  Search,
  X,
  Clock,
  TrendingUp,
  Star,
  Filter,
  Command,
  ArrowRight,
  Hash,
  DollarSign,
  Users,
  Eye,
  Heart,
  Zap,
  Flame,
  Award,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface SearchSuggestion {
  id: string
  type: 'platform' | 'service' | 'package' | 'trending'
  title: string
  subtitle?: string
  icon?: React.ElementType
  color?: string
  price?: string
  popularity?: number
  trending?: boolean
  category?: string
}

interface SmartSearchProps {
  isOpen: boolean
  onClose: () => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

const platforms = [
  { name: "Twitch", icon: "🎮", color: "text-purple-500", category: "Gaming" },
  { name: "Instagram", icon: "📸", color: "text-pink-500", category: "Social" },
  { name: "YouTube", icon: "📺", color: "text-red-500", category: "Video" },
  { name: "TikTok", icon: "🎵", color: "text-black", category: "Short Video" },
  { name: "Facebook", icon: "👥", color: "text-blue-500", category: "Social" },
  { name: "Twitter", icon: "🐦", color: "text-sky-500", category: "Microblog" },
  { name: "Discord", icon: "💬", color: "text-indigo-500", category: "Gaming" },
  { name: "Kick", icon: "⚡", color: "text-green-500", category: "Gaming" },
  { name: "Spotify", icon: "🎧", color: "text-green-600", category: "Music" },
]

const trendingServices = [
  { title: "Twitch İzleyici", subtitle: "Canlı yayın izleyici artırma", price: "₺12.99", popularity: 95, trending: true },
  { title: "Instagram Takipçi", subtitle: "Organik takipçi kazanma", price: "₺8.50", popularity: 88, trending: true },
  { title: "YouTube İzlenme", subtitle: "Video izlenme artırma", price: "₺15.00", popularity: 82, trending: false },
  { title: "TikTok Beğeni", subtitle: "Video beğeni paketleri", price: "₺5.99", popularity: 79, trending: true },
  { title: "Discord Üye", subtitle: "Sunucu üye artırma", price: "₺20.00", popularity: 75, trending: false },
]

const recentSearches = [
  "Twitch izleyici",
  "Instagram takipçi",
  "YouTube like",
  "Discord boost",
  "TikTok izlenme"
]

const searchCategories = [
  { name: "Platformlar", icon: Hash, count: 9 },
  { name: "İzleyici Artırma", icon: Eye, count: 24 },
  { name: "Takipçi Paketleri", icon: Users, count: 18 },
  { name: "Beğeni Hizmetleri", icon: Heart, count: 31 },
  { name: "Premium Paketler", icon: Award, count: 12 },
]

export default function SmartSearch({ isOpen, onClose, placeholder = "Platform, hizmet veya paket ara...", className, autoFocus = false }: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [recentSearchHistory, setRecentSearchHistory] = useLocalStorage<string[]>('recent-searches', [])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter suggestions based on query
  const filteredSuggestions = useCallback(() => {
    if (!query.trim()) return []

    const searchTerm = query.toLowerCase()
    const suggestions: SearchSuggestion[] = []

    // Platform suggestions
    platforms.forEach(platform => {
      if (platform.name.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          id: `platform-${platform.name}`,
          type: 'platform',
          title: platform.name,
          subtitle: platform.category,
          color: platform.color,
        })
      }
    })

    // Service suggestions
    trendingServices.forEach(service => {
      if (service.title.toLowerCase().includes(searchTerm) || service.subtitle.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          id: `service-${service.title}`,
          type: 'service',
          title: service.title,
          subtitle: service.subtitle,
          price: service.price,
          popularity: service.popularity,
          trending: service.trending,
        })
      }
    })

    return suggestions.slice(0, 8)
  }, [query])

  // Handle search submission
  const handleSearch = useCallback((searchTerm: string) => {
    if (searchTerm.trim()) {
      // Add to recent searches
      const updatedHistory = [searchTerm, ...recentSearchHistory.filter(item => item !== searchTerm)].slice(0, 5)
      setRecentSearchHistory(updatedHistory)
      
      console.log('Searching for:', searchTerm)
      onClose()
    }
  }, [recentSearchHistory, setRecentSearchHistory, onClose])

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen && autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, autoFocus])

  const suggestions = filteredSuggestions()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "fixed top-4 left-4 right-4 md:top-16 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-2xl",
              "bg-background/95 backdrop-blur-xl border shadow-2xl rounded-xl z-50",
              className
            )}
          >
            {/* Search Header */}
            <div className="flex items-center gap-3 p-4 border-b">
              <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 border-0 bg-transparent p-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search Content */}
            <div className="max-h-96 overflow-auto">
              {/* Search Results */}
              {query.trim() ? (
                <div className="p-2">
                  {suggestions.length > 0 ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Arama Sonuçları ({suggestions.length})
                        </h4>
                      </div>
                      {suggestions.map((suggestion, index) => (
                        <motion.div
                          key={suggestion.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50"
                          onClick={() => handleSearch(suggestion.title)}
                        >
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                              {suggestion.title.charAt(0)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium truncate">{suggestion.title}</p>
                              {suggestion.trending && (
                                <Badge variant="secondary" className="h-5 px-1.5 gap-1">
                                  <Flame className="h-3 w-3" />
                                  <span className="text-xs">Trend</span>
                                </Badge>
                              )}
                            </div>
                            {suggestion.subtitle && (
                              <p className="text-sm text-muted-foreground truncate">
                                {suggestion.subtitle}
                              </p>
                            )}
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-2">
                            {suggestion.price && (
                              <Badge variant="outline" className="text-xs">
                                {suggestion.price}
                              </Badge>
                            )}
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Sonuç bulunamadı</h3>
                      <p className="text-sm text-muted-foreground">
                        "{query}" için arama sonucu bulunamadı.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-2 space-y-4">
                  {/* Recent Searches */}
                  {recentSearchHistory.length > 0 && (
                    <div className="space-y-2">
                      <div className="px-3 py-2 flex items-center justify-between">
                        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Son Aramalar
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => setRecentSearchHistory([])}
                        >
                          Temizle
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {recentSearchHistory.map((search, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => handleSearch(search)}
                          >
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="flex-1 text-sm">{search}</span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                      <Separator />
                    </div>
                  )}

                  {/* Trending Services */}
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Trend Hizmetler
                      </h4>
                    </div>
                    <div className="space-y-1">
                      {trendingServices.slice(0, 4).map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleSearch(service.title)}
                        >
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                            <Flame className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{service.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{service.subtitle}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{service.price}</Badge>
                            {service.trending && (
                              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Quick Access Platforms */}
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Popüler Platformlar
                      </h4>
                    </div>
                    <div className="grid grid-cols-3 gap-2 px-2">
                      {platforms.slice(0, 6).map((platform) => (
                        <div
                          key={platform.name}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleSearch(platform.name)}
                        >
                          <div className="text-2xl">{platform.icon}</div>
                          <span className="text-xs font-medium text-center">{platform.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Footer */}
            <div className="border-t p-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Command className="h-3 w-3" />
                    ⌘K ile aç/kapat
                  </span>
                </div>
                <span>ESC ile kapat</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 