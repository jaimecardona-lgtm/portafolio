import './Navigation.css'

type Page = 'home' | 'projects' | 'experience' | 'research' | 'blog'

interface NavigationProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const pages: { label: string; value: Page }[] = [
    { label: 'HOME', value: 'home' },
    { label: 'PROJECTS', value: 'projects' },
    { label: 'EXPERIENCE', value: 'experience' },
    { label: 'RESEARCH', value: 'research' },
    { label: 'BLOG', value: 'blog' },
  ]

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">JAC-IA</div>
        <ul className="nav-links">
          {pages.map((page) => (
            <li key={page.value}>
              <button
                className={`nav-link ${currentPage === page.value ? 'active' : ''}`}
                onClick={() => onNavigate(page.value)}
              >
                {page.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
