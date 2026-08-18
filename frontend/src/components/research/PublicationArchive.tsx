import { useState } from 'react'
import { publications } from '../../data/research'
import './PublicationArchive.css'

export default function PublicationArchive() {
  const [activeId, setActiveId] = useState<string>('hybrid-ai')
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null)

  const handleCopyDoi = (doi: string) => {
    navigator.clipboard.writeText(doi)
    setCopiedDoi(doi)
    setTimeout(() => setCopiedDoi(null), 2000)
  }

  return (
    <section className="publication-archive-section" id="publication-archive">
      <div className="section-header">
        <span className="section-number">03</span>
        <h2 className="section-title">IEEE XPLORE ARCHIVE</h2>
      </div>

      <div className="archive-container">
        {publications.map((pub) => (
          <div
            key={pub.id}
            className={`publication-dossier ${pub.id === activeId ? 'active' : 'inactive'}`}
            onClick={() => setActiveId(pub.id)}
          >
            <div className="dossier-header">
              <span className="dossier-year">{pub.year}</span>
              <span className="dossier-edition">{pub.eventEdition}</span>
            </div>

            <div className="dossier-title-area">
              <h3 className="dossier-title">{pub.shortTitle}</h3>
              <p className="dossier-type">{pub.type === 'applied-ai' ? 'APPLIED AI RESEARCH' : 'AI IMPACT RESEARCH'}</p>
            </div>

            {pub.id === activeId && (
              <div className="dossier-expanded">
                <div className="expanded-section">
                  <h4>SUMMARY</h4>
                  <p>{pub.summary}</p>
                </div>

                <div className="expanded-section">
                  <h4>CONTEXT</h4>
                  <p>{pub.location} • {pub.publisher}</p>
                </div>

                <div className="expanded-section">
                  <h4>CONTRIBUTION</h4>
                  <p>{pub.contribution}</p>
                </div>

                <div className="expanded-section">
                  <h4>CONNECTION</h4>
                  <p>{pub.connection}</p>
                </div>

                <div className="dossier-footer">
                  <div className="doi-display">
                    <code>{pub.doi}</code>
                    <button
                      className="doi-copy-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyDoi(pub.doi)
                      }}
                      title="Copy DOI"
                    >
                      {copiedDoi === pub.doi ? 'COPIADO' : 'COPIAR DOI'}
                    </button>
                  </div>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ieee-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    VER EN IEEE XPLORE →
                  </a>
                </div>

                <div className="pub-topics">
                  {pub.topics.map(topic => (
                    <span key={topic} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
