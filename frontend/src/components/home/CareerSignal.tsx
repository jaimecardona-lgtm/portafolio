import { useState } from 'react'
import { careerSignals } from '../../data/home'
import './CareerSignal.css'

export default function CareerSignal() {
  const [active, setActive] = useState('dian')
  const activeCareer = careerSignals.find(c => c.id === active)

  return (
    <section className="career-signal">
      <div className="wrap">
        <div className="signal-header">
          <span className="section-number">03</span>
          <h2 className="section-title">FIELD EXPERIENCE</h2>
        </div>

        <div className="career-grid">
          <div className="career-timeline">
            {careerSignals.map(signal => (
              <button
                key={signal.id}
                className={`timeline-node ${active === signal.id ? 'active' : ''}`}
                onClick={() => setActive(signal.id)}
              >
                <span className="node-year">{signal.year}</span>
                <span className="node-company">{signal.company}</span>
              </button>
            ))}
          </div>

          <div className="career-detail">
            {activeCareer && (
              <>
                <div className="detail-role">{activeCareer.role}</div>
                <p className="detail-description">{activeCareer.description}</p>
                <div className="detail-tags">
                  {activeCareer.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="career-footer">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'experiencia' } }))}
            className="career-cta"
          >
            VER EXPERIENCIA COMPLETA →
          </button>
        </div>
      </div>
    </section>
  )
}
