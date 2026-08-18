import { useState } from 'react'
import SmartMedia from '../media/SmartMedia'
import './HackathonsGallery.css'

interface HackathonImage {
  id: string
  src: string
  alt: string
  title?: string
}

interface Props {
  images?: HackathonImage[]
}

export default function HackathonsGallery({ images }: Props) {
  const [current, setCurrent] = useState(0)

  const defaultImages: HackathonImage[] = [
    {
      id: 'hackathon1',
      src: '/media/hackathons/WhatsApp Image 2026-08-17 at 9.40.25 PM.jpeg',
      alt: 'Hackathon 1',
      title: 'Innovación Colaborativa',
    },
    {
      id: 'hackathon2',
      src: '/media/hackathons/WhatsApp Image 2026-08-17 at 9.40.26 PM.jpeg',
      alt: 'Hackathon 2',
      title: 'Soluciones Rápidas',
    },
  ]

  const hackImages = images || defaultImages
  const total = hackImages.length

  if (total === 0) return null

  const next = () => setCurrent((current + 1) % total)
  const prev = () => setCurrent((current - 1 + total) % total)

  return (
    <section className="hackathons-gallery">
      <div className="wrap">
        <div className="gallery-header">
          <h2 className="gallery-title">HACKATHONS Y COMPETENCIAS</h2>
          <p className="gallery-subtitle">Construcción acelerada de soluciones</p>
        </div>

        <div className="gallery-container">
          <button className="gallery-nav prev" onClick={prev} aria-label="Imagen anterior">
            ←
          </button>

          <div className="images-grid">
            {hackImages.map((img, idx) => (
              <div
                key={img.id}
                className={`image-card ${idx === current ? 'active' : ''}`}
                onClick={() => setCurrent(idx)}
                style={{
                  opacity: idx === current ? 1 : 0.5,
                  transform: idx === current ? 'scale(1.05)' : 'scale(0.95)',
                }}
              >
                <SmartMedia
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={300}
                  loading="lazy"
                  aspectRatio="1/1"
                  objectFit="contain"
                  mediaType="photo"
                />
                {img.title && <div className="image-title">{img.title}</div>}
              </div>
            ))}
          </div>

          <button className="gallery-nav next" onClick={next} aria-label="Siguiente imagen">
            →
          </button>
        </div>
      </div>
    </section>
  )
}
