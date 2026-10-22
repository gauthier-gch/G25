export default function EmptyPage({ label, emoji }) {
  return (
    <section className="page">
      <h1>
        <span aria-hidden>{emoji}</span> {label}
      </h1>
      <div className="placeholder">Bientôt ici… ✨</div>
    </section>
  )
}
