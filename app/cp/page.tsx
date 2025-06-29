"use client"

import { motion } from "framer-motion"
import {
  ShoppingBag,
  Crown,
  Wallet,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  ArrowUpRight,
  Zap,
  Star,
  Gift,
  Bell,
  Eye,
  Heart,
  Activity,
  CreditCard,
  BarChart3,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface QuickStat {
  id: string
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface ActivityItem {
  id: string
  type: 'order' | 'payment' | 'subscription' | 'security'
  title: string
  description: string
  timestamp: string
  status: 'success' | 'pending' | 'warning' | 'info'
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  color: string
  badge?: string
}

const quickStats: QuickStat[] = [
  {
    id: 'orders',
    title: 'Toplam Sipariş',
    value: '24',
    change: '+3 bu ay',
    changeType: 'positive',
    icon: ShoppingBag,
    color: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    id: 'subscriptions',
    title: 'Aktif Abonelik',
    value: '2',
    change: 'Premium Aktif',
    changeType: 'positive',
    icon: Crown,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: 'wallet',
    title: 'Cüzdan Bakiyesi',
    value: '₺450.00',
    change: '+₺100 bu hafta',
    changeType: 'positive',
    icon: Wallet,
    color: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    id: 'spending',
    title: 'Bu Ay Harcama',
    value: '₺235.50',
    change: '-15% geçen aya göre',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-gradient-to-br from-orange-500 to-orange-600'
  }
]

const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'order',
    title: 'Instagram Takipçi Siparişi',
    description: '2,500 takipçi paketi başarıyla tamamlandı',
    timestamp: '2 saat önce',
    status: 'success'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Cüzdan Yüklemesi',
    description: '₺100 cüzdanınıza eklendi',
    timestamp: '5 saat önce',
    status: 'success'
  },
  {
    id: '3',
    type: 'subscription',
    title: 'Premium Abonelik',
    description: 'Aboneliğiniz 3 gün içinde yenilenecek',
    timestamp: '1 gün önce',
    status: 'info'
  },
  {
    id: '4',
    type: 'order',
    title: 'YouTube İzlenme',
    description: '10,000 izlenme paketi işleniyor',
    timestamp: '2 gün önce',
    status: 'pending'
  },
  {
    id: '5',
    type: 'security',
    title: 'Güvenlik Bildirimi',
    description: 'Yeni cihazdan giriş yapıldı',
    timestamp: '3 gün önce',
    status: 'warning'
  }
]

const quickActions: QuickAction[] = [
  {
    id: 'new-order',
    title: 'Yeni Sipariş',
    description: 'Hızlı sipariş oluştur',
    icon: Plus,
    href: '/orders/new',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'top-up',
    title: 'Bakiye Yükle',
    description: 'Cüzdana para ekle',
    icon: Wallet,
    href: '/cp/wallet',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'subscriptions',
    title: 'Aboneliklerim',
    description: 'Planları yönet',
    icon: Crown,
    href: '/cp/subscriptions',
    color: 'from-blue-500 to-blue-600',
    badge: '2 Aktif'
  },
  {
    id: 'analytics',
    title: 'İstatistikler',
    description: 'Detaylı raporları gör',
    icon: BarChart3,
    href: '/cp/analytics',
    color: 'from-orange-500 to-orange-600'
  }
]

export default function DashboardPage() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingBag
      case 'payment': return CreditCard
      case 'subscription': return Crown
      case 'security': return Bell
      default: return Activity
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'warning': return 'text-red-600 bg-red-100'
      case 'info': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Hoş Geldiniz! 👋
              </h1>
              <p className="text-purple-100 text-lg">
                Hesabınıza genel bakış ve son aktiviteleriniz
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-purple-200 text-sm">Son Giriş</p>
                <p className="font-semibold">Bugün, 14:30</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl translate-y-24 -translate-x-24" />
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-white",
                      stat.color
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={cn("text-xs mt-1", getChangeColor(stat.changeType))}>
                      {stat.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Hızlı İşlemler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.id}
                    variant="ghost"
                    className="w-full justify-start h-auto p-4 group hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                    onClick={() => window.location.href = action.href}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3 bg-gradient-to-r",
                      action.color
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{action.title}</p>
                        {action.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Son Aktiviteler
                </CardTitle>
                <Button variant="outline" size="sm">
                  Tümünü Gör
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        getActivityColor(activity.status)
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs mt-1", getActivityColor(activity.status))}
                        >
                          {activity.status === 'success' && 'Tamamlandı'}
                          {activity.status === 'pending' && 'Bekliyor'}
                          {activity.status === 'warning' && 'Uyarı'}
                          {activity.status === 'info' && 'Bilgi'}
                        </Badge>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Bu Ay Performansınız
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sipariş Tamamlanma</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ödeme Başarı Oranı</span>
                  <span className="text-sm font-medium">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Müşteri Memnuniyeti</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 