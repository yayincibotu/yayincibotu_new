'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/contexts/auth-context'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import LoginForm from '@/components/auth/login-form'
import RegisterForm from '@/components/auth/register-form'

import { 
  Loader2, 
  Check, 
  AlertCircle, 
  UserPlus,
  LogIn,
  Star,
  Badge as BadgeIcon
} from 'lucide-react'
import Link from 'next/link'



export default function AuthPage() {
  const router = useRouter()
  const { state } = useAuth()
  const [activeTab, setActiveTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Reset error and success messages when tab changes
  useEffect(() => {
    setError(null)
    setSuccess(null)
  }, [activeTab])

  // Form handlers
  const handleLoginSuccess = (message: string) => {
    setSuccess(message)
    setError(null)
  }

  const handleLoginError = (message: string) => {
    setError(message)
    setSuccess(null)
  }

  const handleEmailNotVerified = (message: string) => {
    setSuccess(message)
    setError(null)
  }

  const handleRegisterSuccess = (message: string, email: string) => {
    setSuccess(message)
    setError(null)
    // 3 saniye sonra login tab'ına geçiş yap
    setTimeout(() => {
      setActiveTab('login')
    }, 3000)
  }

  const handleRegisterError = (message: string) => {
    setError(message)
    setSuccess(null)
  }

  // Google OAuth handler
  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const provider = new GoogleAuthProvider()
      provider.addScope('email')
      provider.addScope('profile')
      
      await signInWithPopup(auth, provider)
      
      setSuccess('Google ile giriş başarılı! Yönlendiriliyorsunuz...')
      
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (error: any) {
      console.error('Google sign in error:', error)
      setError('Google ile giriş yapılırken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  // Eğer kullanıcı zaten giriş yapmışsa warning göster
  if (state.user && !state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-xl">Zaten Giriş Yaptınız</CardTitle>
            <p className="text-muted-foreground">
              {state.user.display_name || state.user.email} olarak giriş yapmış durumdasınız.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => router.push('/')} className="w-full">
              Ana Sayfaya Git
            </Button>
            <Button 
              variant="outline" 
              onClick={() => auth.signOut()} 
              className="w-full"
            >
              Farklı Hesapla Giriş Yap
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Twitch İzleyici <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-white">
                Büyütme Platformu
              </span>
            </h1>

            <p className="text-xl text-purple-100 leading-relaxed">
              Gerçek ve organik izleyiciler ile kitlenizi büyütün. 
              Bot yok, fake hesaplar yok - sadece gerçek etkileşim.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg">%100 Güvenli ve Legal</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg">7/24 Otomatik Teslimat</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg">Gerçek İzleyici Garantisi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Hesabınıza Giriş Yapın
            </h2>
            <p className="text-muted-foreground">
              Premium özelliklere erişim için giriş yapın veya hesap oluşturun
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <Check className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Auth Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Giriş Yap
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Üye Ol
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login" className="space-y-6">
              <LoginForm
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
                onEmailNotVerified={handleEmailNotVerified}
              />
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register" className="space-y-6">
              <RegisterForm
                onSuccess={handleRegisterSuccess}
                onError={handleRegisterError}
              />
            </TabsContent>
          </Tabs>

          {/* Google OAuth */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Veya
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Google ile Devam Et
          </Button>

          {/* Premium Features */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Premium Üyelik Avantajları</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Sınırsız İzleyici</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Öncelikli Destek</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Gelişmiş İstatistikler</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Özel Kampanyalar</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            Giriş yaparak{' '}
            <Link href="/terms" className="text-purple-600 hover:underline">
              Kullanım Şartları
            </Link>
            'nı kabul etmiş olursunuz.
          </div>
        </div>
      </div>
    </div>
  )
} 