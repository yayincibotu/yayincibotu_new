import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { userService } from '@/lib/user-service'
import { validateEnvironmentVariables } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    // Environment variables kontrolü
    validateEnvironmentVariables()

    // Authorization header'dan token al
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authorization token gerekli' },
        { status: 401 }
      )
    }

    const token = authHeader.split('Bearer ')[1]

    // Firebase token'ı doğrula
    const decodedToken = await adminAuth.verifyIdToken(token)
    
    // MongoDB'den kullanıcı bilgilerini al
    const user = await userService.findByFirebaseUid(decodedToken.uid)
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      )
    }

    // Son giriş zamanını güncelle
    await userService.updateLastLogin(decodedToken.uid)

    return NextResponse.json({
      success: true,
      message: 'Kullanıcı bilgileri başarıyla alındı',
      user: {
        ...user,
        _id: user._id?.toString(), // ObjectId'yi string'e çevir
      }
    })

  } catch (error: any) {
    console.error('Auth user error:', error)

    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { success: false, message: 'Token süresi dolmuş' },
        { status: 401 }
      )
    }

    if (error.code === 'auth/invalid-id-token') {
      return NextResponse.json(
        { success: false, message: 'Geçersiz token' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 