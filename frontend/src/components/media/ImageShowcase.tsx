import { useState } from 'react'
import SmartMedia from './SmartMedia'
import './ImageShowcase.css'

interface ShowcaseImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
}

interface Props {
  images: ShowcaseImage[]
  title: string
  subtitle?: string
  variant?: 'grid' | 'carousel'
}

export default function ImageShowcase({ images, title, subtitle, variant = 'grid' }: Props) {
  const [current, setCurrent] = useState(0)

  if (images.length === 0) return null

  if (variant === 'carousel') {
    const next = () => setCurrent((current + 1) % images.length)
    const prev = () => setCurrent((current - 1 + images.length) % images.length)

    return (
      <section className="image-showcase carousel">
        <div className="wrap">
          <div className="showcase-header">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <div className="carousel-viewport">
            <button className="nav-btn prev" onClick={prev} aria-label="Anterior">
              ←
            </button>

            <div className="carousel-slide">
              <SmartMedia
                src={images[current].src}
                alt={images[current].alt}
                width={700}
                height={500}
                loading="lazy"
                aspectRatio="7/5"
                objectFit="contain"
                mediaType="photo"
              />
              <div className="slide-info">
                <h3>{images[current].title || images[current].alt}</h3>
                {images[current].description && <p>{images[current].description}</p>}
              </div>
            </div>

            <button className="nav-btn next" onClick={next} aria-label="Siguiente">
              →
            </button>
          </div>

          <div className="carousel-indicators">
            {images.map((_, idx) => (
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

  return (
    <section className="image-showcase grid">
      <div className="wrap">
        <div className="showcase-header">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="images-grid">
          {images.map(img => (
            <div key={img.id} className="grid-item">
              <SmartMedia
                src={img.src}
                alt={img.alt}
                width={400}
                height={300}
                loading="lazy"
                aspectRatio="4/3"
                objectFit="contain"
                mediaType="photo"
              />
              {img.title && <div className="item-title">{img.title}</div>}
              {img.description && <div className="item-description">{img.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
