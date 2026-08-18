import { useState } from 'react'
import { researchTimeline } from '../../data/research'
import './ResearchTimeline.css'

interface Props {
  onSelectNode?: (id: string) => void
}

export default function ResearchTimeline({ onSelectNode }: Props) {
  const [activeNode, setActiveNode] = useState<string>('agrodiversity')

  const handleSelect = (id: string) => {
    setActiveNode(id)
    onSelectNode?.(id)
  }

  const active = researchTimeline.find(n => n.id === activeNode)

  return (
    <section className="research-timeline-section">
      <div className="section-header">
        <span className="section-number">02</span>
        <h2 className="section-title">RESEARCH PATH</h2>
      </div>

      <div className="timeline-container">
        <div className="timeline-nodes">
          {researchTimeline.map((node) => (
            <button
              key={node.id}
              className={`timeline-node ${node.id === activeNode ? 'active' : ''}`}
              onClick={() => handleSelect(node.id)}
              style={{ borderColor: node.color, color: node.color }}
            >
              <span className="node-icon">{node.icon}</span>
              <span className="node-name">{node.name}</span>
              <span className="node-year">{node.year}</span>
            </button>
          ))}
        </div>

        <div className="timeline-connectors">
          {researchTimeline.map((_, idx) => idx < researchTimeline.length - 1 && (
            <div key={`connector-${idx}`} className="connector" />
          ))}
        </div>
      </div>

      {active && (
        <div className="timeline-detail">
          <div className="detail-header">
            <span className="detail-icon">{active.icon}</span>
            <div>
              <h3 className="detail-name">{active.name}</h3>
              <p className="detail-type">{active.type.toUpperCase()}</p>
            </div>
          </div>
          <p className="detail-description">{active.description}</p>
        </div>
      )}
    </section>
  )
}
