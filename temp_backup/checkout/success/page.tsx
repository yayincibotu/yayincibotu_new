"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Download, ArrowRight, Clock, Home } from 'lucide-react'
import Link from 'next/link'

interface OrderData {
  order_id: string
  payment_intent_id: string
  service_type: string
  quantity: number
  amount_total: number
  status: string
  created_at: string
}

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      // Simulate order data fetch
      setTimeout(() => {
        setOrderData({
          order_id: orderId,
          payment_intent_id: 'pi_demo_123',
          service_type: 'TWITCH_VIEWERS',
          quantity: 500,
          amount_total: 3539, // ₺35.39
          status: 'completed',
          created_at: new Date().toISOString(),
        })
        setLoading(false)
      }, 1000)
    }
  }, [orderId])

  const getServiceName = (type: string) => {
    switch (type) {
      case 'TWITCH_VIEWERS': return 'Twitch İzleyici'
      case 'INSTAGRAM_FOLLOWERS': return 'Instagram Takipçi'
      case 'YOUTUBE_VIEWS': return 'YouTube İzlenme'
      case 'TIKTOK_LIKES': return 'TikTok Beğeni'
      default: return 'Hizmet'
    }
  }

  const formatPrice = (amountInCents: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amountInCents / 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white">Sipariş bilgileri yükleniyor...</h2>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 flex items-center justify-center">
        <Card className="max-w-md border-red-500/20 bg-background/50 backdrop-blur-md">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Sipariş Bulunamadı</h3>
            <p className="text-muted-foreground mb-4">
              Belirtilen sipariş ID'sine ait bir sipariş bulunamadı.
            </p>
            <Button onClick={() => router.push('/')} className="bg-purple-600 hover:bg-purple-700">
              Ana Sayfaya Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 py-12">
      <div className="container max-w-2xl">
        {/* Success Icon & Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Ödeme Başarılı!</h1>
          <p className="text-purple-200">
            Siparişiniz başarıyla oluşturuldu ve ödemeniz alındı
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-foreground">
              <span>Sipariş Detayları</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/20">
                Tamamlandı
              </Badge>
            </CardTitle>
            <CardDescription>
              Sipariş ID: {orderData.order_id}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Hizmet</span>
                <p className="font-medium text-foreground">{getServiceName(orderData.service_type)}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Miktar</span>
                <p className="font-medium text-foreground">{orderData.quantity} adet</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Toplam Tutar</span>
                <p className="font-medium text-foreground">{formatPrice(orderData.amount_total)}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Ödeme Tarihi</span>
                <p className="font-medium text-foreground">
                  {new Date(orderData.created_at).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processing Info */}
        <Card className="border-blue-500/20 bg-background/50 backdrop-blur-md mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mt-1">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Siparişiniz İşleniyor</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Siparişiniz başarıyla alındı ve işleme konuldu. Hizmetiniz en kısa sürede aktif hale gelecektir.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• İşleme süresi: 5-15 dakika</li>
                  <li>• Teslim süresi: 1-24 saat</li>
                  <li>• Durum güncellemeleri e-posta ile gönderilecek</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            asChild
            variant="outline"
            className="border-purple-500/20 hover:bg-purple-500/10"
          >
            <Link href="/cp/orders">
              <Download className="w-4 h-4 mr-2" />
              Siparişlerim
            </Link>
          </Button>

          <Button 
            asChild
            variant="outline"
            className="border-purple-500/20 hover:bg-purple-500/10"
          >
            <Link href="/cp/invoices">
              <Download className="w-4 h-4 mr-2" />
              Fatura İndir
            </Link>
          </Button>

          <Button 
            asChild
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfa
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Herhangi bir sorunuz mu var? {' '}
            <Link href="/support" className="text-purple-400 hover:underline">
              Destek ekibimizle iletişime geçin
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 