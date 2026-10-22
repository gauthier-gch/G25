import { useEffect, useState } from 'react'

// Début et fin du weekend, heure de Paris
const START = new Date('2027-05-21T00:00:00+02:00').getTime()
const END = new Date('2027-05-24T00:00:00+02:00').getTime()

const UNITS = [
  ['jours', 86400000],
  ['h', 3600000],
  ['min', 60000],
  ['s', 1000],
]

export default function Countdown() {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  if (now >= END) return <p className="countdown-done">C'était mémorable 🥹</p>
  if (now >= START) return <p className="countdown-done">C'est parti ! 🎉🍻</p>

  let rest = START - now
  const parts = UNITS.map(([label, ms]) => {
    const value = Math.floor(rest / ms)
    rest -= value * ms
    return { label, value }
  })

  return (
    <div className="countdown" role="timer" aria-label="Compte à rebours">
      {parts.map(({ label, value }) => (
        <div key={label} className="cd-cell">
          <span className="cd-num">{label === 'jours' ? value : String(value).padStart(2, '0')}</span>
          <span className="cd-label">{label}</span>
        </div>
      ))}
    </div>
  )
}
