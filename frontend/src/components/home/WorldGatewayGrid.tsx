import { useState } from 'react'
import { worldGateways } from '../../data/home'
import WorldGateway from './WorldGateway'
import './WorldGatewayGrid.css'

export default function WorldGatewayGrid() {
  const [openGateway, setOpenGateway] = useState<string | null>(null)

  return (
    <section className="world-gateways">
      <div className="wrap">
        <div className="gateways-header">
          <span className="section-number">02</span>
          <h2 className="section-title">CHOOSE YOUR PATH</h2>
          <p className="section-subtitle">
            No necesitas recorrer todo en orden. Elige qué parte de mi mundo quieres abrir.
          </p>
        </div>

        <div className="gateways-grid">
          {worldGateways.map(gateway => (
            <WorldGateway
              key={gateway.id}
              number={gateway.number}
              name={gateway.name}
              icon={gateway.icon}
              phrase={gateway.phrase}
              preview={gateway.preview}
              isOpen={openGateway === gateway.id}
              onOpen={() => setOpenGateway(openGateway === gateway.id ? null : gateway.id)}
            />
          ))}
        </div>

        {openGateway && (
          <div className="gateways-overlay" onClick={() => setOpenGateway(null)} />
        )}
      </div>
    </section>
  )
}
