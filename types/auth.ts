import { ObjectId } from 'mongodb'

// User interface for MongoDB
export interface User {
  _id?: ObjectId
  firebase_uid: string
  email: string
  display_name?: string
  photo_url?: string
  provider: 'email' | 'google.com'
  email_verified: boolean
  created_at: Date
  updated_at: Date
  last_login_at?: Date
  is_active: boolean
  role: 'user' | 'admin'
  profile?: {
    first_name?: string
    last_name?: string
    phone?: string
    country?: string
  }
}

// Auth context state
export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

// Login form data
export interface LoginFormData {
  email: string
  password: string
  remember_me?: boolean
}

// Register form data
export interface RegisterFormData {
  email: string
  password: string
  confirm_password: string
  first_name?: string
  last_name?: string
  terms_accepted: boolean
}

// API response types
export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  error?: string
}

// Firebase auth error codes
export type FirebaseAuthError = 
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/invalid-email'
  | 'auth/too-many-requests'
  | 'auth/user-disabled'
  | 'auth/operation-not-allowed'

// Auth action types
export type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGOUT' } 