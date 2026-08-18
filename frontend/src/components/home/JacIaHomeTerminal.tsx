import { suggestedQuestions } from '../../data/home'
import './JacIaHomeTerminal.css'

interface Props {
  onOpenChat: (question: string) => void
}

export default function JacIaHomeTerminal({ onOpenChat }: Props) {
  return (
    <section className="jac-ia-terminal">
      <div className="wrap">
        <div className="terminal-header">
          <span className="section-number">07</span>
          <h2 className="section-title">ASK THE SYSTEM</h2>
        </div>

        <div className="terminal-console">
          <div className="console-header">
            <span className="console-title">JAC-IA</span>
            <span className="console-status">●</span>
          </div>

          <div className="console-body">
            <p className="console-intro">¿Quieres saber algo de Jaime?</p>

            <div className="suggested-questions">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  className="question-button"
                  onClick={() => onOpenChat(q)}
                >
                  {q}
                </button>
              ))}
            </div>

            <p className="console-note">
              No leas todo si no quieres. Pregúntale directamente a mi portafolio.
            </p>

            <button className="open-chat-btn" onClick={() => onOpenChat('')}>
              ABRIR JAC-IA →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
