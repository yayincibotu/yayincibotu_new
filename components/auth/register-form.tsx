'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, Eye, EyeOff, Loader2, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, sendVerificationEmail } from '@/lib/firebase'

const registerSchema = z.object({
  email: z.string().email('Geçersiz email adresi'),
  password: z.string()
    .min(6, 'Şifre en az 6 karakter olmalı')
    .regex(/[A-Za-z]/, 'Şifre en az bir harf içermeli')
    .regex(/[0-9]/, 'Şifre en az bir rakam içermeli'),
  confirm_password: z.string(),
  first_name: z.string().min(2, 'Ad en az 2 karakter olmalı').optional(),
  last_name: z.string().min(2, 'Soyad en az 2 karakter olmalı').optional()
}).refine(data => data.password === data.confirm_password, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirm_password']
})

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess: (message: string, email: string) => void
  onError: (message: string) => void
}

export default function RegisterForm({ onSuccess, onError }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: ''
    }
  })

  const onSubmit = async (data: RegisterFormData) => {
    console.log('=== SUBMIT DEBUG ===')
    console.log('termsAccepted state:', termsAccepted)
    console.log('typeof termsAccepted:', typeof termsAccepted)
    
    // State-based terms validation
    if (!termsAccepted) {
      console.log('❌ Terms not accepted, showing error')
      onError('Kullanım şartlarını kabul etmelisiniz')
      return
    }

    console.log('✅ Terms accepted, proceeding...')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          terms_accepted: termsAccepted
        })
      })

      const result = await response.json()

      if (result.success) {
        try {
          // Register başarılı olduktan sonra otomatik login yap
          const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
          
          // Email verification gönder
          const emailResult = await sendVerificationEmail(userCredential.user)
          
          if (emailResult.success) {
            onSuccess('Hesap başarıyla oluşturuldu! Email adresinize doğrulama linki gönderildi.', data.email)
          } else {
            onSuccess('Hesap oluşturuldu ancak doğrulama emaili gönderilemedi. Profil sayfasından tekrar deneyebilirsiniz.', data.email)
          }
        } catch (loginError) {
          console.error('Otomatik login hatası:', loginError)
          onSuccess('Hesap başarıyla oluşturuldu! Giriş yapıp email doğrulaması yapabilirsiniz.', data.email)
        }
        
        form.reset()
        setTermsAccepted(false)
      } else {
        if (result.errors) {
          onError(result.errors.join(', '))
        } else {
          onError(result.message)
        }
      }
    } catch (error: any) {
      console.error('Register error:', error)
      onError('Kayıt olurken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">Ad</Label>
          <Input
            id="first-name"
            placeholder="Adınız"
            {...form.register('first_name')}
          />
          {form.formState.errors.first_name && (
            <p className="text-sm text-destructive">
              {form.formState.errors.first_name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Soyad</Label>
          <Input
            id="last-name"
            placeholder="Soyadınız"
            {...form.register('last_name')}
          />
          {form.formState.errors.last_name && (
            <p className="text-sm text-destructive">
              {form.formState.errors.last_name.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email">Email Adresi</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-email"
            type="email"
            placeholder="ornek@email.com"
            className="pl-10"
            {...form.register('email')}
          />
        </div>
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password">Şifre</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="pl-10 pr-10"
            {...form.register('password')}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {form.formState.errors.password && (
          <p className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Şifre Tekrarı</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="pl-10 pr-10"
            {...form.register('confirm_password')}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {form.formState.errors.confirm_password && (
          <p className="text-sm text-destructive">
            {form.formState.errors.confirm_password.message}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          checked={termsAccepted}
          onChange={(e) => {
            console.log('=== CHECKBOX DEBUG ===')
            console.log('Checkbox clicked, checked:', e.target.checked)
            setTermsAccepted(e.target.checked)
            console.log('State will be set to:', e.target.checked)
          }}
        />
        <Label htmlFor="terms" className="text-sm">
          <Link href="/terms" className="text-purple-600 hover:underline">
            Kullanım Şartları
          </Link>
          {' '}ve{' '}
          <Link href="/privacy" className="text-purple-600 hover:underline">
            Gizlilik Politikası
          </Link>
          'nı kabul ediyorum
        </Label>
      </div>
      
      {/* Visual Debug */}
      <div className="text-xs bg-yellow-100 p-2 rounded border">
        🔧 Debug: Checkbox state = <strong>{String(termsAccepted)}</strong> ({typeof termsAccepted})
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <UserPlus className="h-4 w-4 mr-2" />
        )}
        Hesap Oluştur
      </Button>
    </form>
  )
} 