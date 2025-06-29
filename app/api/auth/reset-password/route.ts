import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { userService } from '@/lib/user-service'
import { validateEnvironmentVariables, isValidEmail } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    // Environment variables kontrolü
    validateEnvironmentVariables()

    // Request body'yi parse et
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email adresi gerekli' },
        { status: 400 }
      )
    }

    // Email validasyonu
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz email adresi' },
        { status: 400 }
      )
    }

    // MongoDB'de kullanıcı var mı kontrol et
    const mongoUser = await userService.findByEmail(email)
    if (!mongoUser) {
      // Güvenlik için aynı mesajı dönüyoruz
      return NextResponse.json({
        success: true,
        message: 'Eğer bu email adresi kayıtlıysa, şifre sıfırlama linki gönderilmiştir.'
      })
    }

    try {
      // Password reset link oluştur
      const resetLink = await adminAuth.generatePasswordResetLink(email)
      
      // TODO: Email gönderme service'i entegre edilecek
      console.log('Password reset link generated:', resetLink)

      return NextResponse.json({
        success: true,
        message: 'Şifre sıfırlama linki email adresinize gönderildi.',
        // Development için link'i response'ta döndürüyoruz
        reset_link: process.env.NODE_ENV === 'development' ? resetLink : undefined
      })

    } catch (adminError: any) {
      console.error('Admin auth error:', adminError)
      
      if (adminError.code === 'auth/user-not-found') {
        // Güvenlik için aynı mesajı dönüyoruz
        return NextResponse.json({
          success: true,
          message: 'Eğer bu email adresi kayıtlıysa, şifre sıfırlama linki gönderilmiştir.'
        })
      }

      return NextResponse.json(
        { success: false, message: 'Şifre sıfırlama linki oluşturulamadı' },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('Password reset error:', error)

    return NextResponse.json(
      { success: false, message: 'Şifre sıfırlama işlemi başarısız' },
      { status: 500 }
    )
  }
} 