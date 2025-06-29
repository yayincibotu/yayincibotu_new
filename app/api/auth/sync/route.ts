import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { userService } from '@/lib/user-service'
import { validateEnvironmentVariables } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
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
    
    // Firebase Admin SDK ile kullanıcı bilgilerini al
    const firebaseUser = await adminAuth.getUser(decodedToken.uid)

    // MongoDB'ye sync et
    const syncedUser = await userService.syncFirebaseUser(firebaseUser)

    return NextResponse.json({
      success: true,
      message: 'Kullanıcı başarıyla sync edildi',
      user: {
        ...syncedUser,
        _id: syncedUser._id?.toString(), // ObjectId'yi string'e çevir
      }
    })

  } catch (error: any) {
    console.error('Auth sync error:', error)

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

    if (error.code === 'auth/user-not-found') {
      return NextResponse.json(
        { success: false, message: 'Firebase kullanıcısı bulunamadı' },
        { status: 404 }
      )
    }

    if (error.message === 'Bu email adresi zaten kayıtlı') {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Sync işlemi başarısız' },
      { status: 500 }
    )
  }
} 