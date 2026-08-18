import { useState, useEffect } from 'react'
import {
  careerStages,
  dianuSystems,
  opportunityHoundTabs,
  rcktSystems,
  evaluationCriteria,
  teamBehaviors,
  careerEvolutionStages,
  experienceQuestions,
} from '../data/experience'
import ExperienceHero from '../components/experience/ExperienceHero'
import CompanyGallery from '../components/experience/CompanyGallery'
import ImageShowcase from '../components/media/ImageShowcase'
import CareerTimeline from '../components/experience/CareerTimeline'
import MissionDossier from '../components/experience/MissionDossier'
import EngineeringInReality from '../components/experience/EngineeringInReality'
import TechnicalJudgment from '../components/experience/TechnicalJudgment'
import TeamOperatingSystem from '../components/experience/TeamOperatingSystem'
import CareerEvolution from '../components/experience/CareerEvolution'
import ExperienceJacIa from '../components/experience/ExperienceJacIa'
import FinalExperienceCTA from '../components/experience/FinalExperienceCTA'
import '../styles/scroll-reveal.css'
import './Experience.css'

export default function Experience() {
  const [activeMissionId, setActiveMissionId] = useState<string>('dian')

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

  const activeMission = careerStages.find(stage => stage.id === activeMissionId)

  const handleNavigate = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }))
  }

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('openChat', {}))
  }

  return (
    <div className="page experience-page">
      <div className="wrap">
        <section className="scroll-reveal">
          <ExperienceHero />
        </section>

        <section className="scroll-reveal">
          <CompanyGallery />
        </section>

        <section className="scroll-reveal">
          <ImageShowcase
            title="FORMACIÓN ACADÉMICA"
            subtitle="Universidad de San Buenaventura Cali"
            variant="carousel"
            images={[
              {
                id: 'education1',
                src: '/media/education/clase.jpg',
                alt: 'Educación 1',
                title: 'Ingeniería de Sistemas',
                description: 'Cimentación técnica en arquitectura, algoritmos y principios de sistemas',
              },
              {
                id: 'education2',
                src: '/media/education/WhatsApp Image 2026-08-17 at 9.40.26 PM.jpeg',
                alt: 'Educación 2',
                title: 'Aprendizaje Continuo',
                description: 'Formación permanente en nuevas tecnologías y metodologías',
              },
            ]}
          />
        </section>

        <section className="scroll-reveal">
          <CareerTimeline
            stages={careerStages}
            activeId={activeMissionId}
            onSelectMission={setActiveMissionId}
          />
        </section>

        {activeMission && (
          <section className="scroll-reveal">
            <MissionDossier
              mission={activeMission}
              dianSystems={activeMission.id === 'dian' ? dianuSystems : undefined}
              oppyTabs={activeMission.id === 'oppyhound' ? opportunityHoundTabs : undefined}
              rcktSystems={activeMission.id === 'rckt' ? rcktSystems : undefined}
              evaluationCriteria={activeMission.id === 'alignerr' ? evaluationCriteria : undefined}
            />
          </section>
        )}

        <section className="scroll-reveal">
          <EngineeringInReality />
        </section>

        <section className="scroll-reveal">
          <TechnicalJudgment
            dianSystems={dianuSystems}
            rcktSystems={rcktSystems}
            evaluationCriteria={evaluationCriteria}
          />
        </section>

        <section className="scroll-reveal">
          <TeamOperatingSystem behaviors={teamBehaviors} />
        </section>

        <section className="scroll-reveal">
          <CareerEvolution stages={careerEvolutionStages} />
        </section>

        <section className="scroll-reveal">
          <ExperienceJacIa
            questions={experienceQuestions}
            onOpenChat={handleOpenChat}
          />
        </section>

        <section className="scroll-reveal">
          <FinalExperienceCTA
            onNavigateProjects={() => handleNavigate('proyectos')}
            onNavigateResearch={() => handleNavigate('investigacion')}
            onOpenChat={handleOpenChat}
          />
        </section>
      </div>
    </div>
  )
}
