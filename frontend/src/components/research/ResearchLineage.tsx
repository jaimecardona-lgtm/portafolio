import { useState } from 'react'
import { researchLineage } from '../../data/research'
import './ResearchLineage.css'

export default function ResearchLineage() {
  const [activeNode, setActiveNode] = useState<string>('problem')

  const active = researchLineage.find(n => n.id === activeNode)

  return (
    <section className="research-lineage-section">
      <div className="section-header">
        <span className="section-number">05</span>
        <h2 className="section-title">RESEARCH BECOMES PRODUCT</h2>
      </div>

      <p className="lineage-intro">
        La investigación no terminó en el paper. Parte de los conceptos siguieron evolucionando dentro de una visión de producto más amplia.
      </p>

      <div className="lineage-nodes">
        {researchLineage.map((node, idx) => (
          <div key={node.id}>
            <button
              className={`lineage-node ${node.id === activeNode ? 'active' : ''}`}
              onClick={() => setActiveNode(node.id)}
            >
              <span className="node-icon">{node.icon}</span>
              <span className="node-label">{node.name}</span>
            </button>
            {idx < researchLineage.length - 1 && <div className="lineage-arrow">↓</div>}
          </div>
        ))}
      </div>

      {active && (
        <div className="lineage-detail">
          <h3>{active.name}</h3>
          <p>{active.description}</p>
        </div>
      )}

      <div className="lineage-message">
        <p>
          <strong>AGRODIVERSITY</strong> fue un proyecto de investigación orientado a agricultura. <br/>
          <strong>AGROPILOT CM</strong> es la evolución hacia una visión de producto más amplia.<br/>
          Parte de los conceptos de IA híbrida y agricultura inteligente se conectan entre ambos.
        </p>
      </div>
    </section>
  )
}
