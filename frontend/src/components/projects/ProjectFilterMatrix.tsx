import { ProjectCategory, categoryLabels, projects } from '../../data/projects'

type FilterKey = 'all' | ProjectCategory

interface Props {
  active: FilterKey
  onFilterChange: (filter: FilterKey) => void
}

export default function ProjectFilterMatrix({ active, onFilterChange }: Props) {
  const allCategories: FilterKey[] = ['all', 'ai', 'full-stack', 'backend', 'data', 'rag', 'mobile', 'research', 'professional', 'personal', 'academic']

  const getCount = (filter: FilterKey): number => {
    if (filter === 'all') return projects.length
    return projects.filter(p => p.categories.includes(filter)).length
  }

  return (
    <section className="projects-filter-matrix">
      <div className="wrap">
        <div className="filter-header">
          <span className="section-number">01</span>
          <h2 className="section-title">SELECT SIGNAL</h2>
        </div>

        <div className="filter-buttons">
          {allCategories.map(category => (
            <button
              key={category}
              className={`filter-btn ${active === category ? 'active' : ''}`}
              onClick={() => onFilterChange(category)}
              aria-pressed={active === category}
            >
              {category === 'all' ? 'TODOS' : categoryLabels[category as ProjectCategory]}
              <span className="count">({getCount(category)})</span>
            </button>
          ))}
        </div>

        <div className="filter-status">
          {getCount(active)} SYSTEMS MATCHING
        </div>
      </div>
    </section>
  )
}
