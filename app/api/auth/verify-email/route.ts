import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { validateEnvironmentVariables } from '@/lib/auth-utils'

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

    try {
      // Email verification link oluştur
      const verificationLink = await adminAuth.generateEmailVerificationLink(email)
      
      // TODO: Email gönderme service'i entegre edilecek
      console.log('Email verification link generated:', verificationLink)

      return NextResponse.json({
        success: true,
        message: 'Email doğrulama linki gönderildi',
        // Development için link'i response'ta döndürüyoruz
        verification_link: process.env.NODE_ENV === 'development' ? verificationLink : undefined
      })

    } catch (adminError: any) {
      console.error('Admin auth error:', adminError)
      
      if (adminError.code === 'auth/user-not-found') {
        return NextResponse.json(
          { success: false, message: 'Bu email adresi ile kayıtlı kullanıcı bulunamadı' },
          { status: 404 }
        )
      }

      return NextResponse.json(
        { success: false, message: 'Email doğrulama linki oluşturulamadı' },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('Email verification error:', error)

    return NextResponse.json(
      { success: false, message: 'Email doğrulama işlemi başarısız' },
      { status: 500 }
    )
  }
} 