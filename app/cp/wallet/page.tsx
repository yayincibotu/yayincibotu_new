"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Wallet, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp,
  TrendingDown,
  Calendar,
  CreditCard,
  Banknote,
  Target,
  Bell,
  History,
  PiggyBank,
  AlertTriangle,
  CheckCircle,
  Clock
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
const currentBalance = 156.75
const monthlySpending = 89.45
const monthlyBudget = 200.00

const mockTransactions = [
  {
    id: "wt_1",
    type: "credit",
    amount: 100.00,
    description: "Kredi Kartı ile Para Yükleme",
    date: "2024-01-16 15:30",
    status: "completed",
    reference: "pm_1234567890"
  },
  {
    id: "wt_2",
    type: "debit", 
    amount: 49.99,
    description: "Premium Abonelik Ödemesi",
    date: "2024-01-16 14:30",
    status: "completed",
    reference: "sub_premium_jan"
  },
  {
    id: "wt_3",
    type: "debit",
    amount: 29.99,
    description: "Twitch Viewer Bot Hizmeti",
    date: "2024-01-15 16:45",
    status: "completed",
    reference: "ord_twitch_500"
  },
  {
    id: "wt_4",
    type: "credit",
    amount: 50.00,
    description: "Promosyon Bonusu",
    date: "2024-01-14 10:00",
    status: "completed",
    reference: "promo_welcome"
  },
  {
    id: "wt_5",
    type: "debit",
    amount: 19.99,
    description: "YouTube Views Paketi",
    date: "2024-01-13 12:20",
    status: "failed",
    reference: "ord_youtube_2500"
  }
]

const topUpOptions = [
  { amount: 25, bonus: 0, popular: false },
  { amount: 50, bonus: 5, popular: false },
  { amount: 100, bonus: 15, popular: true },
  { amount: 250, bonus: 50, popular: false },
  { amount: 500, bonus: 125, popular: false }
]

const spendingByCategory = [
  { category: "Abonelikler", amount: 49.99, percentage: 56 },
  { category: "Viewer Botları", amount: 29.99, percentage: 34 },
  { category: "Sosyal Medya", amount: 9.47, percentage: 10 }
]

export default function WalletPage() {
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState("")
  const [autoTopUpEnabled, setAutoTopUpEnabled] = useState(false)

  const stats = {
    totalSpent: mockTransactions.filter(t => t.type === 'debit' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
    totalEarned: mockTransactions.filter(t => t.type === 'credit' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
    pendingTransactions: mockTransactions.filter(t => t.status === 'pending').length,
    budgetUsed: (monthlySpending / monthlyBudget) * 100
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Cüzdanım</h1>
        <p className="text-muted-foreground">
          Bakiyenizi yönetin, para yükleyin ve harcamalarınızı takip edin
        </p>
      </div>

      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white/90">Mevcut Bakiye</CardTitle>
              <CardDescription className="text-white/70">
                YayıncıBotu Cüzdanı
              </CardDescription>
            </div>
            <Wallet className="h-8 w-8 text-white/90" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-4xl font-bold">₺{currentBalance.toFixed(2)}</div>
            <div className="flex gap-2">
              <Dialog open={showAddFunds} onOpenChange={setShowAddFunds}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Para Yükle
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Para Yükle</DialogTitle>
                    <DialogDescription>
                      Cüzdanınıza para yükleyin ve bonus kazanın
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    {/* Quick Amounts */}
                    <div className="space-y-3">
                      <Label>Hızlı Tutarlar</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {topUpOptions.map((option) => (
                          <Card 
                            key={option.amount}
                            className={`cursor-pointer transition-all ${
                              selectedAmount === option.amount ? 'ring-2 ring-purple-600' : ''
                            } ${option.popular ? 'border-purple-600' : ''}`}
                            onClick={() => setSelectedAmount(option.amount)}
                          >
                            {option.popular && (
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                <Badge className="bg-purple-600">Popüler</Badge>
                              </div>
                            )}
                            <CardContent className="p-4 text-center">
                              <div className="text-xl font-bold">₺{option.amount}</div>
                              {option.bonus > 0 && (
                                <div className="text-sm text-green-600">
                                  +₺{option.bonus} bonus
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Custom Amount */}
                    <div className="space-y-2">
                      <Label htmlFor="customAmount">Özel Tutar</Label>
                      <Input
                        id="customAmount"
                        type="number"
                        placeholder="Miktar girin..."
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setSelectedAmount(parseFloat(e.target.value) || 0)
                        }}
                      />
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                      <Label>Ödeme Yöntemi</Label>
                      <Select defaultValue="card">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Kredi Kartı (Visa ****4242)</SelectItem>
                          <SelectItem value="bank">Banka Transferi</SelectItem>
                          <SelectItem value="crypto">Kripto Para</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Summary */}
                    <div className="space-y-2 p-4 bg-muted rounded-lg">
                      <div className="flex justify-between">
                        <span>Yüklenecek tutar:</span>
                        <span>₺{selectedAmount.toFixed(2)}</span>
                      </div>
                      {selectedAmount >= 50 && (
                        <div className="flex justify-between text-green-600">
                          <span>Bonus:</span>
                          <span>+₺{topUpOptions.find(o => o.amount === selectedAmount)?.bonus || 0}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Toplam bakiye artışı:</span>
                        <span>₺{(selectedAmount + (topUpOptions.find(o => o.amount === selectedAmount)?.bonus || 0)).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Para Yükle
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddFunds(false)}>
                        İptal
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                <History className="h-4 w-4 mr-2" />
                Geçmiş
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Ay Harcama</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{monthlySpending.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Bütçenin %{Math.round(stats.budgetUsed)}'i
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kazanç</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₺{stats.totalEarned.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Bonuslar dahil
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bütçe Kullanımı</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%{Math.round(stats.budgetUsed)}</div>
            <Progress value={stats.budgetUsed} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Otomatik Yükleme</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{autoTopUpEnabled ? "Aktif" : "Kapalı"}</div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => setAutoTopUpEnabled(!autoTopUpEnabled)}
            >
              {autoTopUpEnabled ? "Kapat" : "Aç"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">İşlem Geçmişi</TabsTrigger>
          <TabsTrigger value="analytics">Harcama Analizi</TabsTrigger>
          <TabsTrigger value="settings">Cüzdan Ayarları</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-base">{transaction.description}</CardTitle>
                        <CardDescription>
                          {transaction.date} • Ref: {transaction.reference}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₺{transaction.amount.toFixed(2)}
                      </div>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'destructive'}>
                        {transaction.status === 'completed' ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Tamamlandı
                          </>
                        ) : transaction.status === 'pending' ? (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            Beklemede
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Başarısız
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Spending by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Kategoriye Göre Harcamalar</CardTitle>
                <CardDescription>Bu ay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {spendingByCategory.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.category}</span>
                      <span>₺{item.amount.toFixed(2)}</span>
                    </div>
                    <Progress value={item.percentage} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Budget Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Bütçe Durumu</CardTitle>
                <CardDescription>Aylık hedef: ₺{monthlyBudget.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Harcanan</span>
                    <span>₺{monthlySpending.toFixed(2)}</span>
                  </div>
                  <Progress value={stats.budgetUsed} />
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Kalan bütçe:</span>
                    <span className="font-medium">₺{(monthlyBudget - monthlySpending).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Günlük ortalama:</span>
                    <span className="text-sm text-muted-foreground">₺{(monthlySpending / 16).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Otomatik Yükleme</CardTitle>
                <CardDescription>
                  Bakiyeniz belirli bir seviyenin altına düştüğünde otomatik para yükleme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Otomatik yükleme aktif</div>
                    <div className="text-sm text-muted-foreground">
                      Bakiye ₺25'in altına düştüğünde ₺50 yükle
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ayarları Düzenle
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bildirimler</CardTitle>
                <CardDescription>
                  Cüzdan işlemleri için bildirim tercihleri
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Para yükleme bildirimleri</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Harcama bildirimleri</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Düşük bakiye uyarısı</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Haftalık harcama özeti</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 