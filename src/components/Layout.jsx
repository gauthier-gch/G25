import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuth } from '../AuthContext'
import { TABS } from '../tabs'

const NAV = [{ path: '/', short: 'Accueil', emoji: '🏠' }, ...TABS]

export default function Layout() {
  const { user } = useAuth()
  const { pathname } = useLocation()

  useEffect(() => window.scrollTo(0, 0), [pathname])

  const logout = () => {
    if (window.confirm('Se déconnecter ?')) signOut(auth)
  }

  const initial = (user.displayName || user.email || '?')[0].toUpperCase()

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <img src="/logo.png" alt="" />
          <span>G25</span>
        </NavLink>
        <button className="avatar" onClick={logout} aria-label="Se déconnecter">
          {user.photoURL ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" /> : initial}
        </button>
      </header>

      <main className="content">
        <Outlet />
      </main>

      <nav className="tabbar">
        {NAV.map((t) => (
          <NavLink key={t.path} to={t.path} end={t.path === '/'}>
            <span className="tab-emoji" aria-hidden>{t.emoji}</span>
            <span className="tab-label">{t.short}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
