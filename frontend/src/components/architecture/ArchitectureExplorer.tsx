import { useState } from 'react'
import './ArchitectureExplorer.css'

interface ArchitectureNode {
  id: string
  label: string
  description: string
  technology?: string[]
  type: 'actor' | 'channel' | 'frontend' | 'backend' | 'service' | 'data' | 'ai' | 'integration' | 'security' | 'infrastructure'
  status: 'current' | 'planned' | 'optional'
}

interface ArchitectureView {
  id: string
  title: string
  description: string
  nodes: ArchitectureNode[]
  sequence?: string[]
}

interface ArchitectureExplorerProps {
  projectSlug: string
  projectTitle: string
  views: ArchitectureView[]
}

const nodeTypeColors: Record<string, string> = {
  actor: '#FFA500',
  channel: '#00D4FF',
  frontend: '#0099FF',
  backend: '#003366',
  service: '#00FFFF',
  data: '#39FF14',
  ai: '#BB00FF',
  integration: '#FF6600',
  security: '#FF4444',
  infrastructure: '#666666',
}

export default function ArchitectureExplorer({
  projectTitle,
  views,
}: ArchitectureExplorerProps) {
  const [currentViewIndex, setCurrentViewIndex] = useState(0)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  const currentView = views[currentViewIndex]
  const selectedNode = selectedNodeId
    ? currentView.nodes.find((n) => n.id === selectedNodeId)
    : null

  return (
    <div className="architecture-explorer">
      <div className="architecture-header">
        <h2>{projectTitle}</h2>
        <p className="architecture-subtitle">Arquitectura técnica e integración de sistemas</p>
      </div>

      {/* VIEW TABS */}
      <div className="architecture-tabs">
        {views.map((view, index) => (
          <button
            key={view.id}
            className={`tab ${index === currentViewIndex ? 'active' : ''}`}
            onClick={() => setCurrentViewIndex(index)}
          >
            {view.title}
          </button>
        ))}
      </div>

      <div className="architecture-content">
        {/* CANVAS */}
        <div className="architecture-canvas">
          <div className="canvas-grid">
            {currentView.nodes.map((node) => (
              <div
                key={node.id}
                className={`architecture-node ${node.status} ${
                  selectedNodeId === node.id ? 'selected' : ''
                }`}
                style={{
                  borderColor: nodeTypeColors[node.type],
                  backgroundColor: `${nodeTypeColors[node.type]}11`,
                }}
                onClick={() => setSelectedNodeId(node.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedNodeId(node.id)
                }}
              >
                <div className="node-type-badge" style={{ color: nodeTypeColors[node.type] }}>
                  {node.type.toUpperCase()}
                </div>
                <h3 className="node-label">{node.label}</h3>
                {node.technology && node.technology.length > 0 && (
                  <div className="node-tech">
                    {node.technology.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS PANEL */}
        <div className="architecture-details">
          {selectedNode ? (
            <div className="details-content">
              <h3>{selectedNode.label}</h3>
              <p className="details-description">{selectedNode.description}</p>

              {selectedNode.technology && selectedNode.technology.length > 0 && (
                <div className="details-section">
                  <h4>Tecnologías</h4>
                  <ul>
                    {selectedNode.technology.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="details-status">
                <span className={`status-badge ${selectedNode.status}`}>
                  {selectedNode.status === 'current' && '✓ ACTUAL'}
                  {selectedNode.status === 'planned' && '📅 PLANEADO'}
                  {selectedNode.status === 'optional' && '○ OPCIONAL'}
                </span>
              </div>

              <button className="ask-jac-ia">
                ❓ Preguntarle a JAC-IA sobre {selectedNode.label}
              </button>
            </div>
          ) : (
            <div className="details-empty">
              <p>Haz clic en un componente para ver detalles</p>
            </div>
          )}
        </div>
      </div>

      {/* VIEW DESCRIPTION */}
      <div className="architecture-description">
        <h4>{currentView.title}</h4>
        <p>{currentView.description}</p>
      </div>

      {/* LEGEND */}
      <div className="architecture-legend">
        <h4>Leyenda</h4>
        <div className="legend-items">
          {Object.entries(nodeTypeColors).map(([type, color]) => (
            <div key={type} className="legend-item">
              <div className="legend-color" style={{ borderColor: color }}></div>
              <span>{type.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
