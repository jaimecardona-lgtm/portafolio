import { useState } from 'react'
import SmartMedia from '../media/SmartMedia'
import './CompanyGallery.css'

interface CompanyImage {
  id: string
  company: string
  src: string
  alt: string
}

interface Props {
  images?: CompanyImage[]
}

export default function CompanyGallery({ images }: Props) {
  const [current, setCurrent] = useState(0)

  const defaultImages: CompanyImage[] = [
    {
      id: 'dian1',
      company: 'DIAN',
      src: '/media/experience/dian/WhatsApp Image 2026-08-17 at 10.10.31 PM.jpeg',
      alt: 'DIAN Experience',
    },
    {
      id: 'dian2',
      company: 'DIAN',
      src: '/media/experience/dian/WhatsApp Image 2026-08-17 at 9.40.26 PM.jpeg',
      alt: 'DIAN Team',
    },
    {
      id: 'oppyhound',
      company: 'Opportunity Hound',
      src: '/media/experience/oppyhound/WhatsApp Image 2026-08-17 at 9.43.19 PM.jpeg',
      alt: 'Opportunity Hound',
    },
    {
      id: 'rckt',
      company: 'RCKT',
      src: '/media/experience/rckt/rckt.jpeg',
      alt: 'RCKT',
    },
  ]

  const companyImages = images || defaultImages
  const total = companyImages.length

  if (total === 0) return null

  const next = () => setCurrent((current + 1) % total)
  const prev = () => setCurrent((current - 1 + total) % total)

  return (
    <section className="company-gallery">
      <div className="wrap">
        <div className="gallery-header">
          <h2 className="gallery-title">DONDE HE TRABAJADO</h2>
          <p className="gallery-subtitle">Historias de equipos y sistemas en producción</p>
        </div>

        <div className="gallery-viewport">
          <button className="gallery-nav prev" onClick={prev} aria-label="Empresa anterior">
            ←
          </button>

          <div className="image-container">
            {companyImages.map((img, idx) => (
              <div
                key={img.id}
                className={`image-wrapper ${idx === current ? 'active' : ''}`}
                style={{
                  opacity: idx === current ? 1 : 0,
                  pointerEvents: idx === current ? 'auto' : 'none',
                }}
              >
                <SmartMedia
                  src={img.src}
                  alt={img.alt}
                  width={700}
                  height={500}
                  loading="lazy"
                  aspectRatio="7/5"
                  objectFit="contain"
                  mediaType="photo"
                />
                <div className="company-label">{img.company}</div>
              </div>
            ))}
          </div>

          <button className="gallery-nav next" onClick={next} aria-label="Siguiente empresa">
            →
          </button>
        </div>

        <div className="gallery-dots">
          {companyImages.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Ir a ${companyImages[idx].company}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
