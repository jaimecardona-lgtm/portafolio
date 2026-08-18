import { useState } from 'react'
import './Navigation.css'

type Page = 'home' | 'projects' | 'experience' | 'research' | 'blog'

interface NavigationProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [hoveredLink, setHoveredLink] = useState<Page | null>(null)

  const pages: { label: string; value: Page; icon?: string }[] = [
    { label: 'HOME', value: 'home', icon: '⌂' },
    { label: 'PROJECTS', value: 'projects', icon: '◆' },
    { label: 'EXPERIENCE', value: 'experience', icon: '◇' },
    { label: 'RESEARCH', value: 'research', icon: '◈' },
    { label: 'BLOG', value: 'blog', icon: '◉' },
  ]

  const handleNavigate = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <button
          className="nav-logo"
          onClick={() => handleNavigate('home')}
          title="Back to home"
        >
          JAC-IA
        </button>
        <ul className="nav-links">
          {pages.map((page) => (
            <li key={page.value}>
              <button
                className={`nav-link ${currentPage === page.value ? 'active' : ''}`}
                onClick={() => handleNavigate(page.value)}
                onMouseEnter={() => setHoveredLink(page.value)}
                onMouseLeave={() => setHoveredLink(null)}
                aria-current={currentPage === page.value ? 'page' : undefined}
                title={`Navigate to ${page.label}`}
              >
                {hoveredLink === page.value && page.icon && (
                  <span style={{ marginRight: '0.4rem', display: 'inline-block' }}>
                    {page.icon}
                  </span>
                )}
                {page.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
