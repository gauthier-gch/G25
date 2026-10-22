import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { TABS } from '../App'

export default function Home() {
  const { user } = useAuth()
  const firstName = user.displayName?.split(' ')[0]

  return (
    <section className="home">
      <img src="/logo.png" alt="G25 – 25 ans !" className="home-logo" />
      <p className="hello">Salut{firstName ? ` ${firstName}` : ''} ! 🎉</p>
      <h1>Le weekend des 25 ans</h1>

      <div className="dates">
        <div className="date-card pink">
          <span className="day">Vendredi</span>
          <span className="num">21</span>
          <span className="month">mai</span>
        </div>
        <span className="arrow" aria-hidden>→</span>
        <div className="date-card blue">
          <span className="day">Dimanche</span>
          <span className="num">23</span>
          <span className="month">mai</span>
        </div>
      </div>

      <div className="tile-grid">
        {TABS.map((t, i) => (
          <Link key={t.path} to={t.path} className={`tile c${i}`}>
            <span className="tile-emoji">{t.emoji}</span>
            {t.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
