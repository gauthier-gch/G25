import Carousel from '../components/Carousel'

const BASE = import.meta.env.BASE_URL
const PHOTOS = Array.from({ length: 9 }, (_, i) => `${BASE}villa/villa${i + 1}.webp`)

// Lien partagé de la villa
const MAPS_LINK = 'https://maps.app.goo.gl/RitRKQpVQb79itWG8'
// Position de la villa pour la carte intégrée
const VILLA_LOCATION = '48.70505655863707,1.052825196955342'
const STATION_LINK =
  'https://www.google.com/maps/search/?api=1&query=Gare+de+Verneuil-sur-Avre'

export default function Villa() {
  return (
    <section className="page villa">
      <h1>
        <span aria-hidden>🏡</span> La villa
      </h1>

      <Carousel images={PHOTOS} alt="La villa, photo" />

      <h2>📍 Accès</h2>
      <div className="card">
        <iframe
          className="map"
          title="Carte de la villa"
          src={`https://maps.google.com/maps?q=${VILLA_LOCATION}&z=12&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <a className="btn primary" href={MAPS_LINK} target="_blank" rel="noreferrer">
          Voir sur Google Maps ↗
        </a>
      </div>

      <h2>🧭 Comment y aller</h2>
      <div className="card ways">
        <div className="way">
          <span className="way-emoji" aria-hidden>🚗</span>
          <div>
            <b>En voiture</b>
            <p>Environ 2 h depuis Paris !</p>
          </div>
        </div>
        <div className="way">
          <span className="way-emoji" aria-hidden>🚆</span>
          <div>
            <b>En train</b>
            <p>
              Jusqu'à la{' '}
              <a href={STATION_LINK} target="_blank" rel="noreferrer">gare de Verneuil-sur-Avre</a>{' '}
              (1 h depuis Paris-Montparnasse), puis on vient te chercher en voiture !
            </p>
          </div>
        </div>
      </div>

      <div className="callout">
        <span className="callout-emoji" aria-hidden>💡</span>
        <p>
          Privilégie le <b>covoiturage</b> ! Et si tu viens en train, essaie de <b>grouper les
          arrivées</b> avec les autres pour limiter les allers-retours de la navette !
        </p>
      </div>
    </section>
  )
}
