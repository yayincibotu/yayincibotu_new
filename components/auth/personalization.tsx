"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Clock,
  Settings,
  ShoppingBag,
  Eye,
  Target,
  ChevronRight,
  MoreVertical,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PersonalizationProps {
  userId: string
  className?: string
}

interface FavoriteService {
  id: string
  name: string
  platform: string
  price: number
  lastUsed: string
  timesUsed: number
  category: string
}

interface RecentActivity {
  id: string
  type: 'order' | 'favorite' | 'view'
  title: string
  platform: string
  timestamp: string
  status: 'completed' | 'pending' | 'cancelled'
}

export default function Personalization({ userId, className }: PersonalizationProps) {
  const [activeTab, setActiveTab] = useState<'favorites' | 'recent' | 'preferences'>('favorites')

  // Mock data
  const favoriteServices: FavoriteService[] = [
    {
      id: '1',
      name: 'Instagram Takipçi',
      platform: 'Instagram',
      price: 29.99,
      lastUsed: '2024-01-15',
      timesUsed: 5,
      category: 'Takipçi'
    }
  ]

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'order',
      title: 'Instagram Takipçi Paketi',
      platform: 'Instagram',
      timestamp: '2 saat önce',
      status: 'completed'
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingBag
      case 'favorite': return Heart
      case 'view': return Eye
      default: return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const tabs = [
    { id: 'favorites' as const, label: 'Favorilerim', icon: Heart, count: favoriteServices.length },
    { id: 'recent' as const, label: 'Son Aktiviteler', icon: Clock, count: recentActivities.length },
    { id: 'preferences' as const, label: 'Tercihlerim', icon: Settings, count: 3 }
  ]

  return (
    <div className={cn("w-full max-w-4xl", className)}>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex items-center gap-2",
                activeTab === tab.id && "bg-gradient-to-r from-purple-600 to-blue-600"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {tab.count}
                </Badge>
              )}
            </Button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Favori Hizmetlerim</h3>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Düzenle
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favoriteServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-sm font-medium line-clamp-1">
                            {service.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.platform} • {service.category}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 p-1 h-auto"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-purple-600">
                            ₺{service.price}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Target className="h-3 w-3" />
                            {service.timesUsed} kez
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Son kullanım: {service.lastUsed}
                        </div>
                        
                        <Button size="sm" className="w-full">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Tekrar Sipariş Ver
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Activities Tab */}
        {activeTab === 'recent' && (
          <motion.div
            key="recent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Son Aktivitelerim</h3>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Detaylı Rapor
              </Button>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type)
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-2 rounded-full",
                          activity.type === 'order' && "bg-purple-100 text-purple-600",
                          activity.type === 'favorite' && "bg-red-100 text-red-600",
                          activity.type === 'view' && "bg-blue-100 text-blue-600"
                        )}>
                          <Icon className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{activity.title}</h4>
                            <Badge 
                              variant="secondary" 
                              className={cn("text-xs", getStatusColor(activity.status))}
                            >
                              {activity.status === 'completed' && 'Tamamlandı'}
                              {activity.status === 'pending' && 'Bekliyor'}
                              {activity.status === 'cancelled' && 'İptal'}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {activity.platform} • {activity.timestamp}
                          </p>
                        </div>
                        
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
              <h4 className="font-medium mb-4">Kullanım İstatistikleri</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">24</div>
                  <div className="text-xs text-muted-foreground">Toplam Sipariş</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-xs text-muted-foreground">Favori Hizmet</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₺650</div>
                  <div className="text-xs text-muted-foreground">Toplam Harcama</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">95%</div>
                  <div className="text-xs text-muted-foreground">Memnuniyet</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 