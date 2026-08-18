import './EvaluationComparison.css'

export default function EvaluationComparison() {
  return (
    <section className="evaluation-comparison-section">
      <div className="section-header">
        <span className="section-number">09</span>
        <h2 className="section-title">WHEN REVIEWING</h2>
      </div>

      <p className="comparison-intro">
        Dos contextos diferentes, una misma disciplina: evaluar con evidencia.
      </p>

      <div className="comparison-grid">
        <div className="comparison-card alignerr">
          <h3>SOFTWARE / AI EVALUATION</h3>
          <h4>ALIGNERR</h4>
          <ul className="criteria-list">
            <li>Code Quality</li>
            <li>Model Responses</li>
            <li>Execution</li>
            <li>Tests</li>
            <li>Root Cause</li>
            <li>Maintainability</li>
            <li>Evidence</li>
          </ul>
        </div>

        <div className="comparison-divider">VS</div>

        <div className="comparison-card concapan">
          <h3>ACADEMIC REVIEW</h3>
          <h4>CONCAPAN</h4>
          <ul className="criteria-list">
            <li>Research Question</li>
            <li>Methodology</li>
            <li>Technical Rigor</li>
            <li>Contribution</li>
            <li>Clarity</li>
            <li>Feedback</li>
            <li>Evidence</li>
          </ul>
        </div>
      </div>

      <p className="comparison-message">
        En ambos contextos, el objetivo es el mismo: verificar que la solución o propuesta esté soportada por evidencia, sea clara, y resuelva realmente el problema planteado.
      </p>
    </section>
  )
}
