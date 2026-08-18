import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useScrollScene, SceneState } from '../../hooks/useScrollScene'
import { SceneVariant, sceneVariants, inactiveSceneStyle, activeSceneStyle } from '../../constants/motionTokens'
import './ScrollScene.css'

interface ScrollSceneProps {
  children: ReactNode
  variant?: SceneVariant
  threshold?: number
  rootMargin?: string
  onStateChange?: (state: SceneState) => void
  id?: string
  className?: string
  style?: React.CSSProperties
}

export function ScrollScene({
  children,
  variant = 'jumpFromLeft',
  threshold = 0.25,
  rootMargin = '-50px',
  onStateChange,
  id,
  className = '',
  style = {},
}: ScrollSceneProps) {
  const { ref, state, isActive } = useScrollScene({
    threshold,
    rootMargin,
    onStateChange,
  })

  const variants = sceneVariants[variant]

  return (
    <motion.div
      ref={ref as any}
      id={id}
      className={`scroll-scene scroll-scene-${state} ${className}`}
      initial="initial"
      animate={isActive ? 'animate' : 'exit'}
      variants={variants}
      transition={variants.transition || { duration: 0.6, ease: 'easeOut' }}
      style={{
        ...(isActive ? activeSceneStyle : inactiveSceneStyle),
        ...style,
      }}
      data-scene-state={state}
    >
      {children}
    </motion.div>
  )
}
