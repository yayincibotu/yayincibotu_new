"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Package,
  TrendingUp,
  Users,
  Calendar
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data - gerçek projede database'den gelecek
const mockOrders = [
  {
    id: "ORD-2024-001",
    service: "Twitch Viewer Bot",
    platform: "Twitch",
    quantity: 500,
    status: "completed",
    amount: 29.99,
    progress: 100,
    startedAt: "2024-01-15 14:30",
    completedAt: "2024-01-15 16:45",
    link: "https://twitch.tv/example-channel"
  },
  {
    id: "ORD-2024-002", 
    service: "Instagram Followers",
    platform: "Instagram",
    quantity: 1000,
    status: "processing",
    amount: 49.99,
    progress: 65,
    startedAt: "2024-01-16 09:15",
    completedAt: null,
    link: "https://instagram.com/example-account"
  },
  {
    id: "ORD-2024-003",
    service: "YouTube Video Views",
    platform: "YouTube", 
    quantity: 2500,
    status: "pending",
    amount: 19.99,
    progress: 0,
    startedAt: null,
    completedAt: null,
    link: "https://youtube.com/watch?v=example"
  },
  {
    id: "ORD-2024-004",
    service: "TikTok Likes",
    platform: "TikTok",
    quantity: 750,
    status: "failed",
    amount: 15.99,
    progress: 0,
    startedAt: "2024-01-14 11:20",
    completedAt: null,
    link: "https://tiktok.com/@example/video/123"
  }
]

const statusConfig = {
  pending: { color: "bg-yellow-500", text: "Beklemede", icon: Clock },
  processing: { color: "bg-blue-500", text: "İşleniyor", icon: RefreshCw },
  completed: { color: "bg-green-500", text: "Tamamlandı", icon: CheckCircle },
  failed: { color: "bg-red-500", text: "Başarısız", icon: XCircle }
}

const platformIcons = {
  Twitch: "🎮",
  Instagram: "📷",
  YouTube: "📹", 
  TikTok: "🎵"
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPlatform = platformFilter === "all" || order.platform === platformFilter
    
    return matchesSearch && matchesStatus && matchesPlatform
  })

  const orderStats = {
    total: mockOrders.length,
    completed: mockOrders.filter(o => o.status === 'completed').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    pending: mockOrders.filter(o => o.status === 'pending').length
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Siparişlerim</h1>
        <p className="text-muted-foreground">
          Tüm siparişlerinizi görüntüleyin ve durumlarını takip edin
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Toplam Sipariş</CardTitle>
            <Package className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{orderStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Bu ay
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Tamamlandı</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{orderStats.completed}</div>
            <p className="text-xs text-muted-foreground">
              +{orderStats.completed} bu ay
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">İşleniyor</CardTitle>
            <RefreshCw className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{orderStats.processing}</div>
            <p className="text-xs text-muted-foreground">
              Aktif işlemler
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Beklemede</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{orderStats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Kuyruktaki siparişler
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Filtreler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sipariş ID veya hizmet adı..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 border-purple-500/20 bg-background/50"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] border-purple-500/20 bg-background/50">
                <SelectValue placeholder="Durum Filtresi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="processing">İşleniyor</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="failed">Başarısız</SelectItem>
              </SelectContent>
            </Select>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full md:w-[180px] border-purple-500/20 bg-background/50">
                <SelectValue placeholder="Platform Filtresi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Platformlar</SelectItem>
                <SelectItem value="Twitch">Twitch</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="YouTube">YouTube</SelectItem>
                <SelectItem value="TikTok">TikTok</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2 border-purple-500/20 hover:bg-purple-500/10">
              <Download className="h-4 w-4" />
              Dışa Aktar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
          return (
            <Card key={order.id} className="border-purple-500/20 bg-background/50 backdrop-blur-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <span className="text-lg">{platformIcons[order.platform as keyof typeof platformIcons]}</span>
                     {order.service}
                     <Badge variant="outline" className="ml-2 border-purple-500/20 text-purple-200">
                       {order.id}
                     </Badge>
                   </CardTitle>
                   <CardDescription className="flex items-center gap-4">
                     <span>{order.quantity} adet</span>
                     <span>•</span>
                     <span>{order.platform}</span>
                     {order.startedAt && (
                       <>
                         <span>•</span>
                         <span>Başlangıç: {order.startedAt}</span>
                       </>
                     )}
                   </CardDescription>
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-bold text-foreground">₺{order.amount}</div>
                   <Badge 
                     variant="secondary" 
                     className={`${statusConfig[order.status as keyof typeof statusConfig].color} text-white`}
                   >
                     <StatusIcon className="h-3 w-3 mr-1" />
                     {statusConfig[order.status as keyof typeof statusConfig].text}
                   </Badge>
                 </div>
               </div>
             </CardHeader>
             <CardContent className="space-y-4">
               {/* Progress Bar */}
               {order.status === 'processing' && (
                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-foreground">İlerleme</span>
                     <span className="text-foreground">%{order.progress}</span>
                   </div>
                   <Progress value={order.progress} />
                 </div>
               )}

               {/* Order Link */}
               <div className="space-y-2">
                 <div className="text-sm font-medium text-foreground">Hedef Link:</div>
                 <div className="text-sm text-muted-foreground bg-background/50 border border-purple-500/20 p-2 rounded text-xs font-mono">
                   {order.link}
                 </div>
               </div>

               {/* Actions */}
               <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   {order.completedAt ? (
                     <>
                       <CheckCircle className="h-4 w-4 text-green-400" />
                       Tamamlandı: {order.completedAt}
                     </>
                   ) : order.status === 'processing' ? (
                     <>
                       <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />
                       İşleniyor...
                     </>
                   ) : order.status === 'pending' ? (
                     <>
                       <Clock className="h-4 w-4 text-yellow-400" />
                       Kuyruktaki sıra: #3
                     </>
                   ) : (
                     <>
                       <XCircle className="h-4 w-4 text-red-400" />
                       İşlem başarısız
                     </>
                   )}
                 </div>
                 <div className="flex gap-2">
                   <Button variant="outline" size="sm" className="border-purple-500/20 hover:bg-purple-500/10">
                     <Eye className="h-4 w-4 mr-2" />
                     Detaylar
                   </Button>
                   {order.status === 'completed' && (
                     <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                       <RefreshCw className="h-4 w-4 mr-2" />
                       Tekrar Sipariş Et
                     </Button>
                   )}
                 </div>
               </div>
             </CardContent>
           </Card>
         )
       })}
     </div>

     {filteredOrders.length === 0 && (
       <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
         <CardContent className="text-center py-8">
           <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
           <h3 className="text-lg font-medium mb-2 text-foreground">Sipariş bulunamadı</h3>
           <p className="text-muted-foreground mb-4">
             Arama kriterlerinize uygun sipariş bulunamadı.
           </p>
           <Button 
             variant="outline" 
             className="border-purple-500/20 hover:bg-purple-500/10"
             onClick={() => {
               setSearchTerm("")
               setStatusFilter("all")
               setPlatformFilter("all")
             }}
           >
             Filtreleri Temizle
           </Button>
         </CardContent>
       </Card>
     )}
   </div>
 )
} 