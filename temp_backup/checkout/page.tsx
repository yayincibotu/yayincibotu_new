"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CreditCard, ShoppingCart, Lock, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { formatPrice, SERVICE_TYPES, PRICING } from '@/lib/stripe'

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { state } = useAuth()
  const { user, loading } = state

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Get params from URL
  const serviceType = searchParams.get('service') as keyof typeof SERVICE_TYPES || 'TWITCH_VIEWERS'
  const quantity = searchParams.get('quantity') || '100'
  const targetUrl = searchParams.get('url') || ''

  // Calculate pricing
  const serviceConfig = PRICING[serviceType as keyof typeof PRICING]
  const amount = serviceConfig?.[quantity as keyof typeof serviceConfig] || 999
  const taxAmount = Math.round(amount * 0.18)
  const totalAmount = amount + taxAmount

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth?redirect=/checkout')
    }
  }, [user, loading, router])

  const handlePayment = async () => {
    if (!user) {
      setError('Lütfen giriş yapın')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Get Firebase token
      const token = await (user as any).getIdToken()

      // Create payment intent
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          service_type: serviceType,
          quantity: parseInt(quantity),
          amount: amount,
          target_url: targetUrl,
          platform: getPlatform(serviceType),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ödeme oluşturulamadı')
      }

      // Redirect to success page (in real app, would use Stripe Elements)
      router.push(`/checkout/success?order_id=${data.order_id}`)

    } catch (error) {
      console.error('Payment error:', error)
      setError(error instanceof Error ? error.message : 'Ödeme işlemi başarısız')
    } finally {
      setIsLoading(false)
    }
  }

  const getServiceName = (type: string) => {
    switch (type) {
      case 'TWITCH_VIEWERS': return 'Twitch İzleyici'
      case 'INSTAGRAM_FOLLOWERS': return 'Instagram Takipçi'
      case 'YOUTUBE_VIEWS': return 'YouTube İzlenme'
      case 'TIKTOK_LIKES': return 'TikTok Beğeni'
      default: return 'Hizmet'
    }
  }

  const getPlatform = (type: string) => {
    switch (type) {
      case 'TWITCH_VIEWERS': return 'twitch'
      case 'INSTAGRAM_FOLLOWERS': return 'instagram'
      case 'YOUTUBE_VIEWS': return 'youtube'
      case 'TIKTOK_LIKES': return 'tiktok'
      default: return 'unknown'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white">Yükleniyor...</h2>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-4 border-purple-500/20 hover:bg-purple-500/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Button>
          <h1 className="text-3xl font-bold text-white mb-2">Ödeme</h1>
          <p className="text-purple-200">Siparişinizi tamamlayın ve ödemenizi gerçekleştirin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <ShoppingCart className="h-5 w-5" />
                  Sipariş Özeti
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-foreground">{getServiceName(serviceType)}</span>
                    <Badge variant="outline" className="border-purple-500/20">
                      {quantity} adet
                    </Badge>
                  </div>
                  
                  {targetUrl && (
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Hedef URL:</span>
                      <p className="text-xs text-muted-foreground bg-background/50 p-2 rounded border border-purple-500/20 break-all">
                        {targetUrl}
                      </p>
                    </div>
                  )}
                </div>

                <Separator className="bg-purple-500/20" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground">Ara Toplam</span>
                    <span className="text-foreground">{formatPrice(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">KDV (%18)</span>
                    <span className="text-foreground">{formatPrice(taxAmount)}</span>
                  </div>
                  <Separator className="bg-purple-500/20" />
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-foreground">Toplam</span>
                    <span className="text-foreground">{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="border-purple-500/20 bg-background/50 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <CreditCard className="h-5 w-5" />
                  Ödeme Bilgileri
                </CardTitle>
                <CardDescription>
                  Güvenli ödeme için kredi kartı bilgilerinizi girin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* User Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">E-posta Adresi</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="border-purple-500/20 bg-background/30"
                    />
                  </div>
                </div>

                <Separator className="bg-purple-500/20" />

                {/* Payment Method Demo */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-foreground">Kart Numarası</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="border-purple-500/20 bg-background/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-foreground">Son Kullanma</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="border-purple-500/20 bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc" className="text-foreground">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        className="border-purple-500/20 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-foreground">Kart Üzerindeki İsim</Label>
                    <Input
                      id="cardName"
                      placeholder="Ad Soyad"
                      className="border-purple-500/20 bg-background/50"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 border border-red-500/20 bg-red-500/10 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Security Info */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-background/30 rounded-lg border border-purple-500/20">
                  <Lock className="h-4 w-4" />
                  <span>Tüm ödeme bilgileriniz SSL ile güvenli şekilde şifrelenir</span>
                </div>

                {/* Pay Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      {formatPrice(totalAmount)} Öde
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Ödeme yaparak {' '}
                  <a href="/terms" className="text-purple-400 hover:underline">Kullanım Şartları</a>
                  {' '} ve {' '}
                  <a href="/privacy" className="text-purple-400 hover:underline">Gizlilik Politikası</a>
                  'nı kabul etmiş olursunuz.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 