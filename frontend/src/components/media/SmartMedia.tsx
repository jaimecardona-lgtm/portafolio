import { useState } from 'react'
import './SmartMedia.css'

interface SmartMediaProps {
  src: string
  fallbackSrc?: string
  alt: string
  caption?: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  objectPosition?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down'
  aspectRatio?: string
  status?: 'available' | 'missing' | 'restricted' | 'planned'
  entitySlug?: string
  mediaType?: 'photo' | 'screenshot' | 'diagram' | 'credential' | 'publication'
  onExpand?: () => void
}

export default function SmartMedia({
  src,
  fallbackSrc,
  alt,
  caption,
  width,
  height,
  loading = 'lazy',
  fetchPriority = 'auto',
  objectPosition = 'center',
  objectFit = 'contain',
  aspectRatio = '16/9',
  status = 'available',
  entitySlug,
  mediaType = 'photo',
  onExpand,
}: SmartMediaProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageError = () => {
    if (!imageError && fallbackSrc) {
      setImageError(true)
    } else {
      setImageError(true)
    }
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  if (status === 'missing' || status === 'planned' || imageError) {
    return (
      <MediaPlaceholder
        alt={alt}
        mediaType={mediaType}
        status={status}
        entitySlug={entitySlug}
        caption={caption}
        aspectRatio={aspectRatio}
      />
    )
  }

  const displaySrc = !imageError ? src : fallbackSrc

  return (
    <figure className="smart-media" style={{ aspectRatio }}>
      <div className="smart-media-wrapper">
        {isLoading && <div className="media-skeleton" aria-hidden="true" />}
        <img
          src={displaySrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          style={{ objectPosition, objectFit }}
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`smart-media-img ${isLoading ? 'loading' : 'loaded'}`}
        />
        {status === 'restricted' && (
          <div className="media-badge restricted" aria-label="Información restringida">
            🔒
          </div>
        )}
      </div>
      {caption && <figcaption className="media-caption">{caption}</figcaption>}
      {onExpand && (
        <button
          className="media-expand"
          onClick={onExpand}
          aria-label={`Expandir imagen: ${alt}`}
        >
          ⛶
        </button>
      )}
    </figure>
  )
}

interface MediaPlaceholderProps {
  alt: string
  mediaType: string
  status: string
  entitySlug?: string
  caption?: string
  aspectRatio?: string
}

function MediaPlaceholder({
  alt,
  mediaType,
  status,
  entitySlug,
  caption,
  aspectRatio = '16/9',
}: MediaPlaceholderProps) {
  const getIcon = () => {
    switch (mediaType) {
      case 'screenshot':
        return '📸'
      case 'diagram':
        return '📐'
      case 'credential':
        return '🏆'
      case 'publication':
        return '📄'
      default:
        return '🖼️'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'missing':
        return 'CAPTURA PENDIENTE'
      case 'planned':
        return 'PREVISTO'
      case 'restricted':
        return 'INFORMACIÓN RESTRINGIDA'
      default:
        return 'NO DISPONIBLE'
    }
  }

  const filePath = alt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return (
    <figure className="media-placeholder" style={{ aspectRatio }}>
      <div className="placeholder-content">
        <div className="placeholder-icon">{getIcon()}</div>
        <h3 className="placeholder-status">{getStatusText()}</h3>
        <p className="placeholder-alt">{alt}</p>
        {entitySlug && (
          <code className="placeholder-path">
            media/{entitySlug}/{filePath}.webp
          </code>
        )}
        {caption && <p className="placeholder-caption">{caption}</p>}
        <p className="placeholder-tip">📝 Esta imagen será agregada próximamente</p>
      </div>
    </figure>
  )
}
