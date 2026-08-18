import './FinalResearchCTA.css'

export default function FinalResearchCTA() {
  const handleNavigate = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }))
  }

  const handleChat = () => {
    window.dispatchEvent(new CustomEvent('openChat', {}))
  }

  return (
    <section className="final-research-cta">
      <div className="section-header">
        <span className="section-number">12</span>
        <h2 className="section-title">CONSTRUIR Y PREGUNTARSE POR QUÉ</h2>
      </div>

      <div className="cta-headline">
        "Construir responde al cómo. Investigar también pregunta por qué."
      </div>

      <p className="cta-text">
        La investigación forma parte de la misma forma de trabajar: observar, modelar, construir, evaluar y comunicar.
      </p>

      <div className="cta-buttons">
        <button className="cta-btn projects" onClick={() => handleNavigate('proyectos')}>
          VER PROYECTOS
        </button>
        <button className="cta-btn experience" onClick={() => handleNavigate('experiencia')}>
          VER EXPERIENCIA
        </button>
        <button className="cta-btn chat" onClick={handleChat}>
          PREGUNTAR A JAC-IA
        </button>
      </div>
    </section>
  )
}
