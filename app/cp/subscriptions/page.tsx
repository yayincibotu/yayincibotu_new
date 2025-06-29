"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Crown, 
  Calendar, 
  Users, 
  TrendingUp, 
  Pause, 
  Play, 
  ArrowUp,
  Eye,
  Clock,
  CreditCard
} from "lucide-react"

// Mock data - gerçek projedecorrect database'den gelecek
const mockSubscriptions = [
  {
    id: "sub_1",
    plan: "Premium Streamer",
    status: "active",
    viewers: 250,
    maxViewers: 500,
    nextBilling: "2024-02-15",
    amount: 49.99,
    autoRenew: true,
    features: ["500 Concurrent Viewers", "24/7 Support", "Advanced Analytics"]
  },
  {
    id: "sub_2", 
    plan: "Basic Package",
    status: "paused",
    viewers: 0,
    maxViewers: 100,
    nextBilling: "2024-02-20",
    amount: 19.99,
    autoRenew: false,
    features: ["100 Concurrent Viewers", "Email Support"]
  }
]

const availablePlans = [
  {
    name: "Starter",
    price: 9.99,
    viewers: 50,
    features: ["50 Concurrent Viewers", "Email Support", "Basic Analytics"]
  },
  {
    name: "Premium",
    price: 49.99,
    viewers: 500,
    features: ["500 Concurrent Viewers", "24/7 Support", "Advanced Analytics", "Priority Processing"]
  },
  {
    name: "Enterprise",
    price: 199.99,
    viewers: 2000,
    features: ["2000 Concurrent Viewers", "Dedicated Manager", "Custom Analytics", "API Access"]
  }
]

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Aboneliklerim</h1>
        <p className="text-muted-foreground">
          Aktif aboneliklerinizi yönetin ve planlarınızı güncelleyin
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Abonelik</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              +1 bu ay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Viewer</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250</div>
            <p className="text-xs text-muted-foreground">
              600 maksimum
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aylık Harcama</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺69.98</div>
            <p className="text-xs text-muted-foreground">
              +10% geçen ay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sonraki Fatura</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 Şub</div>
            <p className="text-xs text-muted-foreground">
              8 gün kaldı
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="plans">Plan Değiştir</TabsTrigger>
          <TabsTrigger value="history">Geçmiş</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {mockSubscriptions.map((sub) => (
              <Card key={sub.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {sub.plan}
                        <Badge variant={sub.status === 'active' ? 'default' : 'secondary'}>
                          {sub.status === 'active' ? 'Aktif' : 'Duraklatıldı'}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {sub.viewers}/{sub.maxViewers} viewer kullanımda
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">₺{sub.amount}</div>
                      <div className="text-sm text-muted-foreground">aylık</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Usage Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Viewer Kullanımı</span>
                      <span>{sub.viewers}/{sub.maxViewers}</span>
                    </div>
                    <Progress value={(sub.viewers / sub.maxViewers) * 100} />
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Plan Özellikleri:</div>
                    <div className="grid gap-1">
                      {sub.features.map((feature, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Sonraki fatura: {sub.nextBilling}
                    </div>
                    <div className="flex gap-2">
                      {sub.status === 'active' ? (
                        <Button variant="outline" size="sm">
                          <Pause className="h-4 w-4 mr-2" />
                          Duraklat
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Devam Et
                        </Button>
                      )}
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Detaylar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {availablePlans.map((plan, index) => (
              <Card key={index} className="relative">
                {plan.name === 'Premium' && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                      Önerilen
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">₺{plan.price}</div>
                    <div className="text-sm text-muted-foreground">aylık</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{plan.viewers}</div>
                    <div className="text-sm text-muted-foreground">concurrent viewer</div>
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="text-sm flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" variant={plan.name === 'Premium' ? 'default' : 'outline'}>
                    <ArrowUp className="h-4 w-4 mr-2" />
                    Bu Plana Geç
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Abonelik Geçmişi</CardTitle>
              <CardDescription>
                Tüm abonelik değişiklikleriniz ve fatura geçmişiniz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "15 Ocak 2024",
                    action: "Plan Yükseltme",
                    description: "Basic'ten Premium'a yükseltildi",
                    amount: "+₺30.00"
                  },
                  {
                    date: "1 Ocak 2024", 
                    action: "Yeni Abonelik",
                    description: "Basic plan başlatıldı",
                    amount: "₺19.99"
                  },
                  {
                    date: "15 Aralık 2023",
                    action: "Abonelik İptali",
                    description: "Starter plan iptal edildi",
                    amount: "-₺9.99"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="space-y-1">
                      <div className="font-medium">{item.action}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.amount}</div>
                      <div className="text-sm text-muted-foreground">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 