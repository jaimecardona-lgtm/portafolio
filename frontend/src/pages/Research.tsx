import { useEffect } from 'react'
import ResearchHero from '../components/research/ResearchHero'
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
