"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  CreditCard,
  ShoppingBag,
  FileText,
  Wallet,
  User,
  Shield,
  MapPin,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Crown,
  TrendingUp,
  Calendar,
  X,
  Zap,
  BarChart3,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

interface DashboardSidebarProps {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
  className?: string
  isMobile?: boolean
  onMobileClose?: () => void
}

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  comingSoon?: boolean
  description?: string
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/cp',
    icon: LayoutDashboard,
    description: 'Genel bakış ve istatistikler'
  },
  {
    id: 'subscriptions',
    label: 'Abonelikler',
    href: '/cp/subscriptions',
    icon: Crown,
    badge: 2,
    description: 'Aktif abonelik planlarınız'
  },
  {
    id: 'orders',
    label: 'Siparişler',
    href: '/cp/orders',
    icon: ShoppingBag,
    badge: 5,
    description: 'Sipariş geçmişi ve durumu'
  },
  {
    id: 'payments',
    label: 'Ödeme Yöntemleri',
    href: '/cp/payments',
    icon: CreditCard,
    description: 'Kart ve banka hesapları'
  },
  {
    id: 'invoices',
    label: 'Faturalar',
    href: '/cp/invoices',
    icon: FileText,
    badge: 'Yeni',
    description: 'Fatura geçmişi ve indirme'
  },
  {
    id: 'wallet',
    label: 'Cüzdan',
    href: '/cp/wallet',
    icon: Wallet,
    description: 'Bakiye ve işlemler'
  },
  {
    id: 'profile',
    label: 'Profil',
    href: '/cp/profile',
    icon: User,
    description: 'Kişisel bilgiler'
  },
  {
    id: 'security',
    label: 'Güvenlik',
    href: '/cp/security',
    icon: Shield,
    description: 'Şifre ve güvenlik ayarları'
  },
  {
    id: 'addresses',
    label: 'Adresler',
    href: '/cp/addresses',
    icon: MapPin,
    description: 'Fatura adresleri'
  },
  {
    id: 'settings',
    label: 'Ayarlar',
    href: '/cp/settings',
    icon: Settings,
    description: 'Genel tercihler'
  }
]

export default function DashboardSidebar({
  collapsed,
  onCollapsedChange,
  className,
  isMobile = false,
  onMobileClose
}: DashboardSidebarProps) {
  const pathname = usePathname()
  const { state } = useAuth()
  const { user } = state
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobile && onMobileClose) {
      onMobileClose()
    }
  }, [pathname, isMobile, onMobileClose])

  const isActiveRoute = (href: string) => {
    if (href === '/cp') {
      return pathname === '/cp'
    }
    return pathname.startsWith(href)
  }

  const sidebarWidth = collapsed ? 'w-20' : 'w-80'

  return (
    <motion.aside
      initial={isMobile ? { x: -300 } : false}
      animate={isMobile ? { x: 0 } : false}
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-gray-200 shadow-xl",
        "flex flex-col transition-all duration-300 ease-in-out",
        sidebarWidth,
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                YayıncıBotu
              </h2>
              <p className="text-xs text-gray-500">Control Panel</p>
            </div>
          </motion.div>
        )}

        {/* Collapse Button */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCollapsedChange(!collapsed)}
            className="h-8 w-8 rounded-lg hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}

        {/* Mobile Close Button */}
        {isMobile && onMobileClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileClose}
            className="h-8 w-8 rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* User Info */}
      {user && !collapsed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 mx-4 mt-4 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-semibold">
              {user.display_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {user.display_name || user.email.split('@')[0]}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  Premium
                </Badge>
                <span className="text-xs text-gray-500">Aktif</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            const isActive = isActiveRoute(item.href)
            const showTooltip = collapsed && hoveredItem === item.id

            return (
              <div key={item.id} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Link href={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                        "hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50",
                        "group relative",
                        isActive && "bg-gradient-to-r from-purple-100 to-blue-100 shadow-sm",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <div className={cn(
                        "flex-shrink-0 w-5 h-5 flex items-center justify-center",
                        isActive ? "text-purple-600" : "text-gray-600",
                        "group-hover:text-purple-600 transition-colors"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {!collapsed && (
                        <>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={cn(
                                "font-medium text-sm",
                                isActive ? "text-purple-700" : "text-gray-700",
                                "group-hover:text-purple-700"
                              )}>
                                {item.label}
                              </span>
                              {item.badge && (
                                <Badge 
                                  variant={typeof item.badge === 'string' ? "default" : "secondary"}
                                  className="h-5 px-2 text-xs"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </>
                      )}

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-blue-600 rounded-r-full"
                        />
                      )}
                    </div>
                  </Link>
                </motion.div>

                {/* Tooltip for collapsed sidebar */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 z-50"
                    >
                      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t border-gray-100 bg-gray-50"
        >
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-purple-600">
                <ShoppingBag className="h-4 w-4" />
                12
              </div>
              <div className="text-xs text-gray-500">Aktif Sipariş</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-green-600">
                <Wallet className="h-4 w-4" />
                ₺450
              </div>
              <div className="text-xs text-gray-500">Cüzdan</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  )
} 