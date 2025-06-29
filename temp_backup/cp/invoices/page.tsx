"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Download, 
  Mail, 
  Eye, 
  Calendar,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Calculator,
  Receipt
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data - gerçek projede database'den gelecek
const mockInvoices = [
  {
    id: "INV-2024-001",
    number: "2024-001",
    date: "2024-01-16",
    dueDate: "2024-02-15",
    amount: 49.99,
    tax: 8.99,
    total: 58.98,
    status: "paid",
    description: "Premium Abonelik - Ocak 2024",
    items: [
      { name: "Premium Plan", quantity: 1, price: 49.99, tax: 8.99 }
    ],
    paymentDate: "2024-01-16"
  },
  {
    id: "INV-2024-002",
    number: "2024-002",
    date: "2024-01-15",
    dueDate: "2024-02-14",
    amount: 29.99,
    tax: 5.40,
    total: 35.39,
    status: "paid",
    description: "Twitch Viewer Bot Hizmeti",
    items: [
      { name: "Twitch Viewer Bot", quantity: 500, price: 29.99, tax: 5.40 }
    ],
    paymentDate: "2024-01-15"
  },
  {
    id: "INV-2024-003",
    number: "2024-003", 
    date: "2024-01-10",
    dueDate: "2024-02-09",
    amount: 19.99,
    tax: 3.60,
    total: 23.59,
    status: "overdue",
    description: "YouTube Views Paketi",
    items: [
      { name: "YouTube Video Views", quantity: 2500, price: 19.99, tax: 3.60 }
    ],
    paymentDate: null
  },
  {
    id: "INV-2024-004",
    number: "2024-004",
    date: "2024-01-20",
    dueDate: "2024-02-19", 
    amount: 89.99,
    tax: 16.20,
    total: 106.19,
    status: "pending",
    description: "Enterprise Plan - Ocak 2024",
    items: [
      { name: "Enterprise Plan", quantity: 1, price: 89.99, tax: 16.20 }
    ],
    paymentDate: null
  }
]

const statusConfig = {
  paid: { color: "text-green-600", bg: "bg-green-100", text: "Ödendi", icon: CheckCircle },
  pending: { color: "text-blue-600", bg: "bg-blue-100", text: "Beklemede", icon: Clock },
  overdue: { color: "text-red-600", bg: "bg-red-100", text: "Vadesi Geçti", icon: AlertTriangle },
  cancelled: { color: "text-gray-600", bg: "bg-gray-100", text: "İptal Edildi", icon: AlertTriangle }
}

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalAmount: mockInvoices.reduce((sum, inv) => sum + inv.total, 0),
    paidAmount: mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0),
    pendingAmount: mockInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.total, 0),
    overdueCount: mockInvoices.filter(inv => inv.status === 'overdue').length
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Faturalarım</h1>
        <p className="text-muted-foreground">
          Faturalarınızı görüntüleyin, indirin ve ödeme durumlarını takip edin
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Toplam Tutar</CardTitle>
            <Receipt className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₺{stats.totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Tüm faturalar
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Ödenen</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">₺{stats.paidAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Ödeme tamamlandı
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">₺{stats.pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Ödeme bekleniyor
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Vadesi Geçen</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{stats.overdueCount}</div>
            <p className="text-xs text-muted-foreground">
              Fatura adedi
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtreler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Fatura numarası veya açıklama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Durum Filtresi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="paid">Ödendi</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="overdue">Vadesi Geçti</SelectItem>
                <SelectItem value="cancelled">İptal Edildi</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Toplu İndir
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredInvoices.map((invoice) => {
          const StatusIcon = statusConfig[invoice.status as keyof typeof statusConfig].icon
          return (
            <Card key={invoice.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Fatura #{invoice.number}
                      <Badge 
                        variant="secondary"
                        className={`${statusConfig[invoice.status as keyof typeof statusConfig].bg} ${statusConfig[invoice.status as keyof typeof statusConfig].color}`}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[invoice.status as keyof typeof statusConfig].text}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {invoice.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₺{invoice.total.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">
                      Vade: {invoice.dueDate}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Invoice Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Fatura Tarihi</div>
                    <div className="text-muted-foreground">{invoice.date}</div>
                  </div>
                  <div>
                    <div className="font-medium">Tutar</div>
                    <div className="text-muted-foreground">₺{invoice.amount.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="font-medium">KDV</div>
                    <div className="text-muted-foreground">₺{invoice.tax.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="font-medium">Ödeme Tarihi</div>
                    <div className="text-muted-foreground">
                      {invoice.paymentDate || "Ödenmedi"}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Oluşturulma: {invoice.date}
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Görüntüle
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Fatura Detayı - #{selectedInvoice?.number}</DialogTitle>
                          <DialogDescription>
                            {selectedInvoice?.description}
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedInvoice && (
                          <div className="space-y-4">
                            {/* Invoice Header */}
                            <div className="flex justify-between items-start p-4 bg-muted rounded-lg">
                              <div>
                                <h3 className="font-semibold">YayıncıBotu</h3>
                                <p className="text-sm text-muted-foreground">
                                  Sosyal Medya Hizmetleri<br/>
                                  İstanbul, Türkiye
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-lg">₺{selectedInvoice.total.toFixed(2)}</div>
                                <Badge className={statusConfig[selectedInvoice.status as keyof typeof statusConfig].bg}>
                                  {statusConfig[selectedInvoice.status as keyof typeof statusConfig].text}
                                </Badge>
                              </div>
                            </div>

                            {/* Invoice Items */}
                            <div className="space-y-2">
                              <h4 className="font-medium">Hizmetler</h4>
                              <div className="border rounded-lg">
                                <div className="grid grid-cols-4 gap-4 p-3 border-b bg-muted/50 text-sm font-medium">
                                  <div>Hizmet</div>
                                  <div className="text-center">Adet</div>
                                  <div className="text-right">Birim Fiyat</div>
                                  <div className="text-right">Toplam</div>
                                </div>
                                {selectedInvoice.items.map((item: any, index: number) => (
                                  <div key={index} className="grid grid-cols-4 gap-4 p-3 text-sm">
                                    <div>{item.name}</div>
                                    <div className="text-center">{item.quantity}</div>
                                    <div className="text-right">₺{(item.price / item.quantity).toFixed(2)}</div>
                                    <div className="text-right">₺{item.price.toFixed(2)}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Totals */}
                            <div className="space-y-2 border-t pt-4">
                              <div className="flex justify-between text-sm">
                                <span>Ara Toplam:</span>
                                <span>₺{selectedInvoice.amount.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>KDV (%18):</span>
                                <span>₺{selectedInvoice.tax.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Genel Toplam:</span>
                                <span>₺{selectedInvoice.total.toFixed(2)}</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-4">
                              <Button className="flex-1">
                                <Download className="h-4 w-4 mr-2" />
                                PDF İndir
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <Mail className="h-4 w-4 mr-2" />
                                E-posta Gönder
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      E-posta
                    </Button>

                    {invoice.status === 'pending' || invoice.status === 'overdue' ? (
                      <Button size="sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Öde
                      </Button>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredInvoices.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Fatura bulunamadı</h3>
            <p className="text-muted-foreground mb-4">
              Arama kriterlerinize uygun fatura bulunamadı.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
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