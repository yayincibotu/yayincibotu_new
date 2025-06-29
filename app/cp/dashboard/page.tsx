'use client'

import { useRequireAuth } from '@/hooks/use-auth-guard'
import { useSessionTimeout } from '@/hooks/use-session-timeout'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Clock, Shield, User, Settings, LogOut } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function DashboardPage() {
  const { loading, authorized, user } = useRequireAuth()
  const [showSessionWarning, setShowSessionWarning] = useState(false)

  const { extendSession, getRemainingTime, logout } = useSessionTimeout({
    idleTime: 30, // 30 dakika
    warningTime: 5, // 5 dakika kala uyar
    onWarning: () => {
      setShowSessionWarning(true)
      toast({
        title: "Oturum Uyarısı",
        description: "Oturumunuz 5 dakika içinde sona erecek. Devam etmek için bir işlem yapın.",
        variant: "destructive"
      })
    },
    onTimeout: () => {
      toast({
        title: "Oturum Sonlandı",
        description: "Güvenlik için oturumunuz sonlandırıldı.",
        variant: "destructive"
      })
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (!authorized) {
    return null // Middleware will handle redirect
  }

  const handleExtendSession = () => {
    extendSession()
    setShowSessionWarning(false)
    toast({
      title: "Oturum Uzatıldı",
      description: "Oturumunuz başarıyla uzatıldı.",
      variant: "default"
    })
  }

  const remainingTime = getRemainingTime()
  const remainingMinutes = Math.floor(remainingTime / (1000 * 60))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Hoş geldiniz, {user?.display_name || user?.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {remainingMinutes}dk kaldı
              </Badge>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Çıkış
              </Button>
            </div>
          </div>
        </header>

        {showSessionWarning && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-800">Oturum Uyarısı</p>
                    <p className="text-sm text-yellow-600">Oturumunuz 5 dakika içinde sona erecek</p>
                  </div>
                </div>
                <Button onClick={handleExtendSession} size="sm">
                  Oturumu Uzat
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Kullanıcı Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Ad:</strong> {user?.display_name || 'Belirtilmemiş'}</p>
                <p><strong>Provider:</strong> {user?.provider}</p>
                <p><strong>Rol:</strong> 
                  <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="ml-2">
                    {user?.role || 'user'}
                  </Badge>
                </p>
                <p><strong>Email Doğrulandı:</strong> 
                  <Badge variant={user?.email_verified ? 'default' : 'destructive'} className="ml-2">
                    {user?.email_verified ? 'Evet' : 'Hayır'}
                  </Badge>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Güvenlik Durumu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Middleware Koruması</span>
                  <Badge variant="default">Aktif</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Session Timeout</span>
                  <Badge variant="default">30dk</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Firebase Auth</span>
                  <Badge variant="default">Bağlı</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>MongoDB Sync</span>
                  <Badge variant="default">Aktif</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Hızlı İşlemler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  Profil Ayarları
                </Button>
                <Button className="w-full" variant="outline">
                  Güvenlik Ayarları
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleExtendSession}
                >
                  Oturumu Uzat
                </Button>
                <Button 
                  className="w-full" 
                  variant="destructive"
                  onClick={logout}
                >
                  Çıkış Yap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Sistem Bilgileri</CardTitle>
            <CardDescription>
              Bu sayfa protected route middleware ile korunmaktadır
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Son Giriş:</strong> {user?.last_login_at ? new Date(user.last_login_at).toLocaleString('tr-TR') : 'Bilgi yok'}</p>
                <p><strong>Hesap Oluşturma:</strong> {user?.created_at ? new Date(user.created_at).toLocaleString('tr-TR') : 'Bilgi yok'}</p>
              </div>
              <div>
                <p><strong>Firebase UID:</strong> {user?.firebase_uid}</p>
                <p><strong>Hesap Durumu:</strong> 
                  <Badge variant={user?.is_active ? 'default' : 'destructive'} className="ml-2">
                    {user?.is_active ? 'Aktif' : 'Pasif'}
                  </Badge>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 