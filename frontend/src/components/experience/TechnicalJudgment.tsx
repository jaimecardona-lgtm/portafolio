import { dianuSystems, rcktSystems, evaluationCriteria } from '../../data/experience'
import './TechnicalJudgment.css'

interface Props {
  dianSystems: typeof dianuSystems
  rcktSystems: typeof rcktSystems
  evaluationCriteria: typeof evaluationCriteria
}

export default function TechnicalJudgment({ evaluationCriteria }: Props) {
  return (
    <section className="technical-judgment-section">
      <div className="section-header">
        <span className="section-number">04</span>
        <h2 className="section-title">TECHNICAL JUDGMENT</h2>
      </div>

      <div className="judgment-intro">
        <div className="builder-role">
          <h3 className="role-title">BUILDER</h3>
          <p className="role-description">
            Capacidad de construir: diseñar, codificar, iterar, lanzar a producción.
          </p>
          <div className="role-details">
            <p>Hacer cosas que funcionan en contextos reales.</p>
          </div>
        </div>

        <div className="divider">+</div>

        <div className="reviewer-role">
          <h3 className="role-title">REVIEWER</h3>
          <p className="role-description">
            Capacidad de evaluar: leer código, juzgar decisiones, verificar soluciones.
          </p>
          <div className="role-details">
            <p>Entender si una solución realmente resuelve el problema.</p>
          </div>
        </div>
      </div>

      <div className="evaluation-criteria-section">
        <h3 className="criteria-title">EVALUACIÓN: 7 CRITERIOS</h3>
        <div className="criteria-grid">
          {evaluationCriteria.map((criterion) => (
            <div key={criterion.id} className="criteria-card">
              <h4 className="criteria-name">{criterion.name}</h4>
              <p className="criteria-description">{criterion.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="concapan-badge">
        <span className="badge-icon">🎖️</span>
        <div className="badge-text">
          <p className="badge-title">TPC REVIEWER - CONCAPAN 2026</p>
          <p className="badge-description">
            Servicio técnico de evaluación de desafíos de programación competitiva.
          </p>
        </div>
      </div>
    </section>
  )
}
