import { CareerStage } from '../../data/experience'
import './CareerTimeline.css'

interface Props {
  stages: CareerStage[]
  activeId: string
  onSelectMission: (id: string) => void
}

export default function CareerTimeline({ stages, activeId, onSelectMission }: Props) {
  return (
    <section className="career-timeline-section">
      <div className="section-header">
        <span className="section-number">01</span>
        <h2 className="section-title">CAREER TIMELINE</h2>
      </div>

      <div className="timeline-container" role="tablist">
        {stages.map((stage) => (
          <button
            key={stage.id}
            className={`timeline-node ${stage.id === activeId ? 'active' : ''}`}
            onClick={() => onSelectMission(stage.id)}
            role="tab"
            aria-selected={stage.id === activeId}
            aria-controls={`mission-${stage.id}`}
          >
            <div className="node-marker" style={{ backgroundColor: stage.color }}>
              <span className="node-icon">{stage.icon}</span>
            </div>
            <div className="node-info">
              <h3 className="node-company">{stage.company}</h3>
              <p className="node-period">{stage.startDate} – {stage.endDate || 'Actual'}</p>
              <p className="node-headline">{stage.headline}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="timeline-connector" />
    </section>
  )
}
