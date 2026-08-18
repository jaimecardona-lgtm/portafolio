import { useState } from 'react'
import SmartMedia from '../media/SmartMedia'
import './CertificationsGallery.css'

interface Certification {
  id: string
  src: string
  alt: string
  title: string
  issuer?: string
}

interface Props {
  certifications?: Certification[]
}

export default function CertificationsGallery({ certifications }: Props) {
  const [current, setCurrent] = useState(0)

  const defaultCerts: Certification[] = [
    {
      id: 'aws1',
      src: '/media/certifications/aws1.jpg',
      alt: 'AWS Certification 1',
      title: 'AWS Cloud',
      issuer: 'Amazon Web Services',
    },
    {
      id: 'aws2',
      src: '/media/certifications/aws2.jpg',
      alt: 'AWS Certification 2',
      title: 'AWS Solutions',
      issuer: 'Amazon Web Services',
    },
    {
      id: 'oracle',
      src: '/media/certifications/oracle.jpeg',
      alt: 'Oracle Certification',
      title: 'Oracle Database',
      issuer: 'Oracle',
    },
    {
      id: 'oracle1',
      src: '/media/certifications/oracle1.jpeg',
      alt: 'Oracle Certification 1',
      title: 'Oracle Cloud',
      issuer: 'Oracle',
    },
    {
      id: 'cisco',
      src: '/media/certifications/cisco.jpg',
      alt: 'Cisco Certification',
      title: 'Cisco Networking',
      issuer: 'Cisco',
    },
    {
      id: 'scrum',
      src: '/media/certifications/scrum certif pro.jpg',
      alt: 'Scrum Certification',
      title: 'Scrum Master',
      issuer: 'Scrum Alliance',
    },
  ]

  const certs = certifications || defaultCerts
  const total = certs.length

  if (total === 0) return null

  const next = () => setCurrent((current + 1) % total)
  const prev = () => setCurrent((current - 1 + total) % total)

  return (
    <section className="certifications-gallery">
      <div className="wrap">
        <div className="gallery-header">
          <span className="section-number">Certificaciones</span>
          <h2 className="gallery-title">CREDENCIALES Y ACREDITACIONES</h2>
        </div>

        <div className="gallery-container">
          <button className="gallery-nav prev" onClick={prev} aria-label="Certificación anterior">
            ←
          </button>

          <div className="gallery-viewport">
            <div className="gallery-slides">
              {certs.map((cert, idx) => (
                <div
                  key={cert.id}
                  className={`gallery-slide ${idx === current ? 'active' : ''}`}
                  style={{
                    opacity: idx === current ? 1 : 0,
                    pointerEvents: idx === current ? 'auto' : 'none',
                  }}
                >
                  <div className="slide-image">
                    <SmartMedia
                      src={cert.src}
                      alt={cert.alt}
                      width={600}
                      height={400}
                      loading="lazy"
                      aspectRatio="3/2"
                      objectFit="contain"
                      mediaType="credential"
                    />
                  </div>
                  <div className="slide-info">
                    <h3>{cert.title}</h3>
                    {cert.issuer && <p className="issuer">{cert.issuer}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="gallery-nav next" onClick={next} aria-label="Siguiente certificación">
            →
          </button>
        </div>

        <div className="gallery-indicators">
          <div className="indicator-count">
            {current + 1} / {total}
          </div>
          <div className="indicator-dots">
            {certs.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${idx === current ? 'active' : ''}`}
                onClick={() => setCurrent(idx)}
                aria-label={`Ir a certificación ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
