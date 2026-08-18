import { useState } from 'react'
import { publications } from '../../data/research'
import './PaperExplorer.css'

export default function PaperExplorer() {
  const [activePaperId, setActivePaperId] = useState<string>('hybrid-ai')
  const [activeTab, setActiveTab] = useState<string>('question')

  const activePaper = publications.find(p => p.id === activePaperId)

  return (
    <section className="paper-explorer-section">
      <div className="section-header">
        <span className="section-number">04</span>
        <h2 className="section-title">OPEN THE PAPER</h2>
      </div>

      <div className="paper-selector">
        {publications.map(pub => (
          <button
            key={pub.id}
            className={`paper-select-btn ${pub.id === activePaperId ? 'active' : ''}`}
            onClick={() => {
              setActivePaperId(pub.id)
              setActiveTab('question')
            }}
          >
            {pub.shortTitle}
          </button>
        ))}
      </div>

      {activePaper && (
        <div className="explorer-container">
          <div className="tabs-nav" role="tablist">
            {['question', 'approach', 'system', 'impact', 'connection'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${tab === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={tab === activeTab}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="tab-content" role="tabpanel">
            {activeTab === 'question' && (
              <div className="content-block">
                <h3>¿Qué problema intenta analizar?</h3>
                <p>{activePaper.problem}</p>
              </div>
            )}

            {activeTab === 'approach' && (
              <div className="content-block">
                <h3>¿Cómo se aborda?</h3>
                <p>{activePaper.approach}</p>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="content-block">
                <h3>¿Qué tecnologías o conceptos intervienen?</h3>
                {activePaperId === 'environmental-ai' ? (
                  <>
                    <p className="not-software">NOT A SOFTWARE SYSTEM</p>
                    <p>Este paper analiza dimensiones conceptuales y ambientales de la IA, más que construir un sistema de software específico. El enfoque es reflexivo y analítico sobre los impactos de la infraestructura y tecnología.</p>
                  </>
                ) : (
                  <>
                    <div className="tech-stack">
                      {['Deep Learning', 'Expert Systems', 'Hybrid Architectures', 'AgroDiversity Platform'].map(tech => (
                        <span key={tech} className="tech-item">{tech}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'impact' && (
              <div className="content-block">
                <h3>¿Qué reflexión o contribución deja?</h3>
                <p>{activePaper.contribution}</p>
              </div>
            )}

            {activeTab === 'connection' && (
              <div className="content-block">
                <h3>¿Cómo se relaciona con la trayectoria de Jaime?</h3>
                <p>{activePaper.connection}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
