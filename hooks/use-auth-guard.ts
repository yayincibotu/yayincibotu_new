import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

interface UseAuthGuardOptions {
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
  allowedRoles?: string[]
}

interface AuthGuardState {
  loading: boolean
  authorized: boolean
  user: any
}

export function useAuthGuard(options: UseAuthGuardOptions = {}): AuthGuardState {
  const {
    requireAuth = true,
    requireAdmin = false,
    redirectTo = '/auth',
    allowedRoles = []
  } = options

  const { state } = useAuth()
  const { user, loading } = state
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (loading) return

    // Auth gerekmiyorsa hemen authorize et
    if (!requireAuth) {
      setAuthorized(true)
      return
    }

    // User yoksa redirect
    if (!user) {
      router.push(`${redirectTo}?message=Bu sayfaya erişim için giriş yapmanız gerekiyor`)
      return
    }

    // Admin gerekiyorsa kontrol et
    if (requireAdmin) {
      const isAdmin = user.email?.includes('admin') || 
                     user.email?.includes('can@viewerapps.com') ||
                     user.role === 'admin'
      
      if (!isAdmin) {
        router.push('/unauthorized?message=Bu sayfaya erişim için admin yetkisi gerekiyor')
        return
      }
    }

    // Specific rol kontrolü
    if (allowedRoles.length > 0) {
      const userRole = user.role || 'user'
      if (!allowedRoles.includes(userRole)) {
        router.push('/unauthorized?message=Bu sayfaya erişim yetkiniz bulunmuyor')
        return
      }
    }

    setAuthorized(true)
  }, [user, loading, requireAuth, requireAdmin, allowedRoles, router, redirectTo])

  return {
    loading,
    authorized,
    user
  }
}

// Specific guard hooks
export function useRequireAuth() {
  return useAuthGuard({ requireAuth: true })
}

export function useRequireAdmin() {
  return useAuthGuard({ requireAuth: true, requireAdmin: true })
}

export function useRequireRole(roles: string[]) {
  return useAuthGuard({ requireAuth: true, allowedRoles: roles })
} 