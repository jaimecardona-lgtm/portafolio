import { useState } from 'react'
import { researchMethod } from '../../data/research'
import './ResearchMethod.css'

export default function ResearchMethod() {
  const [activeStage, setActiveStage] = useState<string>('observe')

  const active = researchMethod.find(s => s.id === activeStage)

  return (
    <section className="research-method-section">
      <div className="section-header">
        <span className="section-number">07</span>
        <h2 className="section-title">RESEARCH METHOD</h2>
      </div>

      <p className="method-intro">
        Forma general en la que Jaime conecta investigación e ingeniería, observando fenómenos reales y transformándolos en conocimiento documentado.
      </p>

      <div className="method-stages">
        {researchMethod.map((stage, idx) => (
          <div key={stage.id}>
            <button
              className={`stage-btn ${stage.id === activeStage ? 'active' : ''}`}
              onClick={() => setActiveStage(stage.id)}
            >
              <span className="stage-icon">{stage.icon}</span>
              <span className="stage-name">{stage.name}</span>
            </button>
            {idx < researchMethod.length - 1 && <div className="stage-arrow">↓</div>}
          </div>
        ))}
      </div>

      {active && (
        <div className="stage-detail">
          <h3>{active.name}</h3>
          <p>{active.description}</p>
        </div>
      )}
    </section>
  )
}
