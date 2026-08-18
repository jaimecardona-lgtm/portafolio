import { useState } from 'react'
import { researchEngineeringMatrix } from '../../data/research'
import './ResearchEngineeringMatrix.css'

export default function ResearchEngineeringMatrix() {
  const [activeCorner, setActiveCorner] = useState<string>('research')

  const active = researchEngineeringMatrix.find(m => m.corner.toLowerCase() === activeCorner)

  return (
    <section className="research-engineering-section">
      <div className="section-header">
        <span className="section-number">10</span>
        <h2 className="section-title">RESEARCH ↔ ENGINEERING</h2>
      </div>

      <p className="matrix-intro">
        Jaime se mueve entre estos cuatro espacios: investigar un problema, modelarlo, construir una solución y pensar cómo puede utilizarse.
      </p>

      <div className="matrix-corners">
        {researchEngineeringMatrix.map(corner => (
          <button
            key={corner.corner}
            className={`corner-btn ${corner.corner.toLowerCase() === activeCorner ? 'active' : ''}`}
            onClick={() => setActiveCorner(corner.corner.toLowerCase())}
          >
            <span className="corner-name">{corner.corner}</span>
            <span className="corner-label">{corner.label}</span>
          </button>
        ))}
      </div>

      {active && (
        <div className="matrix-detail">
          <h3>{active.corner}</h3>
          <p className="detail-desc">{active.description}</p>
        </div>
      )}

      <div className="matrix-examples">
        <div className="example">
          <strong>AGRODIVERSITY</strong> — Research + AI
        </div>
        <div className="example">
          <strong>AGROPILOT</strong> — Engineering + Product + AI
        </div>
        <div className="example">
          <strong>ALIGNERR</strong> — Evaluation + Engineering
        </div>
        <div className="example">
          <strong>CONCAPAN</strong> — Research + Review
        </div>
      </div>
    </section>
  )
}
