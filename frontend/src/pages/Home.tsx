import { useEffect } from 'react'
import '../styles/scroll-reveal.css'
import './Home.css'
import Hero from '../components/Hero'
import StatusStrip from '../components/home/StatusStrip'
import OriginNode from '../components/home/OriginNode'
import WorldGatewayGrid from '../components/home/WorldGatewayGrid'
import FeaturedSystems from '../components/home/FeaturedSystems'
import CareerSignal from '../components/home/CareerSignal'
import ResearchSignal from '../components/home/ResearchSignal'
import HowIBuild from '../components/home/HowIBuild'
import JacIaHomeTerminal from '../components/home/JacIaHomeTerminal'
import FinalHomeCTA from '../components/home/FinalHomeCTA'
import ScrollProgress from '../components/home/ScrollProgress'

export default function Home() {
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

  const handleOpenChat = (question?: string) => {
    window.dispatchEvent(new CustomEvent('openChat', { detail: { question } }))
  }

  return (
    <div className="home">
      <ScrollProgress />

      <section className="scroll-reveal">
        <Hero onOpenChat={() => handleOpenChat()} />
      </section>

      <section className="scroll-reveal">
        <StatusStrip />
      </section>

      <section className="scroll-reveal">
        <OriginNode />
      </section>

      <section className="scroll-reveal">
        <WorldGatewayGrid />
      </section>

      <section className="scroll-reveal">
        <FeaturedSystems />
      </section>

      <section className="scroll-reveal">
        <CareerSignal />
      </section>

      <section className="scroll-reveal">
        <ResearchSignal />
      </section>

      <section className="scroll-reveal">
        <HowIBuild />
      </section>

      <section className="scroll-reveal">
        <JacIaHomeTerminal onOpenChat={handleOpenChat} />
      </section>

      <section className="scroll-reveal">
        <FinalHomeCTA onOpenChat={() => handleOpenChat()} />
      </section>
    </div>
  )
}
