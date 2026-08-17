import './CareerEvolution.css'

interface Stage {
  stage: string
  title: string
  description: string
}

interface Props {
  stages: Stage[]
}

export default function CareerEvolution({ stages }: Props) {
  return (
    <section className="career-evolution-section">
      <div className="section-header">
        <span className="section-number">06</span>
        <h2 className="section-title">CAREER EVOLUTION</h2>
      </div>

      <div className="evolution-timeline">
        {stages.map((stage, idx) => (
          <div key={idx} className="evolution-node">
            <div className="node-stage-label">{stage.stage}</div>
            <div className="node-content">
              <h3 className="node-title">{stage.title}</h3>
              <p className="node-description">{stage.description}</p>
            </div>
            {idx < stages.length - 1 && <div className="node-arrow">→</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
