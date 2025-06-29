'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Home, LogIn, Shield } from 'lucide-react'

function UnauthorizedContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(10)
  
  const message = searchParams.get('message') || 'Bu sayfaya erişim yetkiniz bulunmuyor'
  const redirectPath = searchParams.get('redirect') || '/'

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push(redirectPath)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router, redirectPath])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-red-100 p-3">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Erişim Engellendi
          </CardTitle>
          <CardDescription className="text-gray-600">
            {message}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-sm text-red-700">
              Yetkisiz erişim denemesi tespit edildi
            </span>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              {countdown} saniye sonra otomatik olarak yönlendirileceksiniz
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(countdown / 10) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Button 
              onClick={() => router.push('/auth')}
              className="w-full"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Giriş Yap
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Ana Sayfaya Dön
            </Button>
          </div>

          <div className="text-xs text-gray-400 mt-6">
            <p>Eğer bu bir hata olduğunu düşünüyorsanız,</p>
            <p>lütfen sistem yöneticisiyle iletişime geçin.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function UnauthorizedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500" />
      </div>
    }>
      <UnauthorizedContent />
    </Suspense>
  )
} 