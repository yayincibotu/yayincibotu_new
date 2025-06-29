import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { validateEnvironmentVariables } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    // Environment variables kontrolü
    validateEnvironmentVariables()

    // Authorization header'dan token al
    const authHeader = request.headers.get('authorization')
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1]

      try {
        // Firebase token'ı doğrula
        const decodedToken = await adminAuth.verifyIdToken(token)
        
        // Kullanıcının tüm refresh token'larını iptal et (tüm cihazlardan çıkış)
        await adminAuth.revokeRefreshTokens(decodedToken.uid)

        console.log(`User ${decodedToken.uid} logged out successfully`)

        return NextResponse.json({
          success: true,
          message: 'Başarıyla çıkış yapıldı'
        })

      } catch (tokenError: any) {
        console.error('Token verification error during logout:', tokenError)
        
        // Token geçersiz olsa bile çıkış başarılı sayalım
        return NextResponse.json({
          success: true,
          message: 'Çıkış yapıldı'
        })
      }
    }

    // Token yoksa da çıkış başarılı sayalım (client-side logout)
    return NextResponse.json({
      success: true,
      message: 'Çıkış yapıldı'
    })

  } catch (error: any) {
    console.error('Logout error:', error)

    // Logout işlemi kritik değil, her durumda başarılı dönelim
    return NextResponse.json({
      success: true,
      message: 'Çıkış yapıldı'
    })
  }
}

// GET method'u da destekleyelim (bazı client'lar GET ile logout yapabilir)
export async function GET(request: NextRequest) {
  return POST(request)
} 