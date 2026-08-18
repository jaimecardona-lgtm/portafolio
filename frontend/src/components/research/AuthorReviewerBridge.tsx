import './AuthorReviewerBridge.css'

export default function AuthorReviewerBridge() {
  return (
    <section className="author-reviewer-section">
      <div className="section-header">
        <span className="section-number">01</span>
        <h2 className="section-title">FROM AUTHOR TO REVIEWER</h2>
      </div>

      <div className="bridge-container">
        <div className="bridge-stage author-stage">
          <div className="stage-year">2025</div>
          <div className="stage-badge author">AUTHOR</div>
          <h3 className="stage-event">IEEE CONCAPAN XLIII 2025</h3>
          <p className="stage-location">San Salvador, El Salvador</p>
          <p className="stage-detail">2 PUBLICACIONES EN IEEE XPLORE</p>
        </div>

        <div className="bridge-arrow">
          <svg viewBox="0 0 100 20" preserveAspectRatio="none">
            <line x1="0" y1="10" x2="100" y2="10" stroke="currentColor" strokeWidth="2" />
            <polygon points="95,5 100,10 95,15" fill="currentColor" />
          </svg>
        </div>

        <div className="bridge-stage reviewer-stage">
          <div className="stage-year">2026</div>
          <div className="stage-badge reviewer">REVIEWER</div>
          <h3 className="stage-event">IEEE CONCAPAN XLIV 2026</h3>
          <p className="stage-location">44th Central America and Panama Convention</p>
          <p className="stage-detail">INVITATION ACCEPTED</p>
        </div>
      </div>

      <p className="bridge-narrative">
        En 2025 Jaime contribuyó investigación a IEEE. En 2026 fue invitado y aceptó participar en la evaluación de nueva investigación como Technical Program Committee Reviewer.
      </p>
    </section>
  )
}
