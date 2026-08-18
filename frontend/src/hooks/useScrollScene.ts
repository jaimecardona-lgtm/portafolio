import { useRef, useEffect, useState } from 'react'

export type SceneState = 'before' | 'entering' | 'active' | 'leaving' | 'after'

interface UseScrollSceneOptions {
  threshold?: number
  rootMargin?: string
  onStateChange?: (state: SceneState) => void
}

export function useScrollScene(options: UseScrollSceneOptions = {}) {
  const {
    threshold = 0.25,
    rootMargin = '-50px',
    onStateChange,
  } = options

  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<SceneState>('before')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const rect = entry.boundingClientRect
        let newState: SceneState

        if (!entry.isIntersecting) {
          newState = rect.top > 0 ? 'before' : 'after'
        } else {
          const viewportCenter = window.innerHeight / 2
          const elementCenter = rect.top + rect.height / 2
          const distanceFromCenter = Math.abs(elementCenter - viewportCenter)
          const maxDistance = window.innerHeight / 2

          if (distanceFromCenter < maxDistance * 0.2) {
            newState = 'active'
          } else if (rect.top < viewportCenter) {
            newState = 'entering'
          } else {
            newState = 'leaving'
          }
        }

        setState(newState)
        onStateChange?.(newState)

        const progress = Math.max(0, Math.min(1,
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        ))
        setProgress(progress)
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, onStateChange])

  return {
    ref,
    state,
    progress,
    isActive: state === 'active',
    isEntering: state === 'entering',
    isLeaving: state === 'leaving',
    isBefore: state === 'before',
    isAfter: state === 'after',
  }
}
