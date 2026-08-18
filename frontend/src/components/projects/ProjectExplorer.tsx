import { useState } from 'react'
import { Project } from '../../data/projects'
import SmartMedia from '../media/SmartMedia'

type ExplorerTab = 'overview' | 'flow' | 'stack' | 'architecture' | 'decisions' | 'lessons'

interface Props {
  project: Project | null
}

export default function ProjectExplorer({ project }: Props) {
  const [activeTab, setActiveTab] = useState<ExplorerTab>('overview')

  if (!project) {
    return (
      <section className="project-explorer">
        <div className="wrap">
          <div className="explorer-placeholder">Selecciona un proyecto en PROJECT UNIVERSE</div>
        </div>
      </section>
    )
  }

  return (
    <section className="project-explorer">
      <div className="wrap">
        <div className="explorer-header">
          <h2>{project.name}</h2>
        </div>

        <div className="explorer-tabs">
          {(['overview', 'flow', 'stack', 'architecture', 'decisions', 'lessons'] as ExplorerTab[]).map(tab => (
            <button
              key={tab}
              className={`explorer-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              aria-selected={activeTab === tab}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="explorer-content">
          {activeTab === 'overview' && (
            <div className="content-overview">
              <div className="overview-item">
                <h3>PROBLEMA</h3>
                <p>{project.problem}</p>
              </div>
              <div className="overview-item">
                <h3>SOLUCIÓN</h3>
                <p>{project.solution}</p>
              </div>
              <div className="overview-item">
                <h3>MI ROL</h3>
                <p>{project.role}</p>
              </div>
            </div>
          )}

          {activeTab === 'flow' && (
            <div className="content-flow">
              {project.dataFlow && <p className="flow-text">{project.dataFlow}</p>}
              {project.aiFlow && <p className="flow-text">{project.aiFlow}</p>}
            </div>
          )}

          {activeTab === 'stack' && (
            <div className="content-stack">
              <div className="stack-list">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-item">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="content-architecture">
              {project.media?.diagram ? (
                <>
                  <div className="architecture-diagram">
                    <SmartMedia
                      src={project.media.diagram}
                      alt={`${project.name} architecture`}
                      width={800}
                      height={600}
                      loading="lazy"
                      aspectRatio="4/3"
                      objectFit="contain"
                      mediaType="diagram"
                    />
                  </div>
                  {project.architecture && (
                    <div className="architecture-description">
                      <p>{project.architecture}</p>
                    </div>
                  )}
                </>
              ) : project.architecture ? (
                <div className="architecture-description">
                  <p>{project.architecture}</p>
                </div>
              ) : (
                <p className="no-architecture">Arquitectura no disponible</p>
              )}
            </div>
          )}

          {activeTab === 'decisions' && (
            <div className="content-decisions">
              {project.keyDecisions.map((decision, idx) => (
                <div key={idx} className="decision-item">
                  <span className="decision-number">{idx + 1}</span>
                  <p>{decision}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'lessons' && (
            <div className="content-lessons">
              {project.lessons.map((lesson, idx) => (
                <div key={idx} className="lesson-item">
                  <p>"{lesson}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
