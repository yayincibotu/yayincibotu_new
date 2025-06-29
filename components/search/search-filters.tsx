"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Filter,
  X,
  Check,
  DollarSign,
  Users,
  Eye,
  Heart,
  Star,
  TrendingUp,
  Zap,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface SearchFiltersProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: SearchFilters) => void
  className?: string
}

export interface SearchFilters {
  platforms: string[]
  serviceTypes: string[]
  priceRange: [number, number]
  popularity: number
  trending: boolean
  premium: boolean
}

const platformOptions = [
  { id: "twitch", name: "Twitch", icon: "🎮", color: "text-purple-500" },
  { id: "instagram", name: "Instagram", icon: "📸", color: "text-pink-500" },
  { id: "youtube", name: "YouTube", icon: "📺", color: "text-red-500" },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "text-black" },
  { id: "facebook", name: "Facebook", icon: "👥", color: "text-blue-500" },
  { id: "twitter", name: "Twitter", icon: "🐦", color: "text-sky-500" },
  { id: "discord", name: "Discord", icon: "💬", color: "text-indigo-500" },
  { id: "kick", name: "Kick", icon: "⚡", color: "text-green-500" },
  { id: "spotify", name: "Spotify", icon: "🎧", color: "text-green-600" },
]

const serviceTypeOptions = [
  { id: "viewers", name: "İzleyici", icon: Eye, description: "Canlı yayın izleyici artırma" },
  { id: "followers", name: "Takipçi", icon: Users, description: "Organik takipçi kazanma" },
  { id: "likes", name: "Beğeni", icon: Heart, description: "İçerik beğeni artırma" },
  { id: "views", name: "İzlenme", icon: TrendingUp, description: "Video/içerik izlenme" },
  { id: "premium", name: "Premium", icon: Award, description: "Premium özel hizmetler" },
]

const defaultFilters: SearchFilters = {
  platforms: [],
  serviceTypes: [],
  priceRange: [0, 500],
  popularity: 0,
  trending: false,
  premium: false,
}

export default function SearchFilters({ isOpen, onClose, onApply, className }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters)
  const [activeTab, setActiveTab] = useState<'platforms' | 'services' | 'advanced'>('platforms')

  const handlePlatformToggle = (platformId: string) => {
    setFilters(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(id => id !== platformId)
        : [...prev.platforms, platformId]
    }))
  }

  const handleServiceTypeToggle = (serviceId: string) => {
    setFilters(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(serviceId)
        ? prev.serviceTypes.filter(id => id !== serviceId)
        : [...prev.serviceTypes, serviceId]
    }))
  }

  const handleApplyFilters = () => {
    onApply(filters)
    onClose()
  }

  const handleResetFilters = () => {
    setFilters(defaultFilters)
  }

  const hasActiveFilters = 
    filters.platforms.length > 0 ||
    filters.serviceTypes.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500 ||
    filters.popularity > 0 ||
    filters.trending ||
    filters.premium

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

          {/* Filter Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "fixed right-0 top-0 h-full w-96 max-w-[90vw] bg-background border-l shadow-2xl z-50 flex flex-col",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Gelişmiş Arama</h2>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="h-5 px-2">
                    {filters.platforms.length + filters.serviceTypes.length}
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b">
              {[
                { id: 'platforms', name: 'Platformlar', count: filters.platforms.length },
                { id: 'services', name: 'Hizmetler', count: filters.serviceTypes.length },
                { id: 'advanced', name: 'Gelişmiş', count: 0 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex-1 py-3 px-2 text-sm font-medium transition-colors relative",
                    activeTab === tab.id
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.name}
                  {tab.count > 0 && (
                    <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                      {tab.count}
                    </Badge>
                  )}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-auto p-4">
              <AnimatePresence mode="wait">
                {activeTab === 'platforms' && (
                  <motion.div
                    key="platforms"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-medium">Platform Seçimi</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {platformOptions.map((platform) => (
                        <div
                          key={platform.id}
                          onClick={() => handlePlatformToggle(platform.id)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                            filters.platforms.includes(platform.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-muted-foreground"
                          )}
                        >
                          <div className="text-xl">{platform.icon}</div>
                          <span className="flex-1 font-medium">{platform.name}</span>
                          {filters.platforms.includes(platform.id) && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'services' && (
                  <motion.div
                    key="services"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-medium">Hizmet Türleri</h3>
                    <div className="space-y-2">
                      {serviceTypeOptions.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => handleServiceTypeToggle(service.id)}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                            filters.serviceTypes.includes(service.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-muted-foreground"
                          )}
                        >
                          <service.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-muted-foreground">{service.description}</div>
                          </div>
                          {filters.serviceTypes.includes(service.id) && (
                            <Check className="h-4 w-4 text-primary mt-0.5" />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'advanced' && (
                  <motion.div
                    key="advanced"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Price Range */}
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Fiyat Aralığı
                      </h3>
                      <div className="px-2">
                        <Slider
                          value={filters.priceRange}
                          onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                          min={0}
                          max={500}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                          <span>₺{filters.priceRange[0]}</span>
                          <span>₺{filters.priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Popularity */}
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Minimum Popülerlik
                      </h3>
                      <div className="px-2">
                        <Slider
                          value={[filters.popularity]}
                          onValueChange={(value) => setFilters(prev => ({ ...prev, popularity: value[0] }))}
                          min={0}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                        <div className="text-center text-sm text-muted-foreground mt-2">
                          %{filters.popularity} ve üzeri
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Special Options */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Özel Seçenekler</h3>
                      
                      <div
                        onClick={() => setFilters(prev => ({ ...prev, trending: !prev.trending }))}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                          filters.trending
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <TrendingUp className="h-5 w-5 text-orange-500" />
                        <div className="flex-1">
                          <div className="font-medium">Trend Hizmetler</div>
                          <div className="text-sm text-muted-foreground">Popüler ve trend olan hizmetler</div>
                        </div>
                        {filters.trending && <Check className="h-4 w-4 text-primary" />}
                      </div>

                      <div
                        onClick={() => setFilters(prev => ({ ...prev, premium: !prev.premium }))}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                          filters.premium
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <Award className="h-5 w-5 text-yellow-500" />
                        <div className="flex-1">
                          <div className="font-medium">Premium Hizmetler</div>
                          <div className="text-sm text-muted-foreground">Yüksek kaliteli premium seçenekler</div>
                        </div>
                        {filters.premium && <Check className="h-4 w-4 text-primary" />}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t p-4 space-y-3">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  className="flex-1"
                  disabled={!hasActiveFilters}
                >
                  Sıfırla
                </Button>
                <Button
                  onClick={handleApplyFilters}
                  className="flex-1"
                >
                  Uygula
                </Button>
              </div>
              
              {hasActiveFilters && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    {filters.platforms.length + filters.serviceTypes.length} filtre aktif
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 