import { useEffect, useState } from 'react'

// Arrivée le vendredi 21 mai à 18h et fin du weekend, heure de Paris
const START = new Date('2027-05-21T18:00:00+02:00').getTime()
const END = new Date('2027-05-24T00:00:00+02:00').getTime()

const UNITS = [
  ['jours', 'j', 86400000],
  ['h', 'h', 3600000],
  ['min', 'min', 60000],
  ['s', 's', 1000],
]

const pad = (n) => String(n).padStart(2, '0')

function useNow() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

function split(now) {
  let rest = START - now
  return UNITS.map(([label, short, ms]) => {
    const value = Math.floor(rest / ms)
    rest -= value * ms
    return { label, short, value }
  })
}

// Version compacte, affichée dans la barre du haut
export function MiniCountdown() {
  const now = useNow()

  if (now >= END) return null
  if (now >= START) return <span className="mini-cd">C'est parti ! 🎉</span>

  const [d, h, m, s] = split(now)
  return (
    <span className="mini-cd" role="timer" aria-label="Compte à rebours">
      <b>{d.value}</b>j <b>{pad(h.value)}</b>h <b>{pad(m.value)}</b>m <b>{pad(s.value)}</b>s
    </span>
  )
}

export default function Countdown() {
  const now = useNow()

  if (now >= END) return <p className="countdown-done">C'était mémorable 🥹</p>
  if (now >= START) return <p className="countdown-done">C'est parti ! 🎉🍻</p>

  return (
    <div className="countdown" role="timer" aria-label="Compte à rebours">
      {split(now).map(({ label, value }) => (
        <div key={label} className="cd-cell">
          <span className="cd-num">{label === 'jours' ? value : pad(value)}</span>
          <span className="cd-label">{label}</span>
        </div>
      ))}
    </div>
  )
}
