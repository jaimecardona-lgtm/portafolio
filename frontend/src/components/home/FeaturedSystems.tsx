import { useState } from 'react'
import { featuredProjects } from '../../data/home'
import './FeaturedSystems.css'

export default function FeaturedSystems() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % featuredProjects.length)
  const prev = () => setCurrent((current - 1 + featuredProjects.length) % featuredProjects.length)

  const getPlaceholder = (type: string) => {
    switch (type) {
      case 'chart':
        return (
          <div className="placeholder-chart">
            <div className="chart-bar"></div>
            <div className="chart-bar"></div>
            <div className="chart-bar"></div>
          </div>
        )
      case 'whatsapp':
        return (
          <div className="placeholder-whatsapp">
            <div className="ws-circle">💬</div>
            <div className="ws-arrow">→</div>
            <div className="ws-circle">🤖</div>
            <div className="ws-arrow">→</div>
            <div className="ws-circle">📞</div>
          </div>
        )
      case 'map':
        return (
          <div className="placeholder-map">
            <div className="map-marker">📍</div>
            <div className="map-route"></div>
            <div className="map-vehicle">🚗</div>
          </div>
        )
      default:
        return <div className="placeholder-generic">Proyecto</div>
    }
  }

  return (
    <section className="featured-systems">
      <div className="wrap">
        <div className="systems-header">
          <span className="section-number">03</span>
          <h2 className="section-title">SYSTEMS I'VE BUILT</h2>
        </div>

        <div className="carousel-3d">
          <button className="carousel-btn prev" onClick={prev} aria-label="Previous project">
            ←
          </button>

          <div className="carousel-viewport">
            <div className="carousel-slides">
              {featuredProjects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className={`carousel-slide ${idx === current ? 'active' : ''}`}
                  style={{
                    opacity: Math.abs(idx - current) > 1 ? 0 : 1 - Math.abs(idx - current) * 0.3,
                    transform: `translateX(${(idx - current) * 100}%) scale(${
                      idx === current ? 1 : 0.85
                    })`,
                  }}
                >
                  <div className="slide-visual">{getPlaceholder(proj.placeholder)}</div>
                  <div className="slide-info">
                    <span className="project-type">{proj.type}</span>
                    <h3>{proj.name}</h3>
                    <p className="project-phrase">{proj.phrase}</p>
                    <div className="project-tech">
                      {proj.tech.map(t => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="project-role">{proj.role}</p>
                    <button
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent('navigate', { detail: { page: proj.cta.route } })
                        )
                      }
                      className="project-link"
                    >
                      {proj.cta.label} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next" onClick={next} aria-label="Next project">
            →
          </button>
        </div>

        <div className="carousel-dots">
          {featuredProjects.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>

        <div className="systems-footer">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'proyectos' } }))}
            className="see-all-cta"
          >
            VER TODOS LOS PROYECTOS →
          </button>
        </div>
      </div>
    </section>
  )
}
