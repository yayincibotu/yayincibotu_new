import { FirebaseError } from 'firebase/app'
import { FirebaseAuthError } from '@/types/auth'

// Validate if error is a Firebase error
export function validateFirebaseError(error: any): error is FirebaseError {
  return error && typeof error.code === 'string' && error.code.startsWith('auth/')
}

// Firebase auth error mesajlarını Türkçe'ye çevir
export function getFirebaseErrorMessage(error: any): string {
  const errorCode = error.code as FirebaseAuthError

  const errorMessages: Record<FirebaseAuthError, string> = {
    'auth/user-not-found': 'Bu email adresi ile kayıtlı kullanıcı bulunamadı.',
    'auth/wrong-password': 'Şifre hatalı. Lütfen tekrar deneyin.',
    'auth/email-already-in-use': 'Bu email adresi zaten kullanımda.',
    'auth/weak-password': 'Şifre çok zayıf. En az 6 karakter olmalı.',
    'auth/invalid-email': 'Geçersiz email adresi.',
    'auth/too-many-requests': 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.',
    'auth/user-disabled': 'Bu hesap devre dışı bırakılmış.',
    'auth/operation-not-allowed': 'Bu işlem izin verilmedi.',
  }

  return errorMessages[errorCode] || 'Bilinmeyen bir hata oluştu. Lütfen tekrar deneyin.'
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password strength validation
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 6) {
    errors.push('Şifre en az 6 karakter olmalı')
  }

  if (password.length > 128) {
    errors.push('Şifre en fazla 128 karakter olabilir')
  }

  if (!/[A-Za-z]/.test(password)) {
    errors.push('Şifre en az bir harf içermeli')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Şifre en az bir rakam içermeli')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Generate display name from email
export function generateDisplayName(email: string): string {
  const username = email.split('@')[0]
  return username.charAt(0).toUpperCase() + username.slice(1)
}

// Format user data for MongoDB
export function formatUserForDatabase(firebaseUser: any): Omit<import('@/types/auth').User, '_id'> {
  return {
    firebase_uid: firebaseUser.uid,
    email: firebaseUser.email,
    display_name: firebaseUser.displayName || generateDisplayName(firebaseUser.email),
    photo_url: firebaseUser.photoURL,
    provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google.com' : 'email',
    email_verified: firebaseUser.emailVerified,
    created_at: new Date(),
    updated_at: new Date(),
    last_login_at: new Date(),
    is_active: true,
    role: 'user'
  }
}

// Validate environment variables
export function validateEnvironmentVariables(): void {
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'MONGODB_URI',
    'MONGODB_DB'
  ]

  const missingVars = requiredVars.filter(varName => !process.env[varName])

  if (missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`)
  }
} 