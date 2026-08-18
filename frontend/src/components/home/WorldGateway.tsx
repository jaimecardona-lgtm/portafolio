import { useState } from 'react'
import './WorldGateway.css'

interface Preview {
  title: string
  description: string
  highlights: string[]
  cta: { label: string; route: string } | null
}

interface Props {
  number: string
  name: string
  icon: string
  phrase: string
  preview: Preview
  isOpen: boolean
  onOpen: () => void
}

export default function WorldGateway({
  number,
  name,
  icon,
  phrase,
  preview,
  isOpen,
  onOpen,
}: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const handleCTA = () => {
    if (preview.cta) {
      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: preview.cta.route } }))
    }
  }

  return (
    <>
      <button
        className={`world-gateway ${isOpen ? 'open' : ''}`}
        onClick={onOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-expanded={isOpen}
      >
        <div className="gateway-icon">{icon}</div>
        <div className="gateway-number">{number}</div>
        <div className="gateway-content">
          <h3>{name}</h3>
          <p>{phrase}</p>
        </div>
        {isHovered && <div className="gateway-glow"></div>}
        <div className="gateway-line"></div>
      </button>

      {isOpen && (
        <div className="gateway-preview" role="region" aria-label={`${name} details`}>
          <div className="preview-close">
            <button onClick={onOpen} aria-label="Close preview">
              ✕
            </button>
          </div>

          <div className="preview-content">
            <h3 className="preview-title">{preview.title}</h3>
            <p className="preview-description">{preview.description}</p>

            <div className="preview-highlights">
              {preview.highlights.map((highlight, idx) => (
                <div key={idx} className="highlight-item">
                  {highlight}
                </div>
              ))}
            </div>

            {preview.cta && (
              <button onClick={handleCTA} className="preview-cta">
                {preview.cta.label} →
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
