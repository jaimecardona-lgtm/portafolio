import './ExperienceHero.css'

export default function ExperienceHero() {
  return (
    <section className="experience-hero">
      <div className="hero-header">
        <span className="hero-eyebrow">CAREER_OS // MISSION LOG</span>
        <h1 className="hero-title">
          <span className="title-main">TRAYECTORIA</span>
          <span className="title-sub">profesional en contextos reales</span>
        </h1>
      </div>

      <div className="hero-signals">
        <div className="signal-badge">
          <span className="signal-icon">🏛️</span>
          <span className="signal-text">Instituciones</span>
        </div>
        <div className="signal-badge">
          <span className="signal-icon">📊</span>
          <span className="signal-text">Datos e IA</span>
        </div>
        <div className="signal-badge">
          <span className="signal-icon">⚡</span>
          <span className="signal-text">Productos</span>
        </div>
        <div className="signal-badge">
          <span className="signal-icon">🔍</span>
          <span className="signal-text">Evaluación</span>
        </div>
      </div>

      <p className="hero-description">
        Del entorno académico a sistemas institucionales, de datos a IA, de integración a construcción de productos. Cada etapa, un contexto diferente. Cada contexto, una lección.
      </p>
    </section>
  )
}
