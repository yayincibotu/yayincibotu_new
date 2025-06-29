import { MongoClient, Db } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is missing from environment variables')
}

if (!process.env.MONGODB_DB) {
  throw new Error('MONGODB_DB is missing from environment variables')
}

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  // Development modda global kullanarak hot reload'larda bağlantıyı koru
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // Production modda yeni client oluştur
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise

// Database helper function
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db(dbName)
} 