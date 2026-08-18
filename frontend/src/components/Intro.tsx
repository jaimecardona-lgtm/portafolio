import './Intro.css'

export default function Intro() {
  return (
    <section className="intro">
      <div className="intro-container">
        <h2>Welcome to JAC-IA Field OS</h2>
        <p>
          I'm Jaime Cardona, a software engineer and agrotech innovator. This portfolio showcases
          my journey building intelligent systems that bridge technology and agriculture.
        </p>
        <div className="intro-features">
          <div className="feature">
            <div className="feature-icon">🌾</div>
            <h3>Agrotech</h3>
            <p>Building solutions for sustainable agriculture</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💻</div>
            <h3>Software</h3>
            <p>Full-stack development with modern technologies</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🤖</div>
            <h3>AI/ML</h3>
            <p>Intelligent systems powered by JAC-IA</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔍</div>
            <h3>Research</h3>
            <p>Exploring innovation at the intersection of tech and farming</p>
          </div>
        </div>
      </div>
    </section>
  )
}
