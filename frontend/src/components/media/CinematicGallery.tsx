import { useState, useEffect } from 'react'
import './CinematicGallery.css'

interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
}

interface CinematicGalleryProps {
  images: GalleryImage[]
  autoplay?: boolean
  autoplayInterval?: number
  showDots?: boolean
  showCaption?: boolean
}

export default function CinematicGallery({
  images,
  autoplay = false,
  autoplayInterval = 5000,
  showDots = true,
  showCaption = true,
}: CinematicGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(autoplay)

  useEffect(() => {
    if (!isAutoplay || images.length === 0) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, autoplayInterval)

    return () => clearInterval(interval)
  }, [isAutoplay, images.length, autoplayInterval])

  const next = () => setCurrent((current + 1) % images.length)
  const prev = () => setCurrent((current - 1 + images.length) % images.length)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'Escape') setIsAutoplay(false)
  }

  if (images.length === 0) {
    return <div className="gallery-empty">No hay imágenes disponibles</div>
  }

  return (
    <div
      className="cinematic-gallery"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => autoplay && setIsAutoplay(true)}
      role="region"
      aria-label="Galería de imágenes"
      tabIndex={0}
    >
      <div className="gallery-container">
        <div className="gallery-center">
          <img
            key={`center-${current}`}
            src={images[current].src}
            alt={images[current].alt}
            className="gallery-image center"
          />
        </div>

        {images.length > 1 && (
          <>
            <div className="gallery-side left">
              <img
                src={images[(current - 1 + images.length) % images.length].src}
                alt="Anterior"
                className="gallery-image side"
              />
            </div>

            <div className="gallery-side right">
              <img
                src={images[(current + 1) % images.length].src}
                alt="Siguiente"
                className="gallery-image side"
              />
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <>
          <button
            className="gallery-nav prev"
            onClick={prev}
            aria-label="Imagen anterior"
          >
            ←
          </button>
          <button
            className="gallery-nav next"
            onClick={next}
            aria-label="Siguiente imagen"
          >
            →
          </button>
        </>
      )}

      {showCaption && images[current].caption && (
        <figcaption className="gallery-caption">{images[current].caption}</figcaption>
      )}

      {showDots && images.length > 1 && (
        <div className="gallery-dots" role="tablist">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === current ? 'active' : ''}`}
              onClick={() => setCurrent(index)}
              role="tab"
              aria-selected={index === current}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="gallery-counter">
        {current + 1} / {images.length}
      </div>
    </div>
  )
}
