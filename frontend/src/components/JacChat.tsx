import { useState, useRef, useEffect } from 'react'
import './JacChat.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

const SUGGESTED_QUESTIONS = [
  '¿Quién es Jaime Cardona Montero?',
  '¿Qué es Agropilot CM?',
  '¿Qué experiencia tiene con RAG y IA?',
  '¿Qué hizo en RCKT?',
  '¿Cómo mezcla la finca con la IA?',
  '¿Qué publicaciones IEEE tiene?',
  '¿Qué experiencia tiene con arquitectura?',
]

export default function JacChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const payload = {
        message: text,
        session_id: `session-${Date.now()}`,
        history: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        route: window.location.pathname,
        language: 'es',
      }

      console.log('Chat request payload:', payload)

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Chat error response:', errorData)
        const detail = errorData?.detail ?? errorData?.message ?? `Error HTTP ${response.status}`
        throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail))
      }

      const data = await response.json()
      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: data.answer || 'No hay respuesta disponible',
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)

      const fallbackResponses: {[key: string]: string} = {
        'agropilot': 'Agropilot CM es un ecosistema inteligente para gestión agropecuaria que Jaime desarrolló. Integra React frontend, FastAPI backend, modelos ML (regresión, árboles, LSTM, Random Forest), RAG con ChromaDB, y un asistente conversacional con OpenRouter. Maneja producción lechera, silvopastoril, porcicultura, predicción individual y masiva, análisis de costos y alertas de anomalías.',
        'rckt': 'Jaime trabaja en RCKT como AI & Data Engineer. Construye soluciones AI-first: Elite Beauty Agent (WhatsApp + voz), Voz Estratégica (producto digital), arquitecturas de agentes. Es responsable de backend, flujos de datos, RAG, integración de LLMs y decisiones técnicas transversales.',
        'alignerr': 'En Alignerr, Jaime evalúa respuestas de modelos de IA y código. Revisa repositorios, compara soluciones, analiza prompts y transcripts, verifica correctitud y mantenibilidad. Esto lo entrenó en evaluación rigurosa de calidad técnica.',
        'concapan': 'Jaime fue aceptado como TPC Reviewer en CONCAPAN XLIV 2026. El rol requiere revisar entre 3 y 4 trabajos de investigación, declarar conflictos de interés y entregar retroalimentación técnica constructiva. Las revisiones vencen el 13 de septiembre de 2026.',
        'experiencia': 'Jaime tiene experiencia en: DIAN (sistemas públicos), Opportunity Hound (datos e IA), RCKT (AI & Data Engineer), Alignerr (evaluación técnica). Total: contextos diversos desde gobierno hasta startups de IA.',
        'ieee': 'Jaime publicó en IEEE CONCAPAN 2025: "Hybrid AI Architecture for Agricultural Diversification" (DOI 10.1109/CONCAPAN66820.2025.11512437) y "Environmental Dimensions of Artificial Intelligence" (DOI 10.1109/CONCAPAN66820.2025.11512472).',
        'rag': 'RAG: Retrieval Augmented Generation. Jaime lo usa para combinar búsqueda de información (embeddings, vector search) con generación de LLMs. Lo implementó en Agropilot CM (ChromaDB), Elite Beauty Agent (Supabase pgvector), y arquitecturas de agentes conversacionales.',
        'default': 'Soy JAC-IA, la guía inteligente del portafolio de Jaime Andres Cardona Montero. Puedo ayudarte a explorar su trayectoria, proyectos, publicaciones, experiencia profesional, arquitecturas y forma de construir. Pregunta sobre Agropilot, RCKT, Alignerr, IEEE, RAG, o cualquier aspecto técnico.',
      }

      let response = fallbackResponses['default']
      const lowerText = text.toLowerCase()

      for (const [key, value] of Object.entries(fallbackResponses)) {
        if (key !== 'default' && lowerText.includes(key)) {
          response = value
          break
        }
      }

      const fallbackMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  if (!isOpen) {
    return (
      <button
        className="jac-chat-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir JAC-IA"
      >
        <span className="jac-icon">💬</span>
        <span className="jac-label">JAC-IA</span>
      </button>
    )
  }

  return (
    <div className="jac-chat-container">
      <div className="jac-chat-header">
        <h3>JAC-IA</h3>
        <p className="jac-subtitle">Asistente Conversacional</p>
        <button
          className="jac-close"
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar chat"
        >
          ✕
        </button>
      </div>

      <div className="jac-chat-messages">
        {messages.length === 0 ? (
          <div className="jac-welcome">
            <h4>Bienvenido a JAC-IA</h4>
            <p>Soy JAC-IA, guía inteligente del portafolio de Jaime Andres Cardona Montero.</p>
            <p>Puedo responder sobre su trayectoria, proyectos, publicaciones, experiencia y forma de construir.</p>
            <div className="jac-suggested">
              <p className="jac-label-small">Preguntas sugeridas:</p>
              <div className="jac-buttons">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    className="jac-suggested-btn"
                    onClick={() => handleSuggestedQuestion(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`jac-message jac-message-${msg.role}`}>
              <div className="jac-message-content">{msg.content}</div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="jac-message jac-message-assistant">
            <div className="jac-loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="jac-chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Pregunta sobre Jaime..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? '...' : '→'}
        </button>
      </form>
    </div>
  )
}
