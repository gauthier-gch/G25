import { useCallback, useEffect, useRef, useState } from 'react'

const AUTO_MS = 4000 // défilement automatique
const PAUSE_MS = 8000 // pause après une action manuelle

export default function Carousel({ images, alt = '' }) {
  const track = useRef(null)
  const [index, setIndex] = useState(0)
  const pausedUntil = useRef(0)

  const goTo = useCallback((i) => {
    const el = track.current
    if (!el) return
    const n = (i + images.length) % images.length
    el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' })
  }, [images.length])

  const pause = () => { pausedUntil.current = Date.now() + PAUSE_MS }

  // Met à jour le point actif quand on glisse au doigt
  const onScroll = () => {
    const el = track.current
    setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() < pausedUntil.current || document.hidden) return
      goTo(index + 1)
    }, AUTO_MS)
    return () => clearInterval(id)
  }, [index, goTo])

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        ref={track}
        onScroll={onScroll}
        onPointerDown={pause}
        onTouchStart={pause}
        onWheel={pause}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            draggable={false}
          />
        ))}
      </div>

      <button className="carousel-arrow prev" aria-label="Photo précédente" onClick={() => { pause(); goTo(index - 1) }}>‹</button>
      <button className="carousel-arrow next" aria-label="Photo suivante" onClick={() => { pause(); goTo(index + 1) }}>›</button>

      <div className="carousel-dots">
        {images.map((src, i) => (
          <button
            key={src}
            className={i === index ? 'active' : ''}
            aria-label={`Photo ${i + 1}`}
            onClick={() => { pause(); goTo(i) }}
          />
        ))}
      </div>
    </div>
  )
}
