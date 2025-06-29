'use client'

import { useState } from 'react'
import { useRequireAuth } from '@/hooks/use-auth-guard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Settings, Globe, Moon, Sun, Shield, Eye, Download, Trash2, AlertTriangle } from 'lucide-react'

export default function SettingsPage() {
  const { loading, authorized } = useRequireAuth()
  const [language, setLanguage] = useState('tr')
  const [timezone, setTimezone] = useState('Europe/Istanbul')
  const [theme, setTheme] = useState('system')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [dataSharing, setDataSharing] = useState(true)
  const [analytics, setAnalytics] = useState(true)

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

  const languages = [
    { value: 'tr', label: 'Türkçe' },
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
    { value: 'fr', label: 'Français' }
  ]

  const timezones = [
    { value: 'Europe/Istanbul', label: 'İstanbul (UTC+3)' },
    { value: 'Europe/London', label: 'Londra (UTC+0)' },
    { value: 'America/New_York', label: 'New York (UTC-5)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (UTC+9)' }
  ]

  const themes = [
    { value: 'light', label: 'Açık Tema', icon: Sun },
    { value: 'dark', label: 'Koyu Tema', icon: Moon },
    { value: 'system', label: 'Sistem Ayarı', icon: Settings }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="h-6 w-6 text-gray-600" />
            Genel Ayarlar
          </h1>
          <p className="text-gray-600 mt-1">
            Hesap tercihlerinizi ve uygulama ayarlarınızı yönetin
          </p>
        </div>
      </div>

      {/* Localization Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Bölgeselleştirme
          </CardTitle>
          <CardDescription>
            Dil ve saat dilimi tercihlerinizi belirleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Dil</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Saat Dilimi</label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Görünüm</CardTitle>
          <CardDescription>
            Tema ve görsel tercihlerinizi ayarlayın
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tema</label>
            <div className="grid grid-cols-3 gap-3">
              {themes.map((themeOption) => {
                const IconComponent = themeOption.icon
                return (
                  <button
                    key={themeOption.value}
                    onClick={() => setTheme(themeOption.value)}
                    className={`p-3 rounded-lg border-2 transition-colors flex flex-col items-center gap-2 ${
                      theme === themeOption.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-sm">{themeOption.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Güvenlik
          </CardTitle>
          <CardDescription>
            Hesap güvenliği ve gizlilik ayarları
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">İki Faktörlü Doğrulama</label>
              <p className="text-sm text-gray-500">Hesabınız için ekstra güvenlik katmanı</p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Veri Paylaşımı</label>
              <p className="text-sm text-gray-500">Hizmet iyileştirme için anonim veri paylaşımı</p>
            </div>
            <Switch
              checked={dataSharing}
              onCheckedChange={setDataSharing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Analitik Veriler</label>
              <p className="text-sm text-gray-500">Kullanım analitikleri toplanmasına izin ver</p>
            </div>
            <Switch
              checked={analytics}
              onCheckedChange={setAnalytics}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Veri Yönetimi
          </CardTitle>
          <CardDescription>
            Kişisel verilerinizi indirin veya silin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Verilerimi İndir</h4>
              <p className="text-sm text-gray-500">Hesap verilerinizin bir kopyasını indirin</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              İndir
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 className="font-medium text-red-900">Hesabı Sil</h4>
              <p className="text-sm text-red-600">Bu işlem geri alınamaz</p>
            </div>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Hesabı Sil
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Gizlilik
          </CardTitle>
          <CardDescription>
            Profil görünürlüğü ve gizlilik tercihleri
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Profil Görünürlüğü</label>
                <p className="text-sm text-gray-500">Profilinizi diğer kullanıcılar görebilsin</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Çevrimiçi Durumu</label>
                <p className="text-sm text-gray-500">Çevrimiçi olduğunuz zaman gösterilsin</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">İstatistik Paylaşımı</label>
                <p className="text-sm text-gray-500">Sipariş ve kullanım istatistiklerinizi paylaşın</p>
              </div>
              <Switch />
            </div>
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