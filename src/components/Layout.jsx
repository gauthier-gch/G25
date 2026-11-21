import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { TABS } from '../tabs'
import { LOGO } from '../logo'
import { MiniCountdown } from './Countdown'
import ProfileModal from './ProfileModal'

const NAV = [{ path: '/', short: 'Accueil', emoji: '🥳' }, ...TABS]

export default function Layout() {
  const { user, photo } = useAuth()
  const { pathname } = useLocation()
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => window.scrollTo(0, 0), [pathname])

  const initial = (user.displayName || user.email || '?')[0].toUpperCase()

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <img src={LOGO} alt="" />
          <span>G25</span>
        </NavLink>
        <MiniCountdown />
        <button className="avatar" onClick={() => setProfileOpen(true)} aria-label="Mon profil">
          {photo ? <img src={photo} alt="" referrerPolicy="no-referrer" /> : initial}
        </button>
      </header>

      {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}

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
