'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { AuthState, AuthAction, User } from '@/types/auth'

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
}

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
} | null>(null)

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false, error: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null }
    default:
      return state
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      dispatch({ type: 'SET_LOADING', payload: true })

      if (firebaseUser) {
        try {
          // Firebase ID token al
          const idToken = await firebaseUser.getIdToken()
          
          // Token'ı cookie'ye kaydet
          document.cookie = `auth-token=${idToken}; path=/; max-age=3600; secure; samesite=strict`
          
          const headers = {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          }

          // Firebase kullanıcısı varsa MongoDB'den user data'sını al
          const response = await fetch('/api/auth/user', {
            method: 'GET',
            headers,
          })

          if (response.ok) {
            const userData = await response.json()
            dispatch({ type: 'SET_USER', payload: userData.user })
          } else {
            // MongoDB'de kullanıcı yoksa sync et
            await fetch('/api/auth/sync', {
              method: 'POST',
              headers,
            })
            
            // Sync'ten sonra tekrar dene
            const syncResponse = await fetch('/api/auth/user', {
              method: 'GET',
              headers,
            })
            
            if (syncResponse.ok) {
              const syncedUserData = await syncResponse.json()
              dispatch({ type: 'SET_USER', payload: syncedUserData.user })
            } else {
              throw new Error('User sync failed')
            }
          }
        } catch (error) {
          console.error('Auth error:', error)
          dispatch({ type: 'SET_ERROR', payload: 'Kullanıcı bilgileri alınamadı' })
        }
      } else {
        // Kullanıcı çıkış yaptığında cookie'yi temizle
        document.cookie = 'auth-token=; path=/; max-age=0'
        dispatch({ type: 'SET_USER', payload: null })
      }

      dispatch({ type: 'SET_LOADING', payload: false })
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
} 