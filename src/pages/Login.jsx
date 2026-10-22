import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

const ERRORS = {
  'auth/invalid-credential': 'Email ou mot de passe incorrect.',
  'auth/invalid-email': 'Adresse email invalide.',
  'auth/email-already-in-use': 'Un compte existe déjà avec cet email.',
  'auth/weak-password': 'Le mot de passe doit faire au moins 6 caractères.',
  'auth/too-many-requests': 'Trop de tentatives, réessaie dans un moment.',
  'auth/popup-closed-by-user': 'Connexion Google annulée.',
}

export default function Login() {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  const run = async (fn) => {
    setError('')
    setInfo('')
    setBusy(true)
    try {
      await fn()
    } catch (e) {
      setError(ERRORS[e.code] ?? 'Oups, une erreur est survenue.')
    } finally {
      setBusy(false)
    }
  }

  const submit = (e) => {
    e.preventDefault()
    run(async () => {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        if (name) await updateProfile(user, { displayName: name })
      }
    })
  }

  const resetPassword = () =>
    run(async () => {
      if (!email) throw { code: 'auth/invalid-email' }
      await sendPasswordResetEmail(auth, email)
      setInfo('Email de réinitialisation envoyé 📬')
    })

  return (
    <div className="login">
      <div className="login-card">
        <img src="/logo.png" alt="G25 – 25 ans !" className="login-logo" />
        <p className="login-dates">Du vendredi 21 au dimanche 23 mai</p>

        <button
          className="btn google"
          disabled={busy}
          onClick={() => run(() => signInWithPopup(auth, googleProvider))}
        >
          <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden>
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/>
          </svg>
          Continuer avec Google
        </button>

        <div className="sep"><span>ou</span></div>

        <form onSubmit={submit}>
          {mode === 'signup' && (
            <input
              placeholder="Prénom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="given-name"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
          />
          {error && <p className="error">{error}</p>}
          {info && <p className="info">{info}</p>}
          <button className="btn primary" disabled={busy}>
            {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>

        <div className="login-links">
          {mode === 'login' ? (
            <>
              <button onClick={() => setMode('signup')}>Pas encore de compte ? Inscris-toi</button>
              <button onClick={resetPassword}>Mot de passe oublié</button>
            </>
          ) : (
            <button onClick={() => setMode('login')}>Déjà un compte ? Connecte-toi</button>
          )}
        </div>
      </div>
    </div>
  )
}
