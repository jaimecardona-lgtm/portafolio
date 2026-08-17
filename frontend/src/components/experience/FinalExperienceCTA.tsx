import './FinalExperienceCTA.css'

interface Props {
  onNavigateProjects: () => void
  onNavigateResearch: () => void
  onOpenChat: () => void
}

export default function FinalExperienceCTA({
  onNavigateProjects,
  onNavigateResearch,
  onOpenChat,
}: Props) {
  return (
    <section className="final-experience-cta">
      <div className="section-header">
        <span className="section-number">08</span>
        <h2 className="section-title">NEXT STEPS</h2>
      </div>

      <div className="cta-grid">
        <button className="cta-card projects" onClick={onNavigateProjects}>
          <span className="cta-icon">→ PROYECTOS</span>
          <span className="cta-label">Ver sistemas que construí</span>
        </button>

        <button className="cta-card research" onClick={onNavigateResearch}>
          <span className="cta-icon">→ INVESTIGACIÓN</span>
          <span className="cta-label">Leer análisis técnicos</span>
        </button>

        <button className="cta-card chat" onClick={onOpenChat}>
          <span className="cta-icon">→ CHAT</span>
          <span className="cta-label">Conversar en detalle</span>
        </button>
      </div>
    </section>
  )
}
