import { useState } from 'react'

type PatternKey = 'separate' | 'deterministic' | 'context' | 'fallbacks'

const patterns: Record<PatternKey, { title: string; description: string; examples: string[] }> = {
  separate: {
    title: 'SEPARATE RESPONSIBILITIES',
    description: 'Cada componente de la arquitectura tiene una única responsabilidad clara.',
    examples: [
      'InterMuni: MongoDB para operaciones, Supabase para analytics',
      'Elite: Twilio es transport, Backend es inteligencia',
      'Agropilot: React (UI), FastAPI (IA), PostgreSQL (datos)',
    ],
  },
  deterministic: {
    title: 'KEEP DETERMINISTIC RULES DETERMINISTIC',
    description: 'Lo que es negocio crítico nunca lo decide el modelo.',
    examples: [
      'InterMuni: Backend calcula tarifas, no LLM',
      'FacturaOps: Estado de facturación es máquina de estados, no hallucination',
      'Bertolli: Carrito local, datos que controlo, fallback seguro',
    ],
  },
  context: {
    title: 'GIVE AI CONTEXT',
    description: 'IA funciona mejor cuando conoce el sistema completo.',
    examples: [
      'Agropilot: Contexto de finca es crítico para recomendaciones',
      'Elite: Contexto de conversación + lead + histórico',
      'JAC-IA: Contexto autobiográfico del portafolio',
    ],
  },
  fallbacks: {
    title: 'BUILD FALLBACKS',
    description: 'Degradación controlada > fallo abrupto.',
    examples: [
      'Bertolli: Frontend funciona sin backend',
      'Agropilot: Model fallback a reglas simples',
      'Elite: Si LLM falla, backend responde con reglas',
    ],
  },
}

export default function BuildPatterns() {
  const [activePattern, setActivePattern] = useState<PatternKey>('separate')
  const current = patterns[activePattern]

  return (
    <section className="build-patterns">
      <div className="wrap">
        <div className="patterns-header">
          <span className="section-number">04</span>
          <h2 className="section-title">PATTERNS ACROSS SYSTEMS</h2>
        </div>

        <p className="patterns-intro">
          ¿Qué se repite en la forma de trabajar? Cuatro patrones que aparecen en múltiples proyectos.
        </p>

        <div className="patterns-grid">
          <div className="patterns-buttons">
            {(Object.keys(patterns) as PatternKey[]).map(pattern => (
              <button
                key={pattern}
                className={`pattern-btn ${activePattern === pattern ? 'active' : ''}`}
                onClick={() => setActivePattern(pattern)}
              >
                {patterns[pattern].title}
              </button>
            ))}
          </div>

          <div className="pattern-detail">
            <h3>{current.title}</h3>
            <p className="pattern-desc">{current.description}</p>
            <div className="pattern-examples">
              {current.examples.map((example, idx) => (
                <div key={idx} className="example">
                  {example}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
