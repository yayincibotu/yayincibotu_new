"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CreditCard, 
  Shield, 
  Plus, 
  Trash2, 
  Star,
  Calendar,
  Lock,
  CheckCircle,
  AlertTriangle,
  History,
  Download,
  Eye,
  EyeOff
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data - gerçek projede database'den gelecek
const mockPaymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
    name: "Ana Kredi Kartım",
    created: "2024-01-15"
  },
  {
    id: "pm_2", 
    type: "card",
    brand: "mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2026,
    isDefault: false,
    name: "İş Kartım",
    created: "2024-01-10"
  }
]

const mockTransactions = [
  {
    id: "txn_1",
    amount: 49.99,
    description: "Premium Abonelik",
    status: "succeeded",
    date: "2024-01-16 14:30",
    paymentMethod: "Visa ****4242",
    invoice: "INV-2024-001"
  },
  {
    id: "txn_2",
    amount: 29.99,
    description: "Twitch Viewer Bot",
    status: "succeeded", 
    date: "2024-01-15 16:45",
    paymentMethod: "Mastercard ****5555",
    invoice: "INV-2024-002"
  },
  {
    id: "txn_3",
    amount: 19.99,
    description: "YouTube Views",
    status: "failed",
    date: "2024-01-14 11:20",
    paymentMethod: "Visa ****4242",
    invoice: null
  }
]

const brandIcons = {
  visa: "💳",
  mastercard: "💳", 
  amex: "💳",
  discover: "💳"
}

const statusConfig = {
  succeeded: { color: "text-green-600", bg: "bg-green-100", text: "Başarılı" },
  failed: { color: "text-red-600", bg: "bg-red-100", text: "Başarısız" },
  pending: { color: "text-yellow-600", bg: "bg-yellow-100", text: "Beklemede" }
}

export default function PaymentsPage() {
  const [showAddCard, setShowAddCard] = useState(false)
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredTransactions = mockTransactions.filter(txn => {
    if (selectedFilter === "all") return true
    return txn.status === selectedFilter
  })

  const stats = {
    totalSpent: mockTransactions
      .filter(t => t.status === 'succeeded')
      .reduce((sum, t) => sum + t.amount, 0),
    thisMonth: mockTransactions
      .filter(t => t.status === 'succeeded' && t.date.includes('2024-01'))
      .reduce((sum, t) => sum + t.amount, 0),
    failedPayments: mockTransactions.filter(t => t.status === 'failed').length
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Ödeme Yöntemleri</h1>
        <p className="text-muted-foreground">
          Kredi kartlarınızı yönetin ve ödeme geçmişinizi görüntüleyin
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Harcama</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{stats.totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Tüm zamanlar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Ay</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{stats.thisMonth.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {mockTransactions.filter(t => t.date.includes('2024-01')).length} işlem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Başarısız Ödeme</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failedPayments}</div>
            <p className="text-xs text-muted-foreground">
              Son 30 gün
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="methods" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="methods">Ödeme Yöntemleri</TabsTrigger>
          <TabsTrigger value="history">Ödeme Geçmişi</TabsTrigger>
        </TabsList>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Kayıtlı Kartlarım</h2>
            
            <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Yeni Kart Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Güvenli Kart Ekleme
                  </DialogTitle>
                  <DialogDescription>
                    Yeni kredi kartı bilgilerinizi güvenli şekilde ekleyin. Tüm veriler SSL ile şifrelenir.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Kart Numarası</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        type={showCardNumber ? "text" : "password"}
                        placeholder="1234 5678 9012 3456"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowCardNumber(!showCardNumber)}
                      >
                        {showCardNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Son Kullanma</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" type="password" placeholder="123" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Kart Üzerindeki İsim</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nickname">Kart Takma Adı (Opsiyonel)</Label>
                    <Input id="nickname" placeholder="Ana Kartım" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="setDefault" className="rounded" />
                    <Label htmlFor="setDefault" className="text-sm">
                      Bu kartı varsayılan ödeme yöntemi yap
                    </Label>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">
                      <Lock className="h-4 w-4 mr-2" />
                      Güvenli Ekle
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddCard(false)}>
                      İptal
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {mockPaymentMethods.map((method) => (
              <Card key={method.id} className="relative">
                {method.isDefault && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <Star className="h-3 w-3 mr-1" />
                      Varsayılan
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{brandIcons[method.brand as keyof typeof brandIcons]}</div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {method.name}
                          <Badge variant="outline" className="uppercase">
                            {method.brand}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          •••• •••• •••• {method.last4}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Eklendi: {method.created}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-green-500" />
                      3D Secure destekli
                    </div>
                    <div className="flex gap-2">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-2" />
                          Varsayılan Yap
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Kaldır
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {mockPaymentMethods.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Henüz kart eklenmemiş</h3>
                <p className="text-muted-foreground mb-4">
                  Hızlı ödeme yapabilmek için kredi kartınızı ekleyin.
                </p>
                <Button onClick={() => setShowAddCard(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  İlk Kartımı Ekle
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Payment History Tab */}
        <TabsContent value="history" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Ödeme Geçmişi</h2>
            <div className="flex gap-2">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Durum Filtresi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm İşlemler</SelectItem>
                  <SelectItem value="succeeded">Başarılı</SelectItem>
                  <SelectItem value="failed">Başarısız</SelectItem>
                  <SelectItem value="pending">Beklemede</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Dışa Aktar
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {transaction.description}
                        <Badge 
                          variant="secondary"
                          className={`${statusConfig[transaction.status as keyof typeof statusConfig].bg} ${statusConfig[transaction.status as keyof typeof statusConfig].color}`}
                        >
                          {statusConfig[transaction.status as keyof typeof statusConfig].text}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {transaction.date} • {transaction.paymentMethod}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">₺{transaction.amount}</div>
                      {transaction.invoice && (
                        <div className="text-sm text-muted-foreground">
                          {transaction.invoice}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {transaction.status === 'succeeded' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : transaction.status === 'failed' ? (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      ) : (
                        <History className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        İşlem ID: {transaction.id}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {transaction.invoice && (
                        <Button variant="outline" size="sm">
                          Fatura Görüntüle
                        </Button>
                      )}
                      {transaction.status === 'failed' && (
                        <Button size="sm">
                          Tekrar Dene
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">İşlem bulunamadı</h3>
                <p className="text-muted-foreground mb-4">
                  Seçili filtreye uygun ödeme işlemi bulunamadı.
                </p>
                <Button variant="outline" onClick={() => setSelectedFilter("all")}>
                  Tüm İşlemleri Göster
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 