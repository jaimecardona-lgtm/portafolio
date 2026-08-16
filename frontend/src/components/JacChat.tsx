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
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      if (!response.ok) throw new Error('Chat error')

      const data = await response.json()
      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const fallbackMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'Lo siento, en este momento no puedo procesar tu pregunta. Intenta de nuevo más tarde.',
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
            <h4>Bienvenido</h4>
            <p>Soy JAC-IA, el asistente conversacional de Jaime Cardona.</p>
            <p>Puedo responder sobre su vida, proyectos, experiencia y visión.</p>
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
