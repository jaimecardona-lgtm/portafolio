import { ReactNode } from 'react'
import { useStickySwap } from '../../hooks/useStickySwap'
import './StickySwapSection.css'

interface StickySwapSectionProps {
  children: ReactNode
  items: Array<{ id: string }>
  activeContent: ReactNode
  onActiveChange?: (id: string) => void
  header?: ReactNode
  className?: string
}

export function StickySwapSection({
  children,
  items,
  activeContent,
  onActiveChange,
  header,
  className = '',
}: StickySwapSectionProps) {
  const { containerRef } = useStickySwap({
    items,
    onActiveChange,
  })

  return (
    <section className={`sticky-swap-section ${className}`} ref={containerRef}>
      {header && (
        <div className="sticky-swap-header">
          {header}
        </div>
      )}

      <div className="sticky-swap-container">
        <div className="sticky-swap-panel">
          {activeContent}
        </div>

        <div className="sticky-swap-triggers">
          {children}
        </div>
      </div>
    </section>
  )
}

export function StickySwapTrigger({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`sticky-swap-trigger ${className}`}
      data-item-id={id}
    >
      {children}
    </div>
  )
}
