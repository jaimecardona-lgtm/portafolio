import { useRef, useEffect, useState } from 'react'

interface UseStickySwapOptions {
  items: Array<{ id: string }>
  onActiveChange?: (id: string) => void
}

export function useStickySwap({ items, onActiveChange }: UseStickySwapOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '')
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map())

  const registerTrigger = (id: string, element: HTMLElement | null) => {
    if (element) {
      triggerRefs.current.set(id, element)
    } else {
      triggerRefs.current.delete(id)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter(e => e.isIntersecting)

      if (visibleEntries.length > 0) {
        const topmost = visibleEntries.reduce((prev, current) =>
          current.boundingClientRect.top < prev.boundingClientRect.top
            ? current
            : prev
        )

        const id = topmost.target.getAttribute('data-item-id')
        if (id && id !== activeId) {
          setActiveId(id)
          onActiveChange?.(id)
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
      rootMargin: '-100px 0px -50% 0px',
    })

    triggerRefs.current.forEach(element => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [activeId, onActiveChange])

  const setActive = (id: string) => {
    setActiveId(id)
    onActiveChange?.(id)
  }

  return {
    containerRef,
    activeId,
    setActive,
    registerTrigger,
  }
}
