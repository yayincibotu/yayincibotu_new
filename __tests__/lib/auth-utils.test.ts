import { 
  validateFirebaseError, 
  getFirebaseErrorMessage,
  isValidEmail,
  validatePassword,
  generateDisplayName
} from '@/lib/auth-utils'

describe('Auth Utils', () => {
  describe('validateFirebaseError', () => {
    it('should return true for firebase auth errors', () => {
      const firebaseError = {
        code: 'auth/user-not-found',
        message: 'User not found'
      }
      
      expect(validateFirebaseError(firebaseError)).toBe(true)
    })

    it('should return false for non-firebase errors', () => {
      const normalError = new Error('Normal error')
      
      expect(validateFirebaseError(normalError)).toBe(false)
    })
  })

  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user@domain.co.uk')).toBe(true)
    })

    it('should return false for invalid emails', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@domain.com')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const result = validatePassword('Password123')
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject weak passwords', () => {
      const result = validatePassword('123')
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })

  describe('generateDisplayName', () => {
    it('should generate display name from email', () => {
      const displayName = generateDisplayName('john.doe@example.com')
      expect(displayName).toBe('John.doe')
    })
  })
}) 