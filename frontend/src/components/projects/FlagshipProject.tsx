import { useState } from 'react'
import { projects } from '../../data/projects'

const agropilot = projects.find(p => p.flagship)!

type TabKey = 'vision' | 'modules' | 'ia' | 'architecture' | 'evolution'

export default function FlagshipProject() {
  const [activeTab, setActiveTab] = useState<TabKey>('vision')
  const [activeModule, setActiveModule] = useState<string>(agropilot.modules?.[0] || '')

  return (
    <section className="flagship-project">
      <div className="wrap">
        <div className="flagship-header">
          <span className="section-number">02</span>
          <h2 className="section-title">FLAGSHIP SYSTEM</h2>
        </div>

        <div className="flagship-grid">
          <div className="flagship-visual">
            <div className="flagship-placeholder">
              <div className="placeholder-title">AGROPILOT CM</div>
              <div className="placeholder-subtitle">LIVE SYSTEM MAP</div>
              <div className="placeholder-flow">
                <div className="flow-item">Herd</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-item">Data</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-item">Prediction</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-item">Decision</div>
              </div>
              <div className="placeholder-meta">
                <span>MULTI-TENANT</span>
                <span>ML</span>
                <span>RAG</span>
                <span>AGROTECH</span>
              </div>
            </div>
          </div>

          <div className="flagship-panel">
            <div className="tab-buttons">
              {(['vision', 'modules', 'ia', 'architecture', 'evolution'] as TabKey[]).map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  aria-selected={activeTab === tab}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'vision' && (
                <div className="content-vision">
                  <div className="content-group">
                    <h3>PROBLEMA</h3>
                    <p>{agropilot.problem}</p>
                  </div>
                  <div className="content-group">
                    <h3>RESPUESTA</h3>
                    <p>{agropilot.solution}</p>
                  </div>
                  <div className="content-group">
                    <h3>ROL</h3>
                    <p>{agropilot.role}</p>
                  </div>
                </div>
              )}

              {activeTab === 'modules' && (
                <div className="content-modules">
                  <div className="module-buttons">
                    {agropilot.modules?.map(mod => (
                      <button
                        key={mod}
                        className={`module-btn ${activeModule === mod ? 'active' : ''}`}
                        onClick={() => setActiveModule(mod)}
                      >
                        {mod}
                      </button>
                    ))}
                  </div>
                  <div className="module-detail">
                    <p>Módulo: <strong>{activeModule}</strong></p>
                    <p>Parte integral del ecosistema multi-tenant de Agropilot.</p>
                  </div>
                </div>
              )}

              {activeTab === 'ia' && (
                <div className="content-ia">
                  <div className="ia-group">
                    <h4>PREDICT</h4>
                    <div className="ia-items">
                      {['Linear Regression', 'Decision Trees', 'Random Forest', 'AdaBoost', 'Ridge'].map(m => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <div className="ia-group">
                    <h4>UNDERSTAND</h4>
                    <div className="ia-items">
                      {['Disease Classification', 'Anomaly Detection'].map(m => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <div className="ia-group">
                    <h4>RETRIEVE & REASON</h4>
                    <div className="ia-items">
                      {['RAG', 'Model Router', 'Fallback'].map(m => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="content-architecture">
                  <div className="arch-flow">
                    <div className="arch-layer">React + TypeScript</div>
                    <div className="arch-arrow">↓</div>
                    <div className="arch-layer">FastAPI / Node.js</div>
                    <div className="arch-arrow">↓</div>
                    <div className="arch-layer">Supabase PostgreSQL</div>
                    <div className="arch-features">
                      <span>RLS</span>
                      <span>JWT</span>
                      <span>Realtime</span>
                      <span>farm_id</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'evolution' && (
                <div className="content-evolution">
                  <div className="evolution-timeline">
                    <div className="evo-item">AgroDiversity</div>
                    <div className="evo-arrow">↓</div>
                    <div className="evo-item">Agrosoft CM</div>
                    <div className="evo-arrow">↓</div>
                    <div className="evo-item">Agropilot CM</div>
                    <div className="evo-arrow">↓</div>
                    <div className="evo-item vision">IoT / CV / Mobile</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
