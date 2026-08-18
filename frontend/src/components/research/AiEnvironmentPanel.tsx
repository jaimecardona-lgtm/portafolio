import { useState } from 'react'
import { environmentalTopics } from '../../data/research'
import './AiEnvironmentPanel.css'

export default function AiEnvironmentPanel() {
  const [activeTopic, setActiveTopic] = useState<string>('compute')

  const active = environmentalTopics.find(t => t.id === activeTopic)

  return (
    <section className="ai-environment-section">
      <div className="section-header">
        <span className="section-number">06</span>
        <h2 className="section-title">AI BEYOND THE MODEL</h2>
      </div>

      <div className="environment-headline">
        "La inteligencia artificial también tiene costos fuera de la precisión."
      </div>

      <div className="topics-grid">
        {environmentalTopics.map(topic => (
          <button
            key={topic.id}
            className={`topic-card ${topic.id === activeTopic ? 'active' : ''}`}
            onClick={() => setActiveTopic(topic.id)}
          >
            <span className="topic-icon">{topic.icon}</span>
            <span className="topic-name">{topic.name}</span>
          </button>
        ))}
      </div>

      {active && (
        <div className="topic-detail">
          <h3>{active.name}</h3>
          <p>{active.description}</p>
        </div>
      )}
    </section>
  )
}
