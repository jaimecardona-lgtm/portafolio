import './ResearchHero.css'

export default function ResearchHero() {
  return (
    <section className="research-hero">
      <div className="hero-header">
        <span className="hero-eyebrow">RESEARCH_OS // KNOWLEDGE ARCHIVE</span>
        <h1 className="hero-title">INVESTIGAR TAMBIÉN ES CONSTRUIR</h1>
      </div>

      <p className="hero-main-text">
        "La ingeniería me permite construir sistemas. La investigación me obliga a explicar por qué funcionan, qué problema atacan y qué evidencia sostiene una decisión."
      </p>

      <p className="hero-subtext">
        Inteligencia artificial aplicada al agro, arquitecturas híbridas, impacto ambiental de la IA y revisión técnica dentro del ecosistema IEEE.
      </p>

      <div className="hero-signals">
        <div className="signal">
          <div className="signal-number">2</div>
          <div className="signal-label">IEEE XPLORE<br/>PUBLICATIONS</div>
        </div>
        <div className="signal">
          <div className="signal-number">2025</div>
          <div className="signal-label">CONCAPAN<br/>XLIII</div>
        </div>
        <div className="signal">
          <div className="signal-number">2026</div>
          <div className="signal-label">TPC<br/>REVIEWER</div>
        </div>
        <div className="signal">
          <div className="signal-number">AI + SOFTWARE + AGRICULTURE</div>
          <div className="signal-label">FOCUS</div>
        </div>
      </div>

      <div className="hero-ctas">
        <button className="cta-button explore" onClick={() => {
          const el = document.getElementById('publication-archive')
          el?.scrollIntoView({ behavior: 'smooth' })
        }}>
          EXPLORAR PUBLICACIONES
        </button>
        <button className="cta-button chat" onClick={() => {
          window.dispatchEvent(new CustomEvent('openChat', {}))
        }}>
          PREGUNTAR A JAC-IA
        </button>
      </div>
    </section>
  )
}
