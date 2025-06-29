'use client'

import { useState, useEffect } from 'react'
import { useRequireAuth } from '@/hooks/use-auth-guard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { User, Settings, Save, Upload, Trash2, Shield, Mail, Phone, MapPin } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { updatePassword, updateProfile, sendEmailVerification, deleteUser } from 'firebase/auth'
import { auth } from '@/lib/firebase'

interface ProfileData {
  display_name: string
  email: string
  phone?: string
  bio?: string
  location?: string
  website?: string
  birthday?: string
}

export default function ProfilePage() {
  const { loading, authorized, user } = useRequireAuth()
  const [profileData, setProfileData] = useState<ProfileData>({
    display_name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    birthday: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (user) {
      setProfileData({
        display_name: user.display_name || '',
        email: user.email || '',
        phone: user.profile?.phone || '',
        bio: user.profile?.bio || '',
        location: user.profile?.location || '',
        website: user.profile?.website || '',
        birthday: user.profile?.birthday || ''
      })
    }
  }, [user])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      // Firebase profile güncelle
      const currentUser = auth.currentUser
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: profileData.display_name
        })
      }

      // MongoDB'ye kaydet
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await currentUser?.getIdToken()}`
        },
        body: JSON.stringify({
          display_name: profileData.display_name,
          profile: {
            phone: profileData.phone,
            bio: profileData.bio,
            location: profileData.location,
            website: profileData.website,
            birthday: profileData.birthday
          }
        })
      })

      if (response.ok) {
        toast({
          title: "Profil Güncellendi",
          description: "Profiliniz başarıyla güncellendi.",
        })
        setIsEditing(false)
      } else {
        throw new Error('Profile update failed')
      }

    } catch (error) {
      console.error('Profile update error:', error)
      toast({
        title: "Hata",
        description: "Profil güncellenirken bir hata oluştu.",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Hata",
        description: "Yeni şifreler eşleşmiyor.",
        variant: "destructive"
      })
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: "Hata", 
        description: "Yeni şifre en az 6 karakter olmalı.",
        variant: "destructive"
      })
      return
    }

    try {
      const currentUser = auth.currentUser
      if (currentUser) {
        await updatePassword(currentUser, newPassword)
        toast({
          title: "Şifre Güncellendi",
          description: "Şifreniz başarıyla güncellendi.",
        })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (error) {
      console.error('Password update error:', error)
      toast({
        title: "Hata",
        description: "Şifre güncellenirken bir hata oluştu.",
        variant: "destructive"
      })
    }
  }

  const handleSendVerificationEmail = async () => {
    try {
      const currentUser = auth.currentUser
      if (currentUser) {
        await sendEmailVerification(currentUser)
        toast({
          title: "E-posta Gönderildi",
          description: "Doğrulama e-postası gönderildi.",
        })
      }
    } catch (error) {
      console.error('Email verification error:', error)
      toast({
        title: "Hata",
        description: "E-posta gönderilirken bir hata oluştu.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const currentUser = auth.currentUser
      if (currentUser) {
        // Önce MongoDB'den sil
        await fetch('/api/auth/delete-account', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${await currentUser.getIdToken()}`
          }
        })

        // Sonra Firebase'den sil
        await deleteUser(currentUser)
        
        toast({
          title: "Hesap Silindi",
          description: "Hesabınız başarıyla silindi.",
        })
      }
    } catch (error) {
      console.error('Account deletion error:', error)
      toast({
        title: "Hata",
        description: "Hesap silinirken bir hata oluştu.",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <User className="h-8 w-8 mr-3" />
            Profil Yönetimi
          </h1>
          <p className="text-gray-600 mt-2">Hesap bilgilerinizi ve tercihlerinizi yönetin</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Profil Bilgileri</span>
                  <Button
                    variant={isEditing ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {isEditing ? 'İptal' : 'Düzenle'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="display_name">Ad Soyad</Label>
                    <Input
                      id="display_name"
                      value={profileData.display_name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, display_name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="+90 555 123 4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Konum</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="İstanbul, Türkiye"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Hakkımda</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Kendinizi tanıtın..."
                    rows={3}
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Hesap Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.photo_url} />
                    <AvatarFallback>
                      {user?.display_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user?.display_name || 'İsimsiz Kullanıcı'}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">E-posta Doğrulandı</span>
                    <Badge variant={user?.email_verified ? 'default' : 'destructive'}>
                      {user?.email_verified ? 'Evet' : 'Hayır'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hesap Durumu</span>
                    <Badge variant={user?.is_active ? 'default' : 'secondary'}>
                      {user?.is_active ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rol</span>
                    <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                      {user?.role === 'admin' ? 'Admin' : 'Kullanıcı'}
                    </Badge>
                  </div>
                </div>

                {!user?.email_verified && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSendVerificationEmail}
                    className="w-full"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    E-posta Doğrula
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Password Change */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Şifre Değiştir
            </CardTitle>
            <CardDescription>
              Güvenliğiniz için güçlü bir şifre seçin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="newPassword">Yeni Şifre</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="En az 6 karakter"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Şifreyi tekrar girin"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleChangePassword} className="w-full">
                  Şifreyi Güncelle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="mt-6 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center">
              <Trash2 className="h-5 w-5 mr-2" />
              Tehlikeli İşlemler
            </CardTitle>
            <CardDescription>
              Bu işlemler geri alınamaz. Dikkatli olun.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showDeleteConfirm ? (
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Hesabı Sil
              </Button>
            ) : (
              <Alert className="border-red-200">
                <AlertDescription>
                  <p className="mb-4">
                    Bu işlem geri alınamaz. Hesabınız ve tüm verileriniz kalıcı olarak silinecek.
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                    >
                      Evet, Hesabımı Sil
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      İptal
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 