import { useEffect, useState } from 'react'
import { GlitchHeroName } from './motion/GlitchHeroName'
import SmartMedia from './media/SmartMedia'
import './Hero.css'

interface Props {
  onOpenChat: () => void
}

export default function Hero({ onOpenChat }: Props) {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowDetails(true), 1200)
  }, [])

  const tags = ['AI', 'DATA', 'FULL STACK', 'RAG', 'ML', 'ARCHITECTURE', 'AGROTECH']

  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="hero-content">
            <div className="eyebrow">SYSTEM ONLINE // CALI, COLOMBIA</div>

            <div className="hero-glitch-wrapper">
              <GlitchHeroName
                name="JAIME CARDONA"
                subtitle="AI & DATA ENGINEER"
              />
            </div>

            <div className="hero-roles">
              <span>AI & DATA ENGINEER</span>
              <span>SOFTWARE ENGINEER</span>
              <span>APPLIED AI BUILDER</span>
            </div>

            {showDetails && (
              <>
                <p className="hero-phrase">
                  De la finca al modelo.
                  <br />
                  Del problema real al sistema que lo resuelve.
                </p>

                <p className="hero-description">
                  Ingeniero de Sistemas que conecta software, datos, inteligencia artificial, arquitectura y conocimiento del campo para convertir problemas reales en productos que pueden operar.
                </p>

                <div className="hero-tags">
                  {tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="hero-ctas">
                  <button
                    className="cta-btn primary"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'historia' } }))
                    }
                  >
                    EXPLORAR MI HISTORIA
                  </button>
                  <button
                    className="cta-btn secondary"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'proyectos' } }))
                    }
                  >
                    VER SISTEMAS
                  </button>
                  <button className="cta-btn secondary" onClick={onOpenChat}>
                    HABLAR CON JAC-IA
                  </button>
                </div>
              </>
            )}

            <div className="scroll-indicator">
              <span>SCROLL TO EXPLORE</span>
              <div className="scroll-arrow"></div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-visual">
            <SmartMedia
              src="/media/profile/perfil.jpeg"
              alt="Jaime Cardona - Perfil"
              width={300}
              height={400}
              loading="eager"
              fetchPriority="high"
              aspectRatio="3/4"
              objectFit="contain"
              mediaType="photo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
