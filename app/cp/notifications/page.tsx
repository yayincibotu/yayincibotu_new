'use client'

import { useState } from 'react'
import { useRequireAuth } from '@/hooks/use-auth-guard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Bell, BellOff, Mail, MessageSquare, ShoppingCart, CreditCard, Shield, Smartphone } from 'lucide-react'

export default function NotificationsPage() {
  const { loading, authorized } = useRequireAuth()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  const notificationTypes = [
    {
      id: 'orders',
      icon: ShoppingCart,
      title: 'Sipariş Bildirimleri',
      description: 'Sipariş durumu güncellemeleri',
      email: true,
      push: true,
      sms: false
    },
    {
      id: 'payments',
      icon: CreditCard,
      title: 'Ödeme Bildirimleri',
      description: 'Ödeme onayları ve fatura bilgileri',
      email: true,
      push: true,
      sms: true
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Güvenlik Bildirimleri',
      description: 'Hesap güvenliği ve giriş uyarıları',
      email: true,
      push: true,
      sms: true
    },
    {
      id: 'promotions',
      icon: MessageSquare,
      title: 'Promosyon Bildirimleri',
      description: 'İndirimler ve özel teklifler',
      email: false,
      push: false,
      sms: false
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-500" />
            Bildirim Ayarları
          </h1>
          <p className="text-gray-600 mt-1">
            Bildirim tercihlerinizi yönetin
          </p>
        </div>
      </div>

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Genel Bildirim Ayarları</CardTitle>
          <CardDescription>
            Tüm bildirimleri tek seferde açabilir veya kapatabilirsiniz
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-500" />
              <div>
                <label className="text-sm font-medium">E-posta Bildirimleri</label>
                <p className="text-sm text-gray-500">E-posta ile bildirim alın</p>
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-green-500" />
              <div>
                <label className="text-sm font-medium">Tarayıcı Bildirimleri</label>
                <p className="text-sm text-gray-500">Tarayıcı push bildirimleri</p>
              </div>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-purple-500" />
              <div>
                <label className="text-sm font-medium">SMS Bildirimleri</label>
                <p className="text-sm text-gray-500">Kritik bildirimler için SMS</p>
              </div>
            </div>
            <Switch
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Bildirim Türleri</CardTitle>
          <CardDescription>
            Her bildirim türü için ayrı ayrı ayarlar yapabilirsiniz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {notificationTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <div key={type.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-purple-600" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{type.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">{type.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">E-posta</span>
                          <Switch
                            checked={type.email && emailNotifications}
                            disabled={!emailNotifications}
                            onCheckedChange={() => {}}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Tarayıcı</span>
                          <Switch
                            checked={type.push && pushNotifications}
                            disabled={!pushNotifications}
                            onCheckedChange={() => {}}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">SMS</span>
                          <Switch
                            checked={type.sms && smsNotifications}
                            disabled={!smsNotifications}
                            onCheckedChange={() => {}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Son Bildirimler</CardTitle>
          <CardDescription>
            Size gönderilen son bildirimlerin listesi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: '1',
                type: 'order',
                title: 'Siparişiniz tamamlandı',
                message: 'Twitch İzleyici siparişiniz başarıyla tamamlandı.',
                time: '2 saat önce',
                read: false
              },
              {
                id: '2',
                type: 'payment',
                title: 'Ödeme alındı',
                message: 'Instagram Takipçi siparişiniz için ödemeniz alındı.',
                time: '1 gün önce',
                read: true
              },
              {
                id: '3',
                type: 'security',
                title: 'Yeni giriş tespit edildi',
                message: 'Hesabınıza yeni bir cihazdan giriş yapıldı.',
                time: '3 gün önce',
                read: true
              }
            ].map((notification) => (
              <div key={notification.id} className={`flex items-start gap-3 p-3 rounded-lg border ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <span className="text-xs text-gray-500 mt-2 block">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="px-8">
          Ayarları Kaydet
        </Button>
      </div>
    </div>
  )
} 