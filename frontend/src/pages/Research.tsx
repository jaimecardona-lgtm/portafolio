import { useEffect } from 'react'
import ResearchHero from '../components/research/ResearchHero'
import CertificationsGallery from '../components/certifications/CertificationsGallery'
import ImageShowcase from '../components/media/ImageShowcase'
import AuthorReviewerBridge from '../components/research/AuthorReviewerBridge'
import ResearchTimeline from '../components/research/ResearchTimeline'
import PublicationArchive from '../components/research/PublicationArchive'
import PaperExplorer from '../components/research/PaperExplorer'
import ResearchLineage from '../components/research/ResearchLineage'
import AiEnvironmentPanel from '../components/research/AiEnvironmentPanel'
import ResearchMethod from '../components/research/ResearchMethod'
import ReviewerConsole from '../components/research/ReviewerConsole'
import EvaluationComparison from '../components/research/EvaluationComparison'
import ResearchEngineeringMatrix from '../components/research/ResearchEngineeringMatrix'
import ResearchJacIa from '../components/research/ResearchJacIa'
import FinalResearchCTA from '../components/research/FinalResearchCTA'
import '../styles/scroll-reveal.css'
import './Research.css'

export default function Research() {
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

  return (
    <div className="page research-page">
      <div className="wrap">
        <section className="scroll-reveal">
          <ResearchHero />
        </section>

        <section className="scroll-reveal">
          <CertificationsGallery />
        </section>

        <section className="scroll-reveal">
          <ImageShowcase
            title="INVESTIGACIÓN APLICADA"
            subtitle="Documentación y presentaciones"
            variant="grid"
            images={[
              {
                id: 'research1',
                src: '/media/research/WhatsApp Image 2026-08-17 at 10.17.26 PM.jpeg',
                alt: 'Investigación 1',
                title: 'IEEE CONCAPAN 2025',
              },
              {
                id: 'research2',
                src: '/media/research/WhatsApp Image 2026-08-17 at 10.17.57 PM.jpeg',
                alt: 'Investigación 2',
                title: 'Publicaciones Académicas',
              },
            ]}
          />
        </section>

        <section className="scroll-reveal">
          <ImageShowcase
            title="ARQUITECTURAS Y DIAGRAMAS"
            subtitle="Infraestructura técnica"
            variant="grid"
            images={[
              {
                id: 'infra1',
                src: '/media/infrastructure/5ac6fa66-5fc5-488e-b75c-68dcd7d6984f.png',
                alt: 'Arquitectura 1',
                title: 'Sistema Distribuido',
              },
              {
                id: 'infra2',
                src: '/media/infrastructure/5f371520-e775-4d59-8a90-da3970398223.png',
                alt: 'Arquitectura 2',
                title: 'Flujo de Datos',
              },
              {
                id: 'infra3',
                src: '/media/infrastructure/883c2eaa-36b3-4b64-9fa6-fd861af5bd14.png',
                alt: 'Arquitectura 3',
                title: 'Microservicios',
              },
              {
                id: 'infra4',
                src: '/media/infrastructure/cb7d16ee-f137-4eea-99b2-7ffa53e73ad3.png',
                alt: 'Arquitectura 4',
                title: 'Componentes',
              },
              {
                id: 'infra5',
                src: '/media/infrastructure/dff3770b-bc83-4373-b82e-4c5fdd2c6b7e.png',
                alt: 'Arquitectura 5',
                title: 'Base de Datos',
              },
              {
                id: 'infra6',
                src: '/media/infrastructure/e1756fb6-879d-4167-831c-b3e370f9d77d.png',
                alt: 'Arquitectura 6',
                title: 'Integración',
              },
            ]}
          />
        </section>

        <section className="scroll-reveal">
          <AuthorReviewerBridge />
        </section>

        <section className="scroll-reveal">
          <ResearchTimeline />
        </section>

        <section className="scroll-reveal">
          <PublicationArchive />
        </section>

        <section className="scroll-reveal">
          <PaperExplorer />
        </section>

        <section className="scroll-reveal">
          <ResearchLineage />
        </section>

        <section className="scroll-reveal">
          <AiEnvironmentPanel />
        </section>

        <section className="scroll-reveal">
          <ResearchMethod />
        </section>

        <section className="scroll-reveal">
          <ReviewerConsole />
        </section>

        <section className="scroll-reveal">
          <EvaluationComparison />
        </section>

        <section className="scroll-reveal">
          <ResearchEngineeringMatrix />
        </section>

        <section className="scroll-reveal">
          <ResearchJacIa />
        </section>

        <section className="scroll-reveal">
          <FinalResearchCTA />
        </section>
      </div>
    </div>
  )
}
