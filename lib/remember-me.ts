import { auth } from '@/lib/firebase'
import { browserLocalPersistence, browserSessionPersistence, setPersistence } from 'firebase/auth'

export interface RememberMePreference {
  email?: string
  rememberMe: boolean
  lastLogin?: Date
}

// Remember me preference'ı localStorage'a kaydet
export function saveRememberMePreference(preference: RememberMePreference): void {
  try {
    localStorage.setItem('remember-me-preference', JSON.stringify({
      ...preference,
      lastLogin: preference.lastLogin?.toISOString()
    }))
  } catch (error) {
    console.warn('Remember me preference could not be saved:', error)
  }
}

// Remember me preference'ını localStorage'dan al
export function getRememberMePreference(): RememberMePreference | null {
  try {
    const stored = localStorage.getItem('remember-me-preference')
    if (!stored) return null

    const parsed = JSON.parse(stored)
    return {
      ...parsed,
      lastLogin: parsed.lastLogin ? new Date(parsed.lastLogin) : undefined
    }
  } catch (error) {
    console.warn('Remember me preference could not be loaded:', error)
    return null
  }
}

// Remember me preference'ını temizle
export function clearRememberMePreference(): void {
  try {
    localStorage.removeItem('remember-me-preference')
  } catch (error) {
    console.warn('Remember me preference could not be cleared:', error)
  }
}

// Firebase auth persistence'ını ayarla
export async function setAuthPersistence(rememberMe: boolean): Promise<void> {
  try {
    const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence
    await setPersistence(auth, persistence)
    console.log(`Auth persistence set to: ${rememberMe ? 'local' : 'session'}`)
  } catch (error) {
    console.error('Failed to set auth persistence:', error)
    throw error
  }
}

// Email'i remember me için kaydet/kaldır
export function handleRememberMeEmail(email: string, rememberMe: boolean): void {
  const preference: RememberMePreference = {
    email: rememberMe ? email : undefined,
    rememberMe,
    lastLogin: new Date()
  }
  
  if (rememberMe) {
    saveRememberMePreference(preference)
  } else {
    clearRememberMePreference()
  }
}

// Otomatik giriş kontrolü (sayfa yüklendiğinde)
export function checkAutoLogin(): { shouldAutoLogin: boolean; email?: string } {
  const preference = getRememberMePreference()
  
  if (!preference || !preference.rememberMe || !preference.email) {
    return { shouldAutoLogin: false }
  }

  // Son girişten itibaren 30 gün geçmişse auto-login'i devre dışı bırak
  const daysSinceLastLogin = preference.lastLogin 
    ? Math.floor((Date.now() - preference.lastLogin.getTime()) / (1000 * 60 * 60 * 24))
    : 999

  if (daysSinceLastLogin > 30) {
    clearRememberMePreference()
    return { shouldAutoLogin: false }
  }

  return {
    shouldAutoLogin: true,
    email: preference.email
  }
}

// Remember me durumunu güncelle
export function updateRememberMeStatus(rememberMe: boolean, email?: string): void {
  if (rememberMe && email) {
    handleRememberMeEmail(email, true)
  } else {
    clearRememberMePreference()
  }
} 