import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

// La persistance par défaut de Firebase Auth est "local" (IndexedDB) :
// une fois connecté sur un appareil, on reste connecté jusqu'à la déconnexion.
export const auth = getAuth(app)
auth.languageCode = 'fr'
export const googleProvider = new GoogleAuthProvider()
