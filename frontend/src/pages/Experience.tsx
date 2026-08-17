import { useState } from 'react'
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
import CareerTimeline from '../components/experience/CareerTimeline'
import MissionDossier from '../components/experience/MissionDossier'
import EngineeringInReality from '../components/experience/EngineeringInReality'
import TechnicalJudgment from '../components/experience/TechnicalJudgment'
import TeamOperatingSystem from '../components/experience/TeamOperatingSystem'
import CareerEvolution from '../components/experience/CareerEvolution'
import ExperienceJacIa from '../components/experience/ExperienceJacIa'
import FinalExperienceCTA from '../components/experience/FinalExperienceCTA'
import './Experience.css'

export default function Experience() {
  const [activeMissionId, setActiveMissionId] = useState<string>('dian')

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
        <ExperienceHero />

        <CareerTimeline
          stages={careerStages}
          activeId={activeMissionId}
          onSelectMission={setActiveMissionId}
        />

        {activeMission && (
          <MissionDossier
            mission={activeMission}
            dianSystems={activeMission.id === 'dian' ? dianuSystems : undefined}
            oppyTabs={activeMission.id === 'oppyhound' ? opportunityHoundTabs : undefined}
            rcktSystems={activeMission.id === 'rckt' ? rcktSystems : undefined}
            evaluationCriteria={activeMission.id === 'alignerr' ? evaluationCriteria : undefined}
          />
        )}

        <EngineeringInReality />

        <TechnicalJudgment
          dianSystems={dianuSystems}
          rcktSystems={rcktSystems}
          evaluationCriteria={evaluationCriteria}
        />

        <TeamOperatingSystem behaviors={teamBehaviors} />

        <CareerEvolution stages={careerEvolutionStages} />

        <ExperienceJacIa
          questions={experienceQuestions}
          onOpenChat={handleOpenChat}
        />

        <FinalExperienceCTA
          onNavigateProjects={() => handleNavigate('proyectos')}
          onNavigateResearch={() => handleNavigate('investigacion')}
          onOpenChat={handleOpenChat}
        />
      </div>
    </div>
  )
}
