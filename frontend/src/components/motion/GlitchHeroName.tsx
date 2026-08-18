import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './GlitchHeroName.css'

interface GlitchHeroNameProps {
  name: string
  subtitle?: string
}

export function GlitchHeroName({ name, subtitle }: GlitchHeroNameProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const letters = name.split('')

  // Variantes para el efecto de vidrio roto
  const glitchVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  // Cada letra tiene su propia animación caótica
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: Math.random() * 200 - 100,
      x: Math.random() * 200 - 100,
      rotate: Math.random() * 360,
      scale: 0.3,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: 'spring',
        bounce: 0.6,
        duration: 0.8,
      },
    },
  }

  return (
    <div className="glitch-hero-container">
      {/* Efecto de vidrio roto de fondo */}
      {isVisible && (
        <svg className="glitch-glass-effect" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <defs>
            <filter id="glitch-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
              <feDisplacementMap in="SourceGraphic" scale="15" />
            </filter>
          </defs>

          {/* Líneas de vidrio roto */}
          <motion.line
            x1="20%"
            y1="10%"
            x2="80%"
            y2="90%"
            stroke="#38ff14"
            strokeWidth="2"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.6, pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          <motion.line
            x1="10%"
            y1="80%"
            x2="90%"
            y2="20%"
            stroke="#00d9ff"
            strokeWidth="2"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.4, pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.line
            x1="50%"
            y1="5%"
            x2="50%"
            y2="95%"
            stroke="#9370DB"
            strokeWidth="1.5"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.5, pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />

          {/* Fragmentos de vidrio */}
          <motion.polygon
            points="100,50 150,80 120,120"
            fill="none"
            stroke="#38ff14"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <motion.polygon
            points="800,150 850,180 820,220"
            fill="none"
            stroke="#00d9ff"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </svg>
      )}

      {/* Nombre con efecto glitch */}
      <motion.div
        className="glitch-name"
        variants={glitchVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {letters.map((letter, idx) => (
          <motion.span
            key={`${letter}-${idx}`}
            className="glitch-letter"
            variants={letterVariants}
            style={{
              display: 'inline-block',
              perspective: '1000px',
            }}
          >
            {letter === ' ' ? ' ' : letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtitle con fade in elegante */}
      {subtitle && (
        <motion.div
          className="glitch-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {subtitle}
        </motion.div>
      )}

      {/* Efecto de "energía" después de reorganización */}
      {isVisible && (
        <motion.div
          className="glitch-energy-burst"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
      )}
    </div>
  )
}
