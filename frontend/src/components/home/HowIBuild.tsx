import { useState } from 'react'
import { buildSteps } from '../../data/home'
import './HowIBuild.css'

export default function HowIBuild() {
  const [active, setActive] = useState('understand')
  const activeStep = buildSteps.find(s => s.id === active)

  return (
    <section className="how-i-build">
      <div className="wrap">
        <div className="build-header">
          <span className="section-number">06</span>
          <h2 className="section-title">HOW I THINK</h2>
          <p className="section-subtitle">
            No empiezo preguntando qué tecnología usar. Empiezo preguntando qué problema necesita resolverse.
          </p>
        </div>

        <div className="build-steps">
          {buildSteps.map(step => (
            <button
              key={step.id}
              className={`step-button ${active === step.id ? 'active' : ''}`}
              onClick={() => setActive(step.id)}
            >
              <span className="step-number">{step.number}</span>
              <span className="step-title">{step.title}</span>
            </button>
          ))}
        </div>

        <div className="step-detail">
          {activeStep && <p>{activeStep.description}</p>}
        </div>
      </div>
    </section>
  )
}
