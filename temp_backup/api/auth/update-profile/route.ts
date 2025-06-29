import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { userService } from '@/lib/user-service'

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await adminAuth.verifyIdToken(token)

    const body = await request.json()
    const { display_name, profile } = body

    // MongoDB'de kullanıcıyı güncelle
    const updatedUser = await userService.updateUser(decodedToken.uid, {
      display_name,
      profile: {
        ...profile,
        updated_at: new Date()
      },
      updated_at: new Date()
    })

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Audit log
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const clientIp = forwardedFor?.split(',')[0] || realIp || 'unknown'
    
    await userService.logUserActivity(decodedToken.uid, 'profile_updated', {
      updated_fields: Object.keys({ display_name, ...profile }),
      ip: clientIp,
      user_agent: request.headers.get('user-agent') || 'unknown'
    })

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Profile update failed' },
      { status: 500 }
    )
  }
} 