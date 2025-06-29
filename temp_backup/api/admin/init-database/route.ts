import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { userService } from '@/lib/user-service'
import { validateEnvironmentVariables } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    // Environment variables kontrolü
    validateEnvironmentVariables()

    console.log('🔄 Starting database initialization...')

    // MongoDB database connection test
    const db = await getDatabase()
    console.log('✅ MongoDB connection successful')

    // Users koleksiyonu oluştur ve index'leri ekle
    try {
      await userService.createIndexes()
      console.log('✅ User collection indexes created')
    } catch (indexError: any) {
      console.log('ℹ️ User indexes might already exist:', indexError.message)
    }

    // Koleksiyonların durumunu kontrol et
    const collections = await db.listCollections().toArray()
    console.log('📊 Available collections:', collections.map(c => c.name))

    // Users koleksiyonunda kaç kullanıcı var kontrol et
    const userCount = await db.collection('users').countDocuments()
    console.log(`👥 Current user count: ${userCount}`)

    // Test koleksiyonu oluştur (eğer yoksa)
    const testCollection = db.collection('test_connection')
    await testCollection.insertOne({
      test: true,
      created_at: new Date(),
      message: 'Database initialization successful'
    })

    // Test dokümanını sil
    await testCollection.deleteMany({ test: true })
    console.log('✅ Test collection operations successful')

    return NextResponse.json({
      success: true,
      message: 'Database başarıyla initialize edildi',
      details: {
        database_name: db.databaseName,
        collections_count: collections.length,
        user_count: userCount,
        available_collections: collections.map(c => c.name)
      }
    })

  } catch (error: any) {
    console.error('❌ Database initialization error:', error)

    return NextResponse.json(
      { 
        success: false, 
        message: 'Database initialization başarısız',
        error: error.message
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Database durumunu kontrol et
    const db = await getDatabase()
    
    const collections = await db.listCollections().toArray()
    const userCount = await db.collection('users').countDocuments()

    return NextResponse.json({
      success: true,
      message: 'Database durumu',
      details: {
        database_name: db.databaseName,
        collections_count: collections.length,
        user_count: userCount,
        available_collections: collections.map(c => ({
          name: c.name,
          type: c.type
        }))
      }
    })

  } catch (error: any) {
    console.error('Database status check error:', error)

    return NextResponse.json(
      { 
        success: false, 
        message: 'Database durumu kontrol edilemedi',
        error: error.message
      },
      { status: 500 }
    )
  }
} 