import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuth } from '../AuthContext'
import { TABS } from '../App'

export default function Layout() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="" />
          <span>G25</span>
        </NavLink>

        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav className={`tabs ${open ? 'open' : ''}`}>
          {TABS.map((t) => (
            <NavLink key={t.path} to={t.path} onClick={() => setOpen(false)}>
              <span aria-hidden>{t.emoji}</span> {t.label}
            </NavLink>
          ))}
          <button className="logout" onClick={() => signOut(auth)} title={user.email}>
            Déconnexion
          </button>
        </nav>
      </header>

      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
