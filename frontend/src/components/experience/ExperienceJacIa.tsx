import { useState } from 'react'
import './ExperienceJacIa.css'

interface Props {
  questions: string[]
  onOpenChat: () => void
}

export default function ExperienceJacIa({ questions, onOpenChat }: Props) {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  return (
    <section className="jacia-section">
      <div className="section-header">
        <span className="section-number">07</span>
        <h2 className="section-title">ASK JAC-IA</h2>
      </div>

      <p className="section-description">
        Preguntas frecuentes sobre experiencia, enfoque técnico y metodología.
      </p>

      <div className="questions-grid">
        {questions.map((question, idx) => (
          <button
            key={idx}
            className="question-card"
            onClick={() => {
              setExpandedQuestion(question === expandedQuestion ? null : question)
              onOpenChat()
            }}
          >
            <div className="question-mark">?</div>
            <p className="question-text">{question}</p>
            <span className="question-expand">→</span>
          </button>
        ))}
      </div>

      <div className="jacia-cta">
        <button className="chat-button" onClick={onOpenChat}>
          Continuar conversación
        </button>
      </div>
    </section>
  )
}
