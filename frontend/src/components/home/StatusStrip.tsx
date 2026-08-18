import { statusStrips } from '../../data/home'
import './StatusStrip.css'

export default function StatusStrip() {
  return (
    <section className="status-strip">
      <div className="status-content">
        {statusStrips.map((item, idx) => (
          <div key={idx} className={`status-item ${item.highlight ? 'highlight' : ''}`}>
            {item.label}
            {idx < statusStrips.length - 1 && <span className="separator">|</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
