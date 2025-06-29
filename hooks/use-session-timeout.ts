import { useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { auth } from '@/lib/firebase'

interface UseSessionTimeoutOptions {
  warningTime?: number // Uyarı vermek için kalan süre (dakika)
  idleTime?: number // Idle timeout süresi (dakika)
  onWarning?: () => void
  onTimeout?: () => void
  enableWarning?: boolean
}

export function useSessionTimeout(options: UseSessionTimeoutOptions = {}) {
  const {
    warningTime = 5, // 5 dakika kala uyar
    idleTime = 30, // 30 dakika idle timeout
    onWarning,
    onTimeout,
    enableWarning = true
  } = options

  const { state } = useAuth()
  const { user } = state
  
  const timeoutRef = useRef<number | undefined>(undefined)
  const warningRef = useRef<number | undefined>(undefined)
  const lastActivityRef = useRef<number>(Date.now())

  // Activity tracking
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now()
  }, [])

  // Logout function
  const logout = useCallback(async () => {
    try {
      await auth.signOut()
      // Clear local storage
      localStorage.removeItem('auth-token')
      localStorage.removeItem('user-data')
      
      // Clear session storage
      sessionStorage.clear()
      
      onTimeout?.()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }, [onTimeout])

  // Check if session is expired
  const checkSession = useCallback(async () => {
    if (!user) return

    try {
      const currentUser = auth.currentUser
      if (currentUser) {
        // Token'ı yenile ve kontrol et
        const tokenResult = await currentUser.getIdTokenResult(true)
        const tokenAge = Date.now() - new Date(tokenResult.issuedAtTime).getTime()
        const maxAge = 60 * 60 * 1000 // 1 saat

        if (tokenAge > maxAge) {
          console.warn('Token expired, logging out...')
          await logout()
        }
      }
    } catch (error) {
      console.error('Session check error:', error)
      await logout()
    }
  }, [user, logout])

  // Reset timers
  const resetTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current)
    }

    if (!user) return

    const warningMs = (idleTime - warningTime) * 60 * 1000
    const timeoutMs = idleTime * 60 * 1000

    // Warning timer
    if (enableWarning && warningMs > 0) {
      warningRef.current = window.setTimeout(() => {
        onWarning?.()
      }, warningMs)
    }

    // Timeout timer
    timeoutRef.current = window.setTimeout(() => {
      logout()
    }, timeoutMs)
  }, [user, idleTime, warningTime, enableWarning, onWarning, logout])

  // Activity event listeners
  useEffect(() => {
    if (!user) return

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    const handleActivity = () => {
      updateActivity()
      resetTimers()
    }

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    // Initial timer setup
    resetTimers()

    // Session check interval (every 5 minutes)
    const sessionCheckInterval = setInterval(checkSession, 5 * 60 * 1000)

    return () => {
      // Remove event listeners
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })

      // Clear timers
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (warningRef.current) {
        clearTimeout(warningRef.current)
      }

      // Clear session check interval
      clearInterval(sessionCheckInterval)
    }
  }, [user, resetTimers, updateActivity, checkSession])

  // Extend session function
  const extendSession = useCallback(() => {
    updateActivity()
    resetTimers()
  }, [updateActivity, resetTimers])

  // Get remaining time
  const getRemainingTime = useCallback(() => {
    const elapsed = Date.now() - lastActivityRef.current
    const remaining = (idleTime * 60 * 1000) - elapsed
    return Math.max(0, remaining)
  }, [idleTime])

  return {
    extendSession,
    getRemainingTime,
    isLoggedIn: !!user,
    logout
  }
} 