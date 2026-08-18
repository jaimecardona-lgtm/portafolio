import './TeamOperatingSystem.css'

interface Behavior {
  id: string
  name: string
  description: string
}

interface Props {
  behaviors: Behavior[]
}

export default function TeamOperatingSystem({ behaviors }: Props) {
  return (
    <section className="team-os-section">
      <div className="section-header">
        <span className="section-number">05</span>
        <h2 className="section-title">HOW I WORK WITH TEAMS</h2>
      </div>

      <p className="section-description">
        Seis patrones que definen mi forma de colaborar y aportar valor en equipos.
      </p>

      <div className="behaviors-grid">
        {behaviors.map((behavior, idx) => (
          <div key={behavior.id} className="behavior-card">
            <div className="behavior-counter">{String(idx + 1).padStart(2, '0')}</div>
            <h3 className="behavior-name">{behavior.name}</h3>
            <p className="behavior-description">{behavior.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
