import { finalCtaActions } from '../../data/home'
import './FinalHomeCTA.css'

interface Props {
  onOpenChat: () => void
}

export default function FinalHomeCTA({ onOpenChat }: Props) {
  return (
    <section className="final-cta">
      <div className="wrap">
        <div className="cta-content">
          <p className="cta-intro">Todavía hay mucho más debajo de la superficie.</p>

          <p className="cta-description">
            Proyectos, decisiones de arquitectura, investigación, experiencias, modelos, fracasos, aprendizajes y sistemas que no caben en una sola pantalla.
          </p>

          <div className="cta-buttons">
            {finalCtaActions.map((action, idx) => {
              if (action.action === 'openChat') {
                return (
                  <button key={idx} className="cta-btn" onClick={onOpenChat}>
                    {action.label}
                  </button>
                )
              }
              return (
                <button
                  key={idx}
                  className="cta-btn"
                  onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: { page: action.route } }))}
                >
                  {action.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
