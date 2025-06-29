import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { userService } from '@/lib/user-service'
import { validateEnvironmentVariables, isValidEmail } from '@/lib/auth-utils'
import { LoginFormData } from '@/types/auth'

export async function POST(request: NextRequest) {
  try {
    // Environment variables kontrolü
    validateEnvironmentVariables()

    // Request body'yi parse et
    const body: LoginFormData = await request.json()
    
    // Gerekli alanları kontrol et
    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: 'Email ve şifre gerekli' },
        { status: 400 }
      )
    }

    // Email validasyonu
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz email adresi' },
        { status: 400 }
      )
    }

    // MongoDB'den kullanıcıyı bul
    const mongoUser = await userService.findByEmail(body.email)
    if (!mongoUser) {
      return NextResponse.json(
        { success: false, message: 'Bu email adresi ile kayıtlı kullanıcı bulunamadı' },
        { status: 404 }
      )
    }

    // Kullanıcı aktif mi kontrol et
    if (!mongoUser.is_active) {
      return NextResponse.json(
        { success: false, message: 'Hesabınız devre dışı bırakılmış. Lütfen destek ile iletişime geçin.' },
        { status: 403 }
      )
    }

    // Firebase Admin SDK ile kullanıcı bilgilerini al
    try {
      const firebaseUser = await adminAuth.getUser(mongoUser.firebase_uid)
      
      // Email doğrulanmış mı kontrol et
      if (!firebaseUser.emailVerified) {
        // Email verification link yeniden gönder
        const verificationLink = await adminAuth.generateEmailVerificationLink(body.email)
        console.log('Email verification link resent:', verificationLink)
        
        return NextResponse.json(
          { 
            success: false, 
            message: 'Email adresiniz doğrulanmamış. Doğrulama linki tekrar gönderildi.',
            email_not_verified: true
          },
          { status: 403 }
        )
      }

      // Custom token oluştur (client tarafında signInWithCustomToken için)
      const customToken = await adminAuth.createCustomToken(mongoUser.firebase_uid)

      // Son giriş zamanını güncelle
      await userService.updateLastLogin(mongoUser.firebase_uid)

      return NextResponse.json({
        success: true,
        message: 'Giriş başarılı',
        custom_token: customToken,
        user: {
          ...mongoUser,
          _id: mongoUser._id?.toString(),
        }
      })

    } catch (firebaseError: any) {
      console.error('Firebase user error:', firebaseError)
      
      if (firebaseError.code === 'auth/user-not-found') {
        return NextResponse.json(
          { success: false, message: 'Kullanıcı bulunamadı' },
          { status: 404 }
        )
      }

      throw firebaseError
    }

  } catch (error: any) {
    console.error('Login error:', error)

    return NextResponse.json(
      { success: false, message: 'Giriş yapılırken hata oluştu' },
      { status: 500 }
    )
  }
} 