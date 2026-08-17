import './EngineeringInReality.css'

export default function EngineeringInReality() {
  const layers = [
    {
      title: 'MikroTik & Redes',
      description: 'Infraestructura de acceso, configuración, troubleshooting en contextos reales.',
    },
    {
      title: 'Soporte Técnico',
      description: 'Atender, diagnosticar, documentar y resolver problemas operacionales.',
    },
    {
      title: 'Cloud & Deployment',
      description: 'AWS, Supabase, Docker. Llevar código a producción de forma confiable.',
    },
    {
      title: 'Decisiones de Arquitectura',
      description: 'Elegir entre alternativas técnicas considerando contexto, costo, riesgo.',
    },
  ]

  return (
    <section className="engineering-reality-section">
      <div className="section-header">
        <span className="section-number">03</span>
        <h2 className="section-title">ENGINEERING IN THE REAL WORLD</h2>
      </div>

      <p className="section-description">
        La ingeniería no es resolver problemas en la pizarra. Es tomar decisiones imperfectas en contextos con restricciones.
      </p>

      <div className="layers-grid">
        {layers.map((layer, idx) => (
          <div key={idx} className="layer-card">
            <div className="layer-number">{String(idx + 1).padStart(2, '0')}</div>
            <h3 className="layer-title">{layer.title}</h3>
            <p className="layer-description">{layer.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
