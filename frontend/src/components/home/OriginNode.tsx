import { useState } from 'react'
import { originNodeItems } from '../../data/home'
import './OriginNode.css'

export default function OriginNode() {
  const [active, setActive] = useState('animals')
  const activeItem = originNodeItems.find(item => item.id === active)

  const handleCTA = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'historia' } }))
  }

  return (
    <section className="origin-node">
      <div className="wrap">
        <div className="origin-header">
          <span className="section-number">01</span>
          <h2 className="section-title">ORIGIN NODE</h2>
          <p className="section-subtitle">De la finca al sistema</p>
        </div>

        <p className="origin-intro">
          Antes de construir sistemas digitales, aprendí a observar sistemas vivos.
        </p>

        <div className="origin-grid">
          <div className="origin-nodes">
            {originNodeItems.map(item => (
              <button
                key={item.id}
                className={`node ${active === item.id ? 'active' : ''}`}
                onClick={() => setActive(item.id)}
              >
                <span className="node-label">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="origin-detail">
            {activeItem && (
              <>
                <div className="detail-header">
                  <h3>{activeItem.label}</h3>
                </div>
                <p className="detail-text">{activeItem.description}</p>
                <button onClick={handleCTA} className="origin-cta">
                  CONOCER MI HISTORIA →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
