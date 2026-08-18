import { useState } from 'react'
import './ProjectCarousel.css'

interface ProjectSlide {
  id: string
  title: string
  description: string
  icon: string
}

const slides: ProjectSlide[] = [
  {
    id: 'agropilot-1',
    title: 'Frontend React + Vite',
    description: 'Interfaz intuitiva para granjeros. Dashboards, gráficos con Recharts, real-time updates con Supabase.',
    icon: '⚛️',
  },
  {
    id: 'agropilot-2',
    title: 'Backend FastAPI + Node.js',
    description: 'APIs REST, autenticación JWT, servicios desacoplados, escalabilidad desde el diseño.',
    icon: '🚀',
  },
  {
    id: 'agropilot-3',
    title: 'IA & ML Models',
    description: 'Regresión, Árboles de Decisión, LSTM, Random Forest, AdaBoost. Predicción individual y masiva.',
    icon: '🤖',
  },
  {
    id: 'agropilot-4',
    title: 'RAG + Conversación',
    description: 'ChromaDB embeddings, asistente inteligente con OpenRouter, router de modelos con fallback.',
    icon: '💬',
  },
  {
    id: 'agropilot-5',
    title: 'Multi-Tenant Architecture',
    description: 'Cada finca es un tenant independiente. RLS en PostgreSQL, aislamiento lógico por farm_id.',
    icon: '🏗️',
  },
  {
    id: 'agropilot-6',
    title: 'Producción & Escalabilidad',
    description: 'Supabase + PostgreSQL, Docker, Render deployment, CI/CD pipelines, monitoreo.',
    icon: '📊',
  },
]

export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % slides.length)
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length)

  return (
    <div className="project-carousel">
      <div className="carousel-container">
        <button className="carousel-nav prev" onClick={prev} aria-label="Previous">
          ←
        </button>

        <div className="carousel-track">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide ${index === current ? 'active' : ''}`}
              style={{
                transform: `translateX(${(index - current) * 100}%)`,
              }}
            >
              <div className="slide-content">
                <div className="slide-icon">{slide.icon}</div>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-nav next" onClick={next} aria-label="Next">
          →
        </button>
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="carousel-counter">
        {current + 1} / {slides.length}
      </div>
    </div>
  )
}
