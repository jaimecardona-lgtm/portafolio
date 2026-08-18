interface Props {
  onExplore: () => void
  onOpenChat: () => void
}

export default function ProjectsHero({ onExplore, onOpenChat }: Props) {
  return (
    <section className="projects-hero">
      <div className="wrap">
        <div className="hero-eyebrow">PROJECT_OS // SYSTEM ARCHIVE</div>

        <h1 className="hero-title">SISTEMAS QUE HE CONSTRUIDO</h1>

        <p className="hero-main">
          No construyo proyectos para acumular tecnologías. Los construyo para resolver problemas, probar arquitecturas y convertir ideas en sistemas capaces de operar.
        </p>

        <p className="hero-sub">
          Agrotech, agentes de IA, movilidad, facturación, software empresarial, investigación y productos construidos desde frontend hasta datos e inteligencia.
        </p>

        <div className="hero-signals">
          <div className="signal">
            <span className="signal-label">FLAGSHIP</span>
            <span className="signal-value">Agropilot CM</span>
          </div>
          <div className="signal">
            <span className="signal-label">FOCUS</span>
            <span className="signal-value">AI + Data + Full Stack</span>
          </div>
          <div className="signal">
            <span className="signal-label">METHOD</span>
            <span className="signal-value">Problem → Architecture → Build → Validate</span>
          </div>
        </div>

        <div className="hero-ctas">
          <button onClick={onExplore} className="cta-btn primary">
            EXPLORAR SISTEMAS
          </button>
          <button onClick={onOpenChat} className="cta-btn secondary">
            PREGUNTAR A JAC-IA
          </button>
        </div>
      </div>
    </section>
  )
}
