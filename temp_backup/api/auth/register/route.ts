import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { userService } from '@/lib/user-service'
import { validateEnvironmentVariables, isValidEmail, validatePassword } from '@/lib/auth-utils'
import { RegisterFormData } from '@/types/auth'

export async function POST(request: NextRequest) {
  try {
    // Environment variables kontrolü
    validateEnvironmentVariables()

    // Request body'yi parse et
    const body: RegisterFormData = await request.json()
    
    // Gerekli alanları kontrol et
    if (!body.email || !body.password || !body.confirm_password) {
      return NextResponse.json(
        { success: false, message: 'Email, şifre ve şifre tekrarı gerekli' },
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

    // Şifre eşleşme kontrolü
    if (body.password !== body.confirm_password) {
      return NextResponse.json(
        { success: false, message: 'Şifreler eşleşmiyor' },
        { status: 400 }
      )
    }

    // Şifre gücü kontrolü
    const passwordValidation = validatePassword(body.password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Şifre gereksinimleri karşılanmıyor',
          errors: passwordValidation.errors
        },
        { status: 400 }
      )
    }

    // Terms accepted kontrolü
    if (!body.terms_accepted) {
      return NextResponse.json(
        { success: false, message: 'Kullanım şartlarını kabul etmelisiniz' },
        { status: 400 }
      )
    }

    // MongoDB'de email zaten kayıtlı mı kontrol et
    const existingUser = await userService.findByEmail(body.email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Bu email adresi zaten kayıtlı' },
        { status: 409 }
      )
    }

    // Firebase Auth ile kullanıcı oluştur
    const firebaseUser = await adminAuth.createUser({
      email: body.email,
      password: body.password,
      displayName: body.first_name && body.last_name 
        ? `${body.first_name} ${body.last_name}` 
        : body.first_name || undefined,
      emailVerified: false, // Email verification gerekli
    })

    // MongoDB'ye kullanıcıyı sync et
    const mongoUser = await userService.syncFirebaseUser(firebaseUser)

    // Profil bilgilerini güncelle
    if (body.first_name || body.last_name) {
      await userService.updateUser(firebaseUser.uid, {
        profile: {
          first_name: body.first_name,
          last_name: body.last_name
        }
      })
    }

    // Email verification link gönder
    const verificationLink = await adminAuth.generateEmailVerificationLink(body.email)
    
    // TODO: Email gönderme service'i entegre edilecek
    console.log('Email verification link:', verificationLink)

    return NextResponse.json({
      success: true,
      message: 'Hesap başarıyla oluşturuldu. Email adresinize doğrulama linki gönderildi.',
      user: {
        ...mongoUser,
        _id: mongoUser._id?.toString(),
      }
    }, { status: 201 })

  } catch (error: any) {
    console.error('Register error:', error)

    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json(
        { success: false, message: 'Bu email adresi zaten kayıtlı' },
        { status: 409 }
      )
    }

    if (error.code === 'auth/invalid-email') {
      return NextResponse.json(
        { success: false, message: 'Geçersiz email adresi' },
        { status: 400 }
      )
    }

    if (error.code === 'auth/weak-password') {
      return NextResponse.json(
        { success: false, message: 'Şifre çok zayıf' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Hesap oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
} 