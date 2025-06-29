"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  Settings,
  ChevronRight,
  Home,
  Zap,
  HelpCircle,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import AuthAvatar from "@/components/auth/auth-avatar"

interface DashboardHeaderProps {
  onMobileMenuToggle: () => void
  sidebarCollapsed: boolean
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Sipariş Tamamlandı',
    message: 'Instagram takipçi siparişiniz başarıyla tamamlandı.',
    type: 'success',
    timestamp: '5 dakika önce',
    read: false
  },
  {
    id: '2',
    title: 'Ödeme Hatırlatması',
    message: 'Premium aboneliğiniz 3 gün içinde yenilenecek.',
    type: 'info',
    timestamp: '2 saat önce',
    read: false
  },
  {
    id: '3',
    title: 'Güvenlik Uyarısı',
    message: 'Yeni bir cihazdan giriş yapıldı.',
    type: 'warning',
    timestamp: '1 gün önce',
    read: true
  }
]

// Route labels for breadcrumb
const routeLabels: Record<string, string> = {
  '/cp': 'Dashboard',
  '/cp/subscriptions': 'Abonelikler',
  '/cp/orders': 'Siparişler',
  '/cp/payments': 'Ödeme Yöntemleri',
  '/cp/invoices': 'Faturalar',
  '/cp/wallet': 'Cüzdan',
  '/cp/profile': 'Profil',
  '/cp/security': 'Güvenlik',
  '/cp/addresses': 'Adresler',
  '/cp/settings': 'Ayarlar'
}

export default function DashboardHeader({
  onMobileMenuToggle,
  sidebarCollapsed
}: DashboardHeaderProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const unreadNotifications = mockNotifications.filter(n => !n.read).length

     const generateBreadcrumb = () => {
     const paths = pathname.split('/').filter(Boolean)
     const breadcrumbItems: Array<{
       label: string
       href: string
       icon?: React.ComponentType<{ className?: string }>
     }> = [
       { label: 'Ana Sayfa', href: '/', icon: Home }
     ]

     let currentPath = ''
     paths.forEach((path, index) => {
       currentPath += `/${path}`
       const label = routeLabels[currentPath] || path.charAt(0).toUpperCase() + path.slice(1)
       breadcrumbItems.push({
         label,
         href: currentPath,
         icon: index === paths.length - 1 ? Zap : undefined
       })
     })

     return breadcrumbItems
   }

  const breadcrumbItems = generateBreadcrumb()

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'error': return 'text-red-600 bg-red-100'
      default: return 'text-blue-600 bg-blue-100'
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileMenuToggle}
            className="lg:hidden h-9 w-9"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Breadcrumb Navigation */}
          <nav className="hidden md:flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => {
              const Icon = item.icon
              const isLast = index === breadcrumbItems.length - 1

              return (
                <div key={item.href} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                  )}
                  <div className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors",
                    isLast
                      ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-medium"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}>
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Page Title for Mobile */}
          <div className="md:hidden">
            <h1 className="font-semibold text-gray-900">
              {routeLabels[pathname] || 'Dashboard'}
            </h1>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Ara... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-300 transition-colors"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="h-9 w-9"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-3 border-b">
                <h3 className="font-semibold">Bildirimler</h3>
                <Badge variant="secondary" className="text-xs">
                  {unreadNotifications} yeni
                </Badge>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {mockNotifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-0">
                    <div className={cn(
                      "w-full p-3 hover:bg-gray-50 transition-colors",
                      !notification.read && "bg-blue-50/50"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                          getNotificationTypeColor(notification.type)
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm text-purple-600 font-medium">
                Tüm bildirimleri görüntüle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
          </Button>

          {/* User Avatar */}
          <AuthAvatar showNotificationBadge={false} />
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Dashboard'da ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border-gray-200"
          />
        </div>
      </div>
    </motion.header>
  )
} 