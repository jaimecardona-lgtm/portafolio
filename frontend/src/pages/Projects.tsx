import './Pages.css'
import './Projects.css'

const projects = [
  {
    id: 'agropilot',
    name: 'Agropilot CM',
    tagline: 'Ecosistema inteligente para modernizar la gestión agropecuaria',
    description: 'Plataforma integral con IA, predicción y análisis. Producción lechera, silvopastoral, porcicultura.',
    featured: true,
    tags: ['AI', 'Full-Stack', 'RAG', 'Production'],
  },
  {
    id: 'elite-beauty',
    name: 'Elite Beauty Agent',
    tagline: 'Agente omnicanal para negocio de belleza',
    description: 'Conversación vía WhatsApp y voz. Clasificación de leads. RAG con contexto de cliente.',
    featured: true,
    tags: ['AI', 'Conversational', 'Production'],
  },
  {
    id: 'intermuni',
    name: 'InterMuniConnect',
    tagline: 'Plataforma de carpooling intermunicipal',
    description: 'Conexión de pasajeros y conductores entre municipios. Pagos, calificaciones, mapas.',
    featured: true,
    tags: ['Full-Stack', 'Mobile', 'Development'],
  },
  {
    id: 'factura-ops',
    name: 'FacturaOps',
    tagline: 'Facturación electrónica con IA',
    description: 'Integración DIAN. Agente conversacional. Reportes y auditoría.',
    featured: false,
    tags: ['Backend', 'IA', 'MVP'],
  },
  {
    id: 'bertolli',
    name: 'Bertolli Pro 900',
    tagline: 'Landing premium con arquitectura escalable',
    description: 'Accesibilidad WCAG AA. FAQs interactivo. Evolución a FastAPI + RAG.',
    featured: false,
    tags: ['Frontend', 'Proof of Concept'],
  },
  {
    id: 'voz-estrategica',
    name: 'Voz Estratégica',
    tagline: 'Producto digital con integración IA',
    description: 'React + Supabase. Autenticación, pagos, analítica. Dentro del ecosistema RCKT.',
    featured: false,
    tags: ['Frontend', 'Production', 'Product'],
  },
  {
    id: 'tania-portfolio',
    name: 'Portafolio de Tania',
    tagline: 'Experiencia interactiva y narrativa',
    description: 'Cursor personalizado, reveal animations, tilt 3D, carruseles avanzados.',
    featured: false,
    tags: ['Frontend', 'Design'],
  },
  {
    id: 'agrodiversity',
    name: 'AgroDiversity',
    tagline: 'Investigación en IA y agricultura',
    description: 'Arquitecturas híbridas. Deep Learning + Expert Systems. Publicación IEEE.',
    featured: false,
    tags: ['Research', 'Academic'],
  },
]

export default function Projects() {
  const featured = projects.filter(p => p.featured)
  const others = projects.filter(p => !p.featured)

  return (
    <div className="page">
      <div className="wrap">
        <h1 className="sec-title">Proyectos</h1>
        <p className="sec-subtitle">Construcción de sistemas completos, reales y en producción</p>
        <div className="sec-div"></div>

        <section className="featured-projects">
          <h2 className="subsection-title">Proyectos Destacados</h2>
          <div className="projects-grid">
            {featured.map(project => (
              <div key={project.id} className="project-card featured">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <button className="project-link">Detalles →</button>
              </div>
            ))}
          </div>
        </section>

        <section className="other-projects">
          <h2 className="subsection-title">Otros Proyectos</h2>
          <div className="projects-list">
            {others.map(project => (
              <div key={project.id} className="project-item">
                <div className="project-item-header">
                  <h3>{project.name}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag small">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="project-stats">
          <h2 className="subsection-title">Impacto</h2>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-number">8</span>
              <span className="stat-label">Proyectos</span>
            </div>
            <div className="stat">
              <span className="stat-number">6+</span>
              <span className="stat-label">En Producción</span>
            </div>
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Categorías Principales</span>
            </div>
            <div className="stat">
              <span className="stat-number">2</span>
              <span className="stat-label">Publicaciones IEEE</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
