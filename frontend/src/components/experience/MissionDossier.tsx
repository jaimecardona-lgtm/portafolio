import { useState } from 'react'
import { CareerStage, dianuSystems } from '../../data/experience'
import './MissionDossier.css'

interface Props {
  mission: CareerStage
  dianSystems?: typeof dianuSystems
  oppyTabs?: Array<{ id: string; name: string; description: string }>
  rcktSystems?: Array<{
    id: string
    name: string
    type: string
    description: string
    responsibilities: string[]
    stack: string[]
  }>
  evaluationCriteria?: Array<{ id: string; name: string; description: string }>
}

export default function MissionDossier({
  mission,
  dianSystems,
  oppyTabs,
  rcktSystems,
  evaluationCriteria,
}: Props) {
  const [activeTab, setActiveTab] = useState<string>('0')

  let tabs: any[] = []
  if (mission.id === 'dian' && dianSystems) {
    tabs = dianSystems.map((sys, idx) => ({ ...sys, tabId: String(idx) }))
  } else if (mission.id === 'oppyhound' && oppyTabs) {
    tabs = oppyTabs.map((tab) => ({ ...tab, tabId: tab.id }))
  } else if (mission.id === 'rckt' && rcktSystems) {
    tabs = rcktSystems.map((sys) => ({ ...sys, tabId: sys.id }))
  } else if (mission.id === 'alignerr' && evaluationCriteria) {
    tabs = evaluationCriteria.map((crit) => ({ ...crit, tabId: crit.id }))
  }

  const activeTabData = tabs.find((t) => t.tabId === activeTab)

  return (
    <section className="mission-dossier-section" id={`mission-${mission.id}`} role="tabpanel">
      <div className="section-header">
        <span className="section-number">02</span>
        <h2 className="section-title">MISSION DOSSIER</h2>
      </div>

      <div className="dossier-header">
        <div className="dossier-meta">
          <h3 className="dossier-company" style={{ color: mission.color }}>
            {mission.company}
          </h3>
          <p className="dossier-position">{mission.position}</p>
          <p className="dossier-period">
            {mission.startDate} – {mission.endDate || 'Actual'}
          </p>
          <p className="dossier-detail">
            {mission.modality} | {mission.location}
          </p>
        </div>

        <div className="dossier-narrative">
          <p>{mission.headline}</p>
          <p className="narrative-text">{mission.description}</p>
        </div>
      </div>

      <div className="dossier-tabs-section">
        <div className="tabs-nav" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.tabId}
              className={`tab-button ${tab.tabId === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.tabId)}
              role="tab"
              aria-selected={tab.tabId === activeTab}
              aria-controls={`tab-panel-${tab.tabId}`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {activeTabData && (
          <div className="tabs-content" id={`tab-panel-${activeTab}`} role="tabpanel">
            {mission.id === 'dian' && activeTabData.problem && (
              <div className="tab-panel-dian">
                <h4>{activeTabData.name}</h4>
                <p className="tab-problem">{activeTabData.problem}</p>
                <div className="tab-flow">
                  <span className="flow-label">Flujo:</span>
                  <div className="flow-items">
                    {activeTabData.flow?.map((item: string) => (
                      <span key={item} className="flow-item">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="tab-capabilities">
                  <span className="capabilities-label">Capacidades:</span>
                  <div className="capabilities-grid">
                    {activeTabData.capabilities?.map((cap: string) => (
                      <span key={cap} className="capability-tag">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mission.id === 'oppyhound' && (
              <div className="tab-panel-oppy">
                <h4>{activeTabData.name}</h4>
                <p>{activeTabData.description}</p>
              </div>
            )}

            {mission.id === 'rckt' && activeTabData.responsibilities && (
              <div className="tab-panel-rckt">
                <h4>{activeTabData.name}</h4>
                <p className="tab-type">{activeTabData.type}</p>
                <p>{activeTabData.description}</p>
                <div className="rckt-section">
                  <span className="section-label">Responsabilidades:</span>
                  <div className="rckt-items">
                    {activeTabData.responsibilities.map((r: string) => (
                      <span key={r} className="rckt-item">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rckt-section">
                  <span className="section-label">Stack:</span>
                  <div className="rckt-items">
                    {activeTabData.stack.map((s: string) => (
                      <span key={s} className="rckt-item tech">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mission.id === 'alignerr' && (
              <div className="tab-panel-alignerr">
                <h4>{activeTabData.name}</h4>
                <p>{activeTabData.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
