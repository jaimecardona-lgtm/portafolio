import './Home.css'
import Hero from '../components/Hero'
import Intro from '../components/Intro'

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Intro />

      <section className="story-preview">
        <div className="wrap">
          <h2 className="sec-title">Narrativa</h2>
          <p className="sec-subtitle">De la finca al sistema</p>
          <div className="sec-div"></div>

          <div className="story-grid">
            <article className="story-card">
              <span className="card-number">01</span>
              <h3>La Raíz</h3>
              <p>
                Antes de construir sistemas digitales, aprendí a observar sistemas vivos en la finca.
                Ciclos reales, decisiones con consecuencias, datos fragmentados que podían convertirse en información.
              </p>
              <span className="card-label">Campo</span>
            </article>

            <article className="story-card">
              <span className="card-number">02</span>
              <h3>Ingeniería de Sistemas</h3>
              <p>
                En la Universidad de San Buenaventura Cali aprendí a formalizar esa observación.
                Arquitectura, seguridad, redes, bases de datos. El lenguaje para convertir problemas en soluciones.
              </p>
              <span className="card-label">Formación</span>
            </article>

            <article className="story-card">
              <span className="card-number">03</span>
              <h3>Práctica Real</h3>
              <p>
                En DIAN construí sistemas públicos con datos reales. En Opportunity Hound trabajé a escala con datos e IA.
                Cada experiencia fue un laboratorio diferente.
              </p>
              <span className="card-label">Experiencia</span>
            </article>

            <article className="story-card">
              <span className="card-number">04</span>
              <h3>Agropilot CM</h3>
              <p>
                El ecosistema inteligente que conecta todo: el campo, los datos, los modelos, la IA.
                Donde la finca se convierte en sistema y el análisis genera decisiones mejores.
              </p>
              <span className="card-label">Proyecto</span>
            </article>

            <article className="story-card">
              <span className="card-number">05</span>
              <h3>Agentes y Automatización</h3>
              <p>
                Elite Beauty Agent, sistemas que hablan por WhatsApp y voz, autónomos pero responsables.
                IA que actúa, pero el backend controla y el usuario entiende.
              </p>
              <span className="card-label">Innovación</span>
            </article>

            <article className="story-card">
              <span className="card-number">06</span>
              <h3>Investigación</h3>
              <p>
                Publicaciones en IEEE CONCAPAN 2025 sobre arquitecturas híbridas de IA para agricultura
                y dimensiones ambientales de la inteligencia artificial. Ciencia sobre práctica.
              </p>
              <span className="card-label">Contribución</span>
            </article>
          </div>
        </div>
      </section>

      <section className="quick-facts">
        <div className="wrap">
          <h2 className="sec-title">Datos Clave</h2>
          <div className="sec-div"></div>

          <div className="facts-grid">
            <div className="fact">
              <span className="fact-value">6+</span>
              <span className="fact-label">Proyectos en Producción</span>
            </div>
            <div className="fact">
              <span className="fact-value">4</span>
              <span className="fact-label">Años Construyendo</span>
            </div>
            <div className="fact">
              <span className="fact-value">2</span>
              <span className="fact-label">Publicaciones IEEE</span>
            </div>
            <div className="fact">
              <span className="fact-value">∞</span>
              <span className="fact-label">Curiosidad</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="wrap">
          <div className="cta-card">
            <h3>¿Quieres conocer más?</h3>
            <p>Explora mi historia completa, proyectos reales, experiencia profesional y pregunta a JAC-IA.</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">Explorar Historia</button>
              <button className="cta-btn secondary">Ver Proyectos</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
