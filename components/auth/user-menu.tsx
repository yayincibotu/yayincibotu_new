"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Settings,
  Heart,
  ShoppingBag,
  Star,
  Award,
  CreditCard,
  Bell,
  LogOut,
  Crown,
  Zap,
  Eye,
  TrendingUp,
  Calendar,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserMenuProps {
  user: {
    id: string
    name: string
    email: string
    avatar?: string
    role: 'user' | 'admin'
    tier: 'free' | 'premium' | 'enterprise'
    isOnline?: boolean
    joinDate?: string
    stats?: {
      totalOrders: number
      totalSpent: number
      favoriteCount: number
      completionRate: number
    }
  }
  onSignOut: () => void
  className?: string
}

const tierInfo = {
  free: {
    name: "Free",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    icon: User,
    benefits: ["Temel hizmetler", "Sınırlı destek"]
  },
  premium: {
    name: "Premium",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    icon: Crown,
    benefits: ["Tüm hizmetler", "Öncelikli destek", "%10 indirim"]
  },
  enterprise: {
    name: "Enterprise",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    icon: Award,
    benefits: ["Özel hizmetler", "Dedicated manager", "%20 indirim"]
  }
}

export default function UserMenu({ user, onSignOut, className }: UserMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const currentTier = tierInfo[user.tier]
  const TierIcon = currentTier.icon
  
  // Calculate profile completion
  const profileCompletion = Math.min(
    100,
    (user.avatar ? 25 : 0) +
    (user.stats?.totalOrders ? 25 : 0) +
    (user.stats?.favoriteCount ? 25 : 0) + 25 // base completion
  )

  const menuItems = [
    {
      icon: User,
      label: "Profil",
      href: "/cp/profile",
      description: "Profil bilgilerinizi düzenleyin"
    },
    {
      icon: Heart,
      label: "Favorilerim",
      href: "/cp/favorites",
      description: `${user.stats?.favoriteCount || 0} favori hizmet`,
      badge: user.stats?.favoriteCount
    },
    {
      icon: ShoppingBag,
      label: "Siparişlerim",
      href: "/cp/orders",
      description: `${user.stats?.totalOrders || 0} tamamlanan sipariş`,
      badge: user.stats?.totalOrders
    },
    {
      icon: CreditCard,
      label: "Ödeme Yöntemleri",
      href: "/cp/payments",
      description: "Kartlarınızı yönetin"
    },
    {
      icon: Bell,
      label: "Bildirimler",
      href: "/cp/notifications",
      description: "Bildirim tercihleriniz"
    },
    {
      icon: Settings,
      label: "Ayarlar",
      href: "/cp/settings",
      description: "Hesap ayarlarınız"
    }
  ]

  return (
    <motion.div
      className={cn("w-80 bg-background border rounded-xl shadow-2xl overflow-hidden", className)}
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {/* User Info Header */}
      <div className="relative p-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-white shadow-md">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Online Status Indicator */}
            <div className={cn(
              "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white",
              user.isOnline ? "bg-green-500" : "bg-gray-400"
            )}>
              <div className={cn(
                "h-full w-full rounded-full animate-pulse",
                user.isOnline ? "bg-green-500" : "bg-gray-400"
              )} />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{user.name}</h3>
              {user.role === 'admin' && (
                <Badge variant="secondary" className="h-5 px-2 text-xs">
                  <Crown className="h-3 w-3 mr-1" />
                  Admin
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            
            {/* Tier Badge */}
            <div className="flex items-center gap-2 mt-2">
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                currentTier.bgColor,
                currentTier.color
              )}>
                <TierIcon className="h-3 w-3" />
                {currentTier.name}
              </div>
              <span className="text-xs text-muted-foreground">
                {user.isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Profil Tamamlanma</span>
            <span className="font-medium">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2" />
        </div>
      </div>

      {/* Quick Stats */}
      {user.stats && (
        <div className="p-4 border-b">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-purple-600">
                <ShoppingBag className="h-4 w-4" />
                {user.stats.totalOrders}
              </div>
              <div className="text-xs text-muted-foreground">Sipariş</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-green-600">
                <TrendingUp className="h-4 w-4" />
                ₺{user.stats.totalSpent}
              </div>
              <div className="text-xs text-muted-foreground">Harcama</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-red-600">
                <Heart className="h-4 w-4" />
                {user.stats.favoriteCount}
              </div>
              <div className="text-xs text-muted-foreground">Favori</div>
            </div>
          </div>
        </div>
      )}

      {/* Tier Benefits */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium">Avantajlarınız</h4>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            Yükselt
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
        <div className="space-y-1">
          {currentTier.benefits.slice(0, isExpanded ? undefined : 2).map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {benefit}
            </div>
          ))}
          {currentTier.benefits.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-5 px-0 text-xs text-purple-600"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Daha az göster' : `+${currentTier.benefits.length - 2} daha`}
            </Button>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-3 hover:bg-muted/50"
              onClick={() => window.location.href = item.href}
            >
              <item.icon className="h-4 w-4 mr-3 text-muted-foreground" />
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="h-4 px-1.5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </motion.div>
        ))}
      </div>

      <Separator />

      {/* Sign Out */}
      <div className="p-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onSignOut}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Çıkış Yap
        </Button>
      </div>

      {/* Join Date */}
      <div className="px-4 py-2 bg-muted/30 text-center">
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {user.joinDate ? `${user.joinDate} tarihinden beri` : 'Yeni üye'}
        </div>
      </div>
    </motion.div>
  )
} 