import './ResearchSignal.css'

export default function ResearchSignal() {
  return (
    <section className="research-signal">
      <div className="wrap">
        <div className="signal-header">
          <span className="section-number">05</span>
          <h2 className="section-title">RESEARCH & REVIEW</h2>
        </div>

        <div className="research-evolution">
          <div className="research-phase author">
            <span className="phase-year">2025</span>
            <span className="phase-label">AUTHOR</span>
            <div className="phase-content">
              <div className="publication">IEEE Xplore</div>
              <div className="publication-count">2 PUBLICACIONES</div>
              <div className="event">CONCAPAN XLIII 2025</div>
              <div className="title-short">Hybrid AI Architecture for Agricultural Diversification</div>
              <div className="title-short">The Environmental Dimensions of Artificial Intelligence</div>
            </div>
          </div>

          <div className="research-arrow">
            <div className="arrow-line"></div>
            <div className="arrow-head">→</div>
          </div>

          <div className="research-phase reviewer">
            <span className="phase-year">2026</span>
            <span className="phase-label">REVIEWER</span>
            <div className="phase-content">
              <div className="publication">IEEE CONCAPAN XLIV 2026</div>
              <div className="publication-count">TPC REVIEWER</div>
              <div className="status">INVITATION ACCEPTED</div>
              <p className="reviewer-text">
                Invitado y aceptado para integrar el Technical Program Committee y participar en la revisión académica de trabajos del evento.
              </p>
            </div>
          </div>
        </div>

        <div className="research-message">
          <h3>De publicar investigación a ser invitado a evaluarla.</h3>
        </div>

        <div className="research-footer">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'investigacion' } }))}
            className="research-cta"
          >
            EXPLORAR INVESTIGACIÓN →
          </button>
        </div>
      </div>
    </section>
  )
}
