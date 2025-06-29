import * as admin from 'firebase-admin'

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
}

// Firebase Admin'i sadece bir kez initialize et
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    projectId: process.env.FIREBASE_PROJECT_ID,
  })
}

export const adminAuth = admin.auth()
export const adminDb = admin.firestore()
export default admin 