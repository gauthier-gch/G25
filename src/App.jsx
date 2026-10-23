import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import EmptyPage from './pages/EmptyPage'
import { TABS } from './tabs'
import { LOGO } from './logo'

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="splash">
        <img src={LOGO} alt="G25" className="splash-logo" />
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
