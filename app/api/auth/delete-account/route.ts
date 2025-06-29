import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { userService } from '@/lib/user-service'

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await adminAuth.verifyIdToken(token)

    // Get client IP
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const clientIp = forwardedFor?.split(',')[0] || realIp || 'unknown'

    // Audit log before deletion
    await userService.logUserActivity(decodedToken.uid, 'account_deletion_requested', {
      ip: clientIp,
      user_agent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date()
    })

    // Get user data before deletion for logging
    const user = await userService.findByFirebaseUid(decodedToken.uid)
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Log final audit entry
    await userService.logUserActivity(decodedToken.uid, 'account_deleted', {
      user_email: user.email,
      user_display_name: user.display_name,
      ip: clientIp,
      user_agent: request.headers.get('user-agent') || 'unknown',
      deletion_timestamp: new Date()
    })

    // Delete user from MongoDB
    await userService.deleteUser(decodedToken.uid)

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully'
    })

  } catch (error) {
    console.error('Account deletion error:', error)
    return NextResponse.json(
      { error: 'Account deletion failed' },
      { status: 500 }
    )
  }
} 