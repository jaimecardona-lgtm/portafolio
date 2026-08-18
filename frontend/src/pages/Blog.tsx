import { useState, useEffect } from 'react'
import { blogPosts, thoughtStream, decisionLog, lessonLog, currentQuests, BlogCategory } from '../data/blog'
import '../styles/scroll-reveal.css'
import './Blog.css'

const CATEGORIES: { value: BlogCategory | 'TODAS'; label: string }[] = [
  { value: 'TODAS', label: 'TODAS' },
  { value: 'ARQUITECTURA', label: 'ARQUITECTURA' },
  { value: 'AI', label: 'IA' },
  { value: 'RAG', label: 'RAG' },
  { value: 'DATA', label: 'DATA' },
  { value: 'PRODUCTO', label: 'PRODUCTO' },
  { value: 'AGROTECH', label: 'AGROTECH' },
  { value: 'INFRAESTRUCTURA', label: 'INFRAESTRUCTURA' },
  { value: 'CALIDAD', label: 'CALIDAD' },
  { value: 'INVESTIGACION', label: 'INVESTIGACION' },
  { value: 'LIDERAZGO', label: 'LIDERAZGO' },
]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'TODAS'>('TODAS')
  const [activeThoughtId, setActiveThoughtId] = useState<string | null>(null)
  const [activeDecisionId, setActiveDecisionId] = useState<string>('d1')
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const filteredPosts = blogPosts.filter(post => {
    const matchCategory = activeCategory === 'TODAS' || post.categories.includes(activeCategory)
    const matchSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchCategory && matchSearch
  })

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0]
  const otherPosts = filteredPosts.filter(p => p.id !== featuredPost?.id)

  const handleNavigate = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }))
  }

  const handleOpenChat = (question?: string) => {
    window.dispatchEvent(new CustomEvent('openChat', { detail: question ? { prefill: question } : {} }))
  }

  return (
    <div className="page blog-page">
      <div className="wrap">
        {/* 01 BLOG HERO */}
        <section className="blog-hero-section scroll-reveal">
          <span className="hero-eyebrow">JAIME://FIELD_LOG</span>
          <h1 className="hero-title">BITÁCORA DE CONSTRUCCIÓN</h1>
          <p className="hero-subtitle">
            Los proyectos muestran el resultado.
            Esta bitácora muestra las decisiones,
            errores y preguntas que aparecen antes.
          </p>
          <p className="hero-description">
            IA, arquitectura, datos, producto,
            campo, infraestructura y evaluación técnica
            desde la perspectiva de alguien que construye.
          </p>
          <div className="hero-signals">
            {['ARCHITECTURE', 'AI', 'DATA', 'PRODUCTO', 'FIELD', 'RESEARCH'].map(signal => (
              <span key={signal} className="signal-badge">{signal}</span>
            ))}
          </div>
          <div className="hero-ctas">
            <button className="cta-btn explore" onClick={() => {
              const el = document.getElementById('knowledge-grid')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}>
              EXPLORAR NOTAS
            </button>
            <button className="cta-btn chat" onClick={() => handleOpenChat()}>
              PREGUNTAR A JAC-IA
            </button>
          </div>
        </section>

        {/* 02 THOUGHT STREAM */}
        <section className="thought-stream-section scroll-reveal">
          <div className="section-header">
            <span className="section-number">01</span>
            <h2 className="section-title">THOUGHT STREAM</h2>
          </div>
          <div className="thoughts-container">
            {thoughtStream.map(thought => (
              <button
                key={thought.id}
                className={`thought-card ${activeThoughtId === thought.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveThoughtId(thought.id)
                  if (thought.relatedSlug) {
                    const post = blogPosts.find(p => p.slug === thought.relatedSlug)
                    if (post) {
                      setActiveCategory('TODAS')
                    }
                  }
                }}
              >
                <p>{thought.text}</p>
              </button>
            ))}
          </div>
        </section>

        {/* 03 TOPIC NAVIGATOR */}
        <section className="topic-navigator-section scroll-reveal">
          <div className="section-header">
            <span className="section-number">02</span>
            <h2 className="section-title">CHOOSE A SIGNAL</h2>
          </div>
          <div className="category-filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                className={`filter-btn ${activeCategory === cat.value ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.value)}
                aria-pressed={activeCategory === cat.value}
              >
                {cat.label}
                <span className="count">({filteredPosts.filter(p => cat.value === 'TODAS' || p.categories.includes(cat.value as BlogCategory)).length})</span>
              </button>
            ))}
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="BUSCAR EN FIELD_LOG"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* 04 FEATURED FIELD NOTE */}
        {featuredPost && (
          <section className="featured-note-section scroll-reveal">
            <div className="section-header">
              <span className="section-number">03</span>
              <h2 className="section-title">FEATURED NOTE</h2>
            </div>
            <div className="featured-card">
              <div className="featured-left">
                <span className="featured-number">{String(blogPosts.indexOf(featuredPost) + 1).padStart(3, '0')}</span>
                <span className="featured-type">{featuredPost.type}</span>
                <h3 className="featured-title">{featuredPost.title}</h3>
                <p className="featured-thesis">{featuredPost.thesis}</p>
                <button className="open-note-btn" onClick={() => handleOpenChat(featuredPost.suggestedQuestion)}>
                  ABRIR NOTA
                </button>
              </div>
              <div className="featured-right">
                <div className="rag-flow">
                  {['OBSERVACIÓN', 'PREGUNTA', 'ARQUITECTURA', 'CONSTRUCCIÓN', 'FALLO', 'APRENDIZAJE', 'DOCUMENTACIÓN'].map((step, idx) => (
                    <div key={step} className="flow-item">
                      <div className="flow-icon">{idx + 1}</div>
                      <div className="flow-text">{step}</div>
                      {idx < 6 && <div className="flow-arrow">↓</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 05 KNOWLEDGE GRID */}
        <section className="knowledge-grid-section scroll-reveal" id="knowledge-grid">
          <div className="section-header">
            <span className="section-number">04</span>
            <h2 className="section-title">FIELD NOTES</h2>
          </div>
          <div className="notes-grid">
            {otherPosts.map((post, idx) => (
              <button
                key={post.id}
                className={`note-card ${idx % 3 === 0 ? 'large' : 'medium'}`}
                onClick={() => handleOpenChat(post.suggestedQuestion)}
              >
                <div className="note-header">
                  <span className="note-id">FIELD_NOTE_{String(blogPosts.indexOf(post) + 1).padStart(3, '0')}</span>
                  <span className="note-type">{post.type}</span>
                </div>
                <h3 className="note-title">{post.title}</h3>
                <p className="note-thesis">{post.thesis}</p>
                <div className="note-meta">
                  <div className="note-tags">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="note-tag">{tag}</span>
                    ))}
                  </div>
                  {post.relatedProjects.length > 0 && (
                    <div className="note-projects">
                      {post.relatedProjects.slice(0, 1).map(proj => (
                        <span key={proj} className="project-ref">{proj}</span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 06 DECISION LOG */}
        <section className="decision-log-section scroll-reveal">
          <div className="section-header">
            <span className="section-number">05</span>
            <h2 className="section-title">DECISION LOG</h2>
          </div>
          <div className="decision-selector">
            {decisionLog.map(dec => (
              <button
                key={dec.id}
                className={`decision-btn ${activeDecisionId === dec.id ? 'active' : ''}`}
                onClick={() => setActiveDecisionId(dec.id)}
              >
                {dec.title}
              </button>
            ))}
          </div>
          {decisionLog.find(d => d.id === activeDecisionId) && (
            <div className="decision-panel">
              <div className="decision-row">
                <div className="decision-cell">
                  <h4>CONTEXTO</h4>
                  <p>{decisionLog.find(d => d.id === activeDecisionId)!.context}</p>
                </div>
                <div className="decision-cell">
                  <h4>DECISIÓN</h4>
                  <p className="decision-highlight">{decisionLog.find(d => d.id === activeDecisionId)!.decision}</p>
                </div>
              </div>
              <div className="decision-row">
                <div className="decision-cell">
                  <h4>POR QUÉ</h4>
                  <p>{decisionLog.find(d => d.id === activeDecisionId)!.why}</p>
                </div>
                <div className="decision-cell">
                  <h4>TRADE-OFF</h4>
                  <p>{decisionLog.find(d => d.id === activeDecisionId)!.tradeoff}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 07 LESSON LOG */}
        <section className="lesson-log-section scroll-reveal">
          <div className="section-header">
            <span className="section-number">06</span>
            <h2 className="section-title">LESSONS FROM THINGS THAT BREAK</h2>
          </div>
          <div className="lessons-grid">
            {lessonLog.map(lesson => (
              <button
                key={lesson.id}
                className={`lesson-card ${activeLessonId === lesson.id ? 'active' : ''}`}
                onClick={() => setActiveLessonId(activeLessonId === lesson.id ? null : lesson.id)}
              >
                <h4>{lesson.title}</h4>
                {activeLessonId === lesson.id && (
                  <div className="lesson-content">
                    <div className="lesson-item"><strong>SYMPTOM:</strong> {lesson.symptom}</div>
                    <div className="lesson-item"><strong>CAUSE:</strong> {lesson.cause}</div>
                    <div className="lesson-item"><strong>FIX:</strong> {lesson.fix}</div>
                    <div className="lesson-item"><strong>LESSON:</strong> {lesson.lesson}</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* 08 CURRENTLY EXPLORING */}
        <section className="quests-section scroll-reveal">
          <div className="section-header">
            <span className="section-number">07</span>
            <h2 className="section-title">CURRENT QUESTS</h2>
          </div>
          <div className="quests-grid">
            {currentQuests.map(quest => (
              <div key={quest.id} className={`quest-card quest-${quest.status.toLowerCase()}`}>
                <span className="quest-status">{quest.status}</span>
                <h3>{quest.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 09 ASK JAC-IA */}
        <section className="blog-jacia-section scroll-reveal">
          <div className="section-header">
            <span className="section-number">08</span>
            <h2 className="section-title">ASK ABOUT THE THINKING</h2>
          </div>
          <p className="jacia-intro">Si quieres entender una decisión sin leer toda la nota, pregúntale al portafolio.</p>
          <div className="jacia-questions">
            {blogPosts.slice(0, 6).map((post) => (
              <button
                key={post.id}
                className="jacia-btn"
                onClick={() => handleOpenChat(post.suggestedQuestion)}
              >
                <span className="q-icon">?</span>
                <span className="q-text">{post.suggestedQuestion}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 10 FINAL CTA */}
        <section className="blog-final-cta scroll-reveal">
          <h2 className="cta-headline">EL CÓDIGO CAMBIA. LOS PRINCIPIOS VIAJAN ENTRE PROYECTOS.</h2>
          <p className="cta-text">Esta bitácora existe para documentar las decisiones que sigo reutilizando, cuestionando y mejorando.</p>
          <div className="cta-buttons">
            <button className="cta-btn projects" onClick={() => handleNavigate('proyectos')}>VER PROYECTOS</button>
            <button className="cta-btn experience" onClick={() => handleNavigate('experiencia')}>VER EXPERIENCIA</button>
            <button className="cta-btn chat" onClick={() => handleOpenChat()}>PREGUNTAR A JAC-IA</button>
          </div>
        </section>
      </div>
    </div>
  )
}
