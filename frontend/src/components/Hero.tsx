import { useEffect, useState } from 'react'
import './Hero.css'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'JAIME://FIELD_OS'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{displayText}</h1>
        <p className="hero-subtitle">Agrotech + Software Engineering | JAC-IA Assistant</p>
        <div className="hero-cta">
          <button className="cta-primary">Explore Projects</button>
          <button className="cta-secondary">Get in Touch</button>
        </div>
      </div>
      <div className="hero-scanner">
        <div className="scanner-line"></div>
      </div>
    </section>
  )
}
