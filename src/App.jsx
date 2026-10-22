import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import EmptyPage from './pages/EmptyPage'

export const TABS = [
  { path: '/ville', label: 'La ville', emoji: '🏙️' },
  { path: '/provisions', label: 'Les provisions', emoji: '🍻' },
  { path: '/questionnaire', label: 'Le questionnaire', emoji: '📝' },
  { path: '/tombola', label: 'La tombola', emoji: '🎟️' },
  { path: '/planning', label: 'Le planning', emoji: '🗓️' },
]

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="splash">
        <img src="/logo.png" alt="G25" className="splash-logo" />
      </div>
    )
  }

  if (!user) return <Login />

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {TABS.map((t) => (
          <Route key={t.path} path={t.path} element={<EmptyPage {...t} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
