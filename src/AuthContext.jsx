import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from './firebase'

const AuthContext = createContext({ user: null, loading: true, photo: null })

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, loading: true })
  const [customPhoto, setCustomPhoto] = useState(null)

  useEffect(
    () => onAuthStateChanged(auth, (user) => setState({ user, loading: false })),
    [],
  )

  // Photo choisie par l'utilisateur (prioritaire sur celle du compte Google)
  const uid = state.user?.uid
  useEffect(() => {
    setCustomPhoto(null)
    if (!uid) return
    return onSnapshot(
      doc(db, 'users', uid),
      (snap) => setCustomPhoto(snap.data()?.photo || null),
      () => setCustomPhoto(null),
    )
  }, [uid])

  const photo = customPhoto || state.user?.photoURL || null

  return <AuthContext.Provider value={{ ...state, photo }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
