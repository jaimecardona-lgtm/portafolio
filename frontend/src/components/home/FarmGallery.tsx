import { useState } from 'react'
import SmartMedia from '../media/SmartMedia'
import './FarmGallery.css'

interface FarmImage {
  id: string
  src: string
  alt: string
  caption?: string
}

interface Props {
  images?: FarmImage[]
}

export default function FarmGallery({ images }: Props) {
  const [current, setCurrent] = useState(0)

  const defaultImages: FarmImage[] = [
    {
      id: 'finca1',
      src: '/media/farm/finca.jpeg',
      alt: 'Finca - Vista General',
      caption: 'La finca como laboratorio',
    },
    {
      id: 'finca2',
      src: '/media/farm/finca2.jpeg',
      alt: 'Finca - Producción',
      caption: 'Sistemas de producción integrados',
    },
    {
      id: 'finca3',
      src: '/media/farm/finca3.jpeg',
      alt: 'Finca - Detalle',
      caption: 'Donde nace la observación sistemática',
    },
    {
      id: 'finca4',
      src: '/media/farm/finca4.jpeg',
      alt: 'Finca - Panorámica',
      caption: 'Del campo al código',
    },
  ]

  const farmImages = images || defaultImages
  const total = farmImages.length

  if (total === 0) return null

  const next = () => setCurrent((current + 1) % total)
  const prev = () => setCurrent((current - 1 + total) % total)

  return (
    <section className="farm-gallery">
      <div className="wrap">
        <div className="gallery-header">
          <h2 className="gallery-title">LA FINCA // LABORATORIO</h2>
          <p className="gallery-subtitle">Donde comienza todo</p>
        </div>

        <div className="gallery-viewport">
          <button className="gallery-nav prev" onClick={prev} aria-label="Imagen anterior">
            ←
          </button>

          <div className="image-container">
            {farmImages.map((img, idx) => (
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
                  width={800}
                  height={500}
                  loading="lazy"
                  aspectRatio="16/10"
                  objectFit="contain"
                  caption={img.caption}
                  mediaType="photo"
                />
              </div>
            ))}
          </div>

          <button className="gallery-nav next" onClick={next} aria-label="Siguiente imagen">
            →
          </button>
        </div>

        <div className="gallery-dots">
          {farmImages.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Ir a imagen ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
