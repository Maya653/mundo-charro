'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const noticias = [
  {
    tipo: 'Evento Especial 2026',
    titulo: 'Copa Mundial',
    subtitulo: 'de la FIFA',
    desc: 'Vive la Ceremonia de Inauguración en el escenario más espectacular de México. Boletos en preventa.',
    fecha: '11 Jun, 2026',
    lugar: 'Hidalgo, México',
    precio: '$2,800',
    moneda: 'MXN',
    cta: 'Comprar Boletos',
    bg: '#1a1208',
  },
  {
    tipo: 'Temporada 2025',
    titulo: 'Nuevas Suites',
    subtitulo: 'disponibles',
    desc: 'Habitaciones renovadas con amenidades de primer nivel y vista panorámica al paisaje hidalguense.',
    fecha: 'Mar, 2025',
    lugar: 'Hotel Mundo Charro',
    precio: '$1,500',
    moneda: 'MXN / noche',
    cta: 'Reservar Ahora',
    bg: '#261612',
  },
  {
    tipo: 'Convenciones',
    titulo: 'Foro Empresarial',
    subtitulo: 'Hidalgo 2025',
    desc: 'El encuentro de líderes empresariales más importante de la región. Networking y conferencias magistrales.',
    fecha: 'Feb, 2025',
    lugar: 'Centro de Convenciones',
    precio: 'Gratis',
    moneda: 'registro',
    cta: 'Registrarse',
    bg: '#1c1a0f',
  },
  {
    tipo: 'Cultura',
    titulo: 'Día Nacional',
    subtitulo: 'del Charro',
    desc: 'Celebración con jaripeo, música tradicional y gastronomía mexicana en el corazón de Singuilucan.',
    fecha: 'Ene, 2025',
    lugar: 'Singuilucan, Hgo.',
    precio: '$350',
    moneda: 'MXN',
    cta: 'Ver Programa',
    bg: '#1a0f0a',
  },
  {
    tipo: 'Parque Temático',
    titulo: 'Gran Apertura',
    subtitulo: 'Septiembre 2025',
    desc: 'Sé parte del evento más esperado del año. Descubre el nuevo Parque Temático Mundo Charro.',
    fecha: 'Sep, 2025',
    lugar: 'Singuilucan, Hgo.',
    precio: 'Preventa',
    moneda: 'disponible',
    cta: 'Más Información',
    bg: '#0f1a0f',
  },
]

export default function Noticias() {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const intervalRef = useRef(null)

  const next = () => setCurrent(prev => (prev + 1) % noticias.length)
  const prev = () => setCurrent(prev => (prev - 1 + noticias.length) % noticias.length)

  useEffect(() => {
    if (!hovered) {
      intervalRef.current = setInterval(next, 4000)
    }
    return () => clearInterval(intervalRef.current)
  }, [hovered])

  const n = noticias[current]

  return (
    <section
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{ background: 'var(--cp)', padding: '4rem 5rem 3rem' }}>
        <p style={{
          fontSize: '0.68rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'var(--cs)',
          marginBottom: '0.6rem', fontWeight: 400,
        }}>
          Noticias y eventos
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
          fontWeight: 400, color: 'var(--ct)', lineHeight: 1.2,
        }}>
          Lo más reciente en <em style={{ fontStyle: 'italic', color: 'var(--ca)' }}>Mundo Charro</em>
        </h2>
      </div>

      {/* Slide con flechas */}
      <div style={{ position: 'relative' }}>
        <div style={{
          background: n.bg,
          padding: '4rem 5rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '4rem',
          alignItems: 'center',
          transition: 'background 0.6s',
          minHeight: '280px',
        }}>
          {/* Info izquierda */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <div style={{ width: '2rem', height: '1px', background: 'var(--ca)' }} />
              <span style={{
                fontSize: '0.68rem', letterSpacing: '0.25em',
                textTransform: 'uppercase', color: 'var(--ca)', fontWeight: 400,
              }}>
                🌐 {n.tipo}
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 400, color: 'var(--cp)',
              lineHeight: 1.1, marginBottom: '1rem',
            }}>
              {n.titulo} <em style={{ fontStyle: 'italic', color: '#C4913A' }}>{n.subtitulo}</em>
            </h2>

            <p style={{
              fontSize: '0.9rem', color: 'rgba(250,244,230,0.6)',
              lineHeight: 1.7, maxWidth: '520px', marginBottom: '1.5rem',
            }}>
              {n.desc}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={tagStyle}>{n.fecha}</span>
              <span style={tagStyle}>{n.lugar}</span>
            </div>
          </div>

          {/* Precio + CTA derecha */}
          <div style={{ textAlign: 'center', minWidth: '200px' }}>
            <p style={{
              fontSize: '0.75rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'rgba(250,244,230,0.4)',
              marginBottom: '0.5rem',
            }}>
              Desde
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.8rem', color: 'var(--cp)',
              lineHeight: 1, marginBottom: '0.3rem',
            }}>
              {n.precio}
              <span style={{
                fontSize: '0.85rem', color: 'rgba(250,244,230,0.4)',
                marginLeft: '0.4rem', fontFamily: "'Roboto', sans-serif",
              }}>
                {n.moneda}
              </span>
            </p>
              <Link href="/eventos#boletos" style={{
              marginTop: '1.2rem', padding: '0.85rem 1.8rem',
              background: 'var(--ca)', color: 'var(--cp)',
              border: 'none', cursor: 'pointer',
              fontSize: '0.8rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', borderRadius: '1px',
              fontFamily: "'Roboto', sans-serif", width: '100%',
              textDecoration: 'none', display: 'block', textAlign: 'center',
            }}>
              {n.cta}
            </Link>
          </div>
        </div>

        {/* Flechas — visibles solo en hover */}
        {hovered && (
          <>
            <button onClick={prev} style={arrowBtn('left')}>‹</button>
            <button onClick={next} style={arrowBtn('right')}>›</button>
          </>
        )}

        {/* Dots */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '0.4rem',
          padding: '1rem', background: n.bg, transition: 'background 0.6s',
        }}>
          {noticias.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? '24px' : '6px',
                height: '6px', borderRadius: '3px',
                background: i === current ? 'var(--ca)' : 'rgba(250,244,230,0.2)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s', padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const tagStyle = {
  fontSize: '0.7rem', letterSpacing: '0.1em',
  padding: '0.3rem 0.8rem',
  border: '1px solid rgba(250,244,230,0.15)',
  color: 'rgba(250,244,230,0.5)', borderRadius: '1px',
}

const arrowBtn = (side) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [side]: '1.5rem',
  width: '44px', height: '44px',
  background: 'rgba(250,244,230,0.08)',
  border: '1px solid rgba(250,244,230,0.15)',
  color: 'var(--cp)', fontSize: '1.5rem',
  cursor: 'pointer', borderRadius: '1px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 10,
})