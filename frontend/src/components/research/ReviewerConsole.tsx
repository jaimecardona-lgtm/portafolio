import { useState } from 'react'
import { reviewerResponsibilities } from '../../data/research'
import './ReviewerConsole.css'

export default function ReviewerConsole() {
  const [activeStep, setActiveStep] = useState<string>('submission')

  const steps = ['submission', 'conflict', 'review', 'feedback', 'deadline']

  return (
    <section className="reviewer-console-section">
      <div className="section-header">
        <span className="section-number">08</span>
        <h2 className="section-title">TECHNICAL PROGRAM COMMITTEE</h2>
      </div>

      <div className="reviewer-info">
        <h3>TPC REVIEWER — CONCAPAN XLIV 2026</h3>
        <p className="reviewer-subtitle">Technical Program Committee Reviewer</p>
        <div className="reviewer-details">
          <span className="event">IEEE CONCAPAN XLIV 2026 (44th Central America and Panama Convention)</span>
          <span className="status-badge">INVITATION ACCEPTED</span>
          <span className="deadline">Deadline: 13 de septiembre de 2026</span>
        </div>
      </div>

      <div className="console-flow">
        {steps.map((step, idx) => (
          <div key={step}>
            <button
              className={`flow-step ${step === activeStep ? 'active' : ''}`}
              onClick={() => setActiveStep(step)}
            >
              <span className="step-number">{idx + 1}</span>
              <span className="step-label">{step.toUpperCase()}</span>
            </button>
            {idx < steps.length - 1 && <div className="flow-arrow">→</div>}
          </div>
        ))}
      </div>

      <div className="responsibilities-grid">
        {reviewerResponsibilities.map((resp, idx) => (
          <div key={idx} className="responsibility">
            <h4>{resp.label}</h4>
            <p>{resp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
