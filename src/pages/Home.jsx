import { useAuth } from '../AuthContext'
import Countdown from '../components/Countdown'
import { LOGO } from '../logo'

export default function Home() {
  const { user } = useAuth()
  const firstName = user.displayName?.split(' ')[0]

  return (
    <section className="home">
      <img src={LOGO} alt="G25 – 25 ans !" className="home-logo" />
      <p className="hello">Salut{firstName ? ` ${firstName}` : ''} ! 🎉</p>
      <h1>25 ans du G</h1>

      <div className="dates">
        <div className="date-card pink">
          <span className="day">Vendredi</span>
          <span className="num">21</span>
          <span className="month">mai 2027</span>
        </div>
        <span className="arrow" aria-hidden>→</span>
        <div className="date-card blue">
          <span className="day">Dimanche</span>
          <span className="num">23</span>
          <span className="month">mai 2027</span>
        </div>
      </div>

      <Countdown />
    </section>
  )
}
