import { ObjectId } from 'mongodb'
import { getDatabase } from '@/lib/mongodb'
import { User } from '@/types/auth'
import { formatUserForDatabase } from '@/lib/auth-utils'

export class UserService {
  private async getCollection() {
    const db = await getDatabase()
    return db.collection<User>('users')
  }

  // Firebase UID ile kullanıcı bul
  async findByFirebaseUid(firebaseUid: string): Promise<User | null> {
    try {
      const collection = await this.getCollection()
      const user = await collection.findOne({ firebase_uid: firebaseUid })
      return user
    } catch (error) {
      console.error('Error finding user by Firebase UID:', error)
      throw new Error('Kullanıcı bulunamadı')
    }
  }

  // Email ile kullanıcı bul
  async findByEmail(email: string): Promise<User | null> {
    try {
      const collection = await this.getCollection()
      const user = await collection.findOne({ email })
      return user
    } catch (error) {
      console.error('Error finding user by email:', error)
      throw new Error('Kullanıcı bulunamadı')
    }
  }

  // MongoDB ID ile kullanıcı bul
  async findById(userId: string): Promise<User | null> {
    try {
      const collection = await this.getCollection()
      const user = await collection.findOne({ _id: new ObjectId(userId) })
      return user
    } catch (error) {
      console.error('Error finding user by ID:', error)
      throw new Error('Kullanıcı bulunamadı')
    }
  }

  // Yeni kullanıcı oluştur
  async createUser(firebaseUser: any): Promise<User> {
    try {
      const collection = await this.getCollection()
      const userData = formatUserForDatabase(firebaseUser)

      // Email ile zaten kayıtlı kullanıcı var mı kontrol et
      const existingUser = await this.findByEmail(userData.email)
      if (existingUser) {
        throw new Error('Bu email adresi zaten kayıtlı')
      }

      const result = await collection.insertOne(userData)
      
      const newUser = await collection.findOne({ _id: result.insertedId })
      if (!newUser) {
        throw new Error('Kullanıcı oluşturulamadı')
      }

      return newUser
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  // Kullanıcı güncelle
  async updateUser(firebaseUid: string, updateData: Partial<User>): Promise<User | null> {
    try {
      const collection = await this.getCollection()
      
      const result = await collection.findOneAndUpdate(
        { firebase_uid: firebaseUid },
        { 
          $set: { 
            ...updateData, 
            updated_at: new Date() 
          } 
        },
        { returnDocument: 'after' }
      )

      return result || null
    } catch (error) {
      console.error('Error updating user:', error)
      throw new Error('Kullanıcı güncellenemedi')
    }
  }

  // Son giriş zamanını güncelle
  async updateLastLogin(firebaseUid: string): Promise<void> {
    try {
      const collection = await this.getCollection()
      
      await collection.updateOne(
        { firebase_uid: firebaseUid },
        { 
          $set: { 
            last_login_at: new Date(),
            updated_at: new Date()
          } 
        }
      )
    } catch (error) {
      console.error('Error updating last login:', error)
      // Son giriş güncellenememesi kritik değil, hata fırlatma
    }
  }

  // Firebase kullanıcısını MongoDB'ye sync et
  async syncFirebaseUser(firebaseUser: any): Promise<User> {
    try {
      // Önce kullanıcı var mı kontrol et
      let user = await this.findByFirebaseUid(firebaseUser.uid)

      if (user) {
        // Kullanıcı varsa bilgilerini güncelle
        const updateData = {
          email: firebaseUser.email,
          display_name: firebaseUser.displayName,
          photo_url: firebaseUser.photoURL,
          email_verified: firebaseUser.emailVerified,
          last_login_at: new Date(),
          updated_at: new Date()
        }

        user = await this.updateUser(firebaseUser.uid, updateData)
        if (!user) {
          throw new Error('Kullanıcı güncellenemedi')
        }
      } else {
        // Kullanıcı yoksa yeni oluştur
        user = await this.createUser(firebaseUser)
      }

      return user
    } catch (error) {
      console.error('Error syncing Firebase user:', error)
      throw error
    }
  }

  // Kullanıcı durumunu güncelle (aktif/pasif)
  async toggleUserStatus(firebaseUid: string, isActive: boolean): Promise<User | null> {
    try {
      return await this.updateUser(firebaseUid, { is_active: isActive })
    } catch (error) {
      console.error('Error toggling user status:', error)
      throw new Error('Kullanıcı durumu güncellenemedi')
    }
  }

  // Kullanıcı rolünü güncelle
  async updateUserRole(firebaseUid: string, role: 'user' | 'admin'): Promise<User | null> {
    try {
      return await this.updateUser(firebaseUid, { role })
    } catch (error) {
      console.error('Error updating user role:', error)
      throw new Error('Kullanıcı rolü güncellenemedi')
    }
  }

  // Tüm kullanıcıları listele (admin için)
  async getAllUsers(limit: number = 50, skip: number = 0): Promise<{
    users: User[]
    total: number
  }> {
    try {
      const collection = await this.getCollection()
      
      const users = await collection
        .find({})
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .toArray()

      const total = await collection.countDocuments({})

      return { users, total }
    } catch (error) {
      console.error('Error getting all users:', error)
      throw new Error('Kullanıcılar listelenemedi')
    }
  }

  // Database index'leri oluştur
  async createIndexes(): Promise<void> {
    try {
      const collection = await this.getCollection()
      const db = await getDatabase()
      const auditCollection = db.collection('user_audit_logs')
      
      // Firebase UID için unique index
      await collection.createIndex({ firebase_uid: 1 }, { unique: true })
      
      // Email için unique index
      await collection.createIndex({ email: 1 }, { unique: true })
      
      // Oluşturulma tarihi için index
      await collection.createIndex({ created_at: -1 })
      
      // Aktif kullanıcılar için index
      await collection.createIndex({ is_active: 1 })

      // Audit logs için indexler
      await auditCollection.createIndex({ user_id: 1 })
      await auditCollection.createIndex({ action: 1 })
      await auditCollection.createIndex({ timestamp: -1 })
      
      console.log('User collection indexes created successfully')
    } catch (error) {
      console.error('Error creating indexes:', error)
      // Index oluşturma hatası kritik değil
    }
  }

  // Log user activity for audit trail
  async logUserActivity(firebaseUid: string, action: string, metadata?: any): Promise<void> {
    try {
      const db = await getDatabase()
      const auditCollection = db.collection('user_audit_logs')
      
      await auditCollection.insertOne({
        user_id: firebaseUid,
        action,
        metadata: metadata || {},
        timestamp: new Date(),
        ip_address: metadata?.ip || 'unknown',
        user_agent: metadata?.user_agent || 'unknown'
      })
      
      console.log(`User activity logged: ${action} for user ${firebaseUid}`)
    } catch (error) {
      console.error('Failed to log user activity:', error)
      // Don't throw error to avoid breaking main functionality
    }
  }

  // Get user activity logs
  async getUserActivityLogs(firebaseUid: string, limit: number = 50): Promise<any[]> {
    try {
      const db = await getDatabase()
      const auditCollection = db.collection('user_audit_logs')
      
      const logs = await auditCollection
        .find({ user_id: firebaseUid })
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray()
      
      return logs
    } catch (error) {
      console.error('Failed to get user activity logs:', error)
      return []
    }
  }

  // Delete user from MongoDB
  async deleteUser(firebaseUid: string): Promise<boolean> {
    try {
      const collection = await this.getCollection()
      
      const result = await collection.deleteOne({ firebase_uid: firebaseUid })
      
      if (result.deletedCount === 0) {
        throw new Error('User not found or already deleted')
      }
      
      console.log(`User ${firebaseUid} deleted from MongoDB`)
      return true
    } catch (error) {
      console.error('Error deleting user:', error)
      throw new Error('Kullanıcı silinemedi')
    }
  }
}

// Singleton instance
export const userService = new UserService() 