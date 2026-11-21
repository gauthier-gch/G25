import { useEffect, useRef, useState } from 'react'
import { signOut } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuth } from '../AuthContext'

const SIZE = 256

// Recadre l'image en carré centré, réduit à 256 px et compresse en JPEG (~20 Ko)
async function toAvatarDataUrl(file) {
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image()
      i.onload = () => resolve(i)
      i.onerror = reject
      i.src = url
    })
    const side = Math.min(img.naturalWidth, img.naturalHeight)
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = SIZE
    canvas.getContext('2d').drawImage(
      img,
      (img.naturalWidth - side) / 2,
      (img.naturalHeight - side) / 2,
      side,
      side,
      0,
      0,
      SIZE,
      SIZE,
    )
    return canvas.toDataURL('image/jpeg', 0.82)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export default function ProfileModal({ onClose }) {
  const { user, photo } = useAuth()
  const cameraRef = useRef(null)
  const libraryRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const dataUrl = await toAvatarDataUrl(file)
      await setDoc(
        doc(db, 'users', user.uid),
        { photo: dataUrl, name: user.displayName || user.email, updatedAt: serverTimestamp() },
        { merge: true },
      )
    } catch (err) {
      console.error(err)
      setError("Oups, la photo n'a pas pu être enregistrée.")
    } finally {
      setBusy(false)
    }
  }

  const initial = (user.displayName || user.email || '?')[0].toUpperCase()

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Mon profil"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>

        <div className="modal-avatar">
          {photo ? <img src={photo} alt="" referrerPolicy="no-referrer" /> : initial}
          {busy && <span className="modal-avatar-busy">⏳</span>}
        </div>
        <p className="modal-name">{user.displayName || user.email}</p>

        <input ref={cameraRef} type="file" accept="image/*" capture="user" hidden onChange={onFile} />
        <input ref={libraryRef} type="file" accept="image/*" hidden onChange={onFile} />

        <div className="modal-actions">
          <button className="btn primary" disabled={busy} onClick={() => cameraRef.current.click()}>
            📸 Prendre une photo
          </button>
          <button className="btn" disabled={busy} onClick={() => libraryRef.current.click()}>
            🖼️ Choisir dans la pellicule
          </button>
          {error && <p className="error">{error}</p>}
          <button
            className="btn logout"
            onClick={() => window.confirm('Se déconnecter ?') && signOut(auth)}
          >
            👋 Se déconnecter
          </button>
        </div>
      </div>
    </div>
  )
}
