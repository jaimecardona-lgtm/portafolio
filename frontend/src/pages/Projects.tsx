import { useState, useMemo, useEffect } from 'react'
import '../styles/scroll-reveal.css'
import './Projects.css'
import ProjectsHero from '../components/projects/ProjectsHero'
import ProjectFilterMatrix from '../components/projects/ProjectFilterMatrix'
import FlagshipProject from '../components/projects/FlagshipProject'
import ProjectUniverse from '../components/projects/ProjectUniverse'
import ProjectExplorer from '../components/projects/ProjectExplorer'
import BuildPatterns from '../components/projects/BuildPatterns'
import OtherBuilds from '../components/projects/OtherBuilds'
import { projects, ProjectCategory } from '../data/projects'

type FilterKey = 'all' | ProjectCategory

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter(p => p.categories.includes(activeFilter))
  }, [activeFilter])

  const activeProject = projects.find(p => p.id === activeProjectId) || null

  const handleExplore = () => {
    const elem = document.querySelector('.project-universe')
    elem?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('openChat', { detail: { question: '¿Cuáles son tus proyectos principales?' } }))
  }

  return (
    <div className="projects">
      <ProjectsHero onExplore={handleExplore} onOpenChat={handleOpenChat} />

      <section className="scroll-reveal">
        <ProjectFilterMatrix active={activeFilter} onFilterChange={setActiveFilter} />
      </section>

      <section className="scroll-reveal">
        <FlagshipProject />
      </section>

      <section className="scroll-reveal project-universe">
        <ProjectUniverse projects={filteredProjects} activeId={activeProjectId} onSelectProject={setActiveProjectId} />
      </section>

      <section className="scroll-reveal">
        <ProjectExplorer project={activeProject} />
      </section>

      <section className="scroll-reveal">
        <BuildPatterns />
      </section>

      <section className="scroll-reveal">
        <OtherBuilds />
      </section>

      <section className="scroll-reveal projects-final-cta">
        <div className="wrap">
          <h2>Un repositorio muestra código. Un sistema demuestra criterio.</h2>
          <p>
            Cada proyecto aquí existe para resolver un problema diferente, pero todos comparten la misma obsesión: entender primero, arquitectar con intención y construir hasta que funcione.
          </p>
          <div className="final-cta-buttons">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'experiencia' } }))
              }
              className="cta-btn"
            >
              VER MI EXPERIENCIA
            </button>
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'investigacion' } }))
              }
              className="cta-btn"
            >
              EXPLORAR INVESTIGACIÓN
            </button>
            <button onClick={handleOpenChat} className="cta-btn">
              PREGUNTAR A JAC-IA
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
