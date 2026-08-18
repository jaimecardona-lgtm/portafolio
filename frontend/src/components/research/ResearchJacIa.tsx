import { suggestedQuestions } from '../../data/research'
import './ResearchJacIa.css'

export default function ResearchJacIa() {
  const handleQuestion = (question: string) => {
    window.dispatchEvent(new CustomEvent('openChat', { detail: { prefill: question } }))
  }

  return (
    <section className="research-jacia-section">
      <div className="section-header">
        <span className="section-number">11</span>
        <h2 className="section-title">ASK THE ARCHIVE</h2>
      </div>

      <p className="jacia-intro">
        Puedes preguntarle al portafolio por las publicaciones, la relación entre investigación y proyectos o el rol de reviewer.
      </p>

      <div className="questions-grid">
        {suggestedQuestions.map((question, idx) => (
          <button
            key={idx}
            className="question-btn"
            onClick={() => handleQuestion(question)}
          >
            <span className="question-icon">?</span>
            <span className="question-text">{question}</span>
            <span className="question-arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  )
}
