import { Project, ownershipColors, ownershipLabels } from '../../data/projects'
import SmartMedia from '../media/SmartMedia'
import './ProjectUniverse.css'

interface Props {
  projects: Project[]
  activeId: string
  onSelectProject: (id: string) => void
}

export default function ProjectUniverse({ projects, activeId, onSelectProject }: Props) {
  const activeIdx = projects.findIndex(p => p.id === activeId)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      const nextIdx = (activeIdx + 1) % projects.length
      onSelectProject(projects[nextIdx].id)
    } else if (e.key === 'ArrowLeft') {
      const prevIdx = (activeIdx - 1 + projects.length) % projects.length
      onSelectProject(projects[prevIdx].id)
    }
  }

  return (
    <section className="project-universe-section">
      <div className="wrap">
        <div className="universe-header">
          <span className="section-number">03</span>
          <h2 className="section-title">PROJECT UNIVERSE</h2>
        </div>

        <div className="universe-carousel" onKeyDown={handleKeyDown} tabIndex={0} role="region" aria-label="Project carousel">
          <button
            className="carousel-nav prev"
            onClick={() => {
              const prevIdx = (activeIdx - 1 + projects.length) % projects.length
              onSelectProject(projects[prevIdx].id)
            }}
            aria-label="Previous project"
          >
            ←
          </button>

          <div className="carousel-viewport">
            {projects.map((project, idx) => {
              const distance = Math.abs(idx - activeIdx)
              const isActive = idx === activeIdx
              const position = idx > activeIdx ? 1 : idx < activeIdx ? -1 : 0

              return (
                <div
                  key={project.id}
                  className={`carousel-card ${isActive ? 'active' : ''}`}
                  style={{
                    transform: `translateX(${position * 100}%) scale(${isActive ? 1 : 0.8}) translateZ(${
                      isActive ? 0 : -200
                    }px)`,
                    opacity: distance > 1 ? 0 : 1 - distance * 0.3,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  onClick={() => onSelectProject(project.id)}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                >
                  <div className="card-header" style={{ borderTopColor: ownershipColors[project.ownership] }}>
                    <span className="card-ownership" style={{ color: ownershipColors[project.ownership] }}>
                      {ownershipLabels[project.ownership]}
                    </span>
                  </div>

                  <div className="card-visual">
                    {project.media?.route ? (
                      <SmartMedia
                        src={project.media.route}
                        alt={`${project.name} cover`}
                        width={400}
                        height={300}
                        loading="lazy"
                        aspectRatio="4/3"
                        objectFit="contain"
                        mediaType="screenshot"
                      />
                    ) : (
                      <div className="visual-placeholder">{project.name}</div>
                    )}
                  </div>

                  <div className="card-content">
                    <h3>{project.name}</h3>
                    {project.formerName && <span className="former-name">formerly {project.formerName}</span>}
                    <p className="card-tagline">{project.tagline}</p>
                    <p className="card-role">{project.role}</p>

                    <div className="card-tech">
                      {project.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            className="carousel-nav next"
            onClick={() => {
              const nextIdx = (activeIdx + 1) % projects.length
              onSelectProject(projects[nextIdx].id)
            }}
            aria-label="Next project"
          >
            →
          </button>
        </div>

        <div className="carousel-indicators">
          <div className="indicator-count">
            {activeIdx + 1} / {projects.length}
          </div>
          <div className="indicator-dots">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                className={`dot ${idx === activeIdx ? 'active' : ''}`}
                onClick={() => onSelectProject(proj.id)}
                aria-label={`Go to ${proj.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
