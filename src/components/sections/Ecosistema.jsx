'use client'

import Link from 'next/link'
import { useState } from 'react'

const modulos = [
  { num: '01', tag: 'Disponible', nombre: 'Hotel', desc: 'Habitaciones diseñadas para el descanso con amenidades de primer nivel y atención personalizada.', href: '/hotel' },
  { num: '02', tag: 'Disponible', nombre: 'Centro de Convenciones', desc: 'Espacios versátiles para eventos corporativos, sociales y culturales con capacidad para grandes grupos.', href: '/convenciones' },
  { num: '03', tag: 'Próximamente', nombre: 'Parque Temático', desc: 'Una experiencia de entretenimiento y cultura charra única en la región. Explanada para 15,000 personas.', href: '/parque', soon: true },
  { num: '04', tag: 'Disponible', nombre: 'Corporativo', desc: 'Infraestructura y servicios para empresas, inversionistas y relaciones institucionales.', href: '/corporativo' },
]

export default function Ecosistema() {
  return (
    <section style={{ background: 'var(--cp)', padding: '5rem 3rem', borderTop: '1px solid rgba(38,22,18,0.08)' }}>
      <div style={{ maxWidth: '540px', marginBottom: '3.5rem' }}>
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cs)', marginBottom: '0.6rem', fontWeight: 400 }}>El ecosistema</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 400, color: 'var(--ct)', lineHeight: 1.2 }}>
          Todo en un solo <em style={{ fontStyle: 'italic', color: 'var(--ca)' }}>destino</em>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5px', background: 'rgba(38,22,18,0.1)' }}>
        {modulos.map((m, i) => <EcoCard key={i} {...m} />)}
      </div>
    </section>
  )
}

function EcoCard({ num, tag, nombre, desc, href, soon }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ background: hovered ? 'var(--ca)' : 'var(--cp)', padding: '2.5rem 2rem', cursor: 'pointer', position: 'relative', height: '100%', transition: 'background 0.3s' }}
      >
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: hovered ? 'var(--cp)' : 'var(--cs)', marginBottom: '2rem', transition: 'color 0.3s' }}>{num}</p>
        <span style={{ display: 'inline-block', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.2rem 0.6rem', background: hovered ? 'rgba(250,244,230,0.2)' : soon ? 'rgba(166,154,123,0.12)' : 'rgba(95,54,33,0.1)', color: hovered ? 'var(--cp)' : soon ? 'var(--cs)' : 'var(--ca)', borderRadius: '1px', marginBottom: '1rem', transition: 'all 0.3s' }}>{tag}</span>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: hovered ? 'var(--cp)' : 'var(--ct)', marginBottom: '0.75rem', transition: 'color 0.3s' }}>{nombre}</p>
        <p style={{ fontSize: '0.85rem', color: hovered ? 'var(--cp)' : 'var(--cs)', lineHeight: 1.7, transition: 'color 0.3s' }}>{desc}</p>
        <span style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', fontSize: '1.1rem', color: hovered ? 'var(--cp)' : 'var(--ca)', transition: 'color 0.3s' }}>↗</span>
      </div>
    </Link>
  )
}