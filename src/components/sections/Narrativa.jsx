'use client'

import { useState } from 'react'

const tabs = [
  { id: 'historia', label: 'Historia' },
  { id: 'cultura', label: 'Cultura' },
  { id: 'filosofia', label: 'Filosofía' },
  { id: 'ecosistema', label: 'Ecosistema' },
]

export default function Narrativa() {
  const [active, setActive] = useState('historia')

  return (
    <section id="narrativa" style={{ background: 'var(--cad)', padding: '7rem 3rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cs)', marginBottom: '0.6rem' }}>
          Nuestra historia
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,2.5vw,2.4rem)', fontWeight: 400, color: 'var(--cp)', lineHeight: 1.2 }}>
          El alma de <em style={{ fontStyle: 'italic', color: '#e8d5b0' }}>Mundo Charro</em>
        </h2>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(250,244,230,0.15)', marginBottom: '3rem' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onMouseEnter={() => setActive(t.id)}
            onClick={() => setActive(t.id)}
            style={{
              padding: '0.6rem 1.4rem', fontSize: '0.78rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: active === t.id ? '#e8d5b0' : 'rgba(250,244,230,0.55)',
              cursor: 'pointer', background: 'none', border: 'none',
              borderBottom: active === t.id ? '2px solid var(--cs)' : '2px solid transparent',
              marginBottom: '-1px', fontFamily: "'Roboto', sans-serif",
              transition: 'color 0.3s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === 'historia' && <Historia />}
      {active === 'cultura' && <Cultura />}
      {active === 'filosofia' && <Filosofia />}
      {active === 'ecosistema' && <Ecosistema />}
    </section>
  )
}

function Historia() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
      <div>
        {[
          'La charrería nació en los ranchos de la Nueva España durante el siglo XVII, cuando los vaqueros mexicanos perfeccionaron el arte de trabajar con ganado a caballo. Con el tiempo, estas habilidades se convirtieron en una forma de arte, una identidad y un símbolo nacional.',
          'En 1933, la charrería fue reconocida como el Deporte Nacional de México. En 2016, la UNESCO la declaró Patrimonio Cultural Inmaterial de la Humanidad, reconociendo su valor universal y la necesidad de preservarla.',
          'Mundo Charro nació con la misión de ser el gran escenario donde esta historia milenaria se celebra, se enseña y se comparte con el mundo.',
        ].map((p, i) => (
          <p key={i} style={{ color: 'rgba(250,244,230,0.8)', marginBottom: '1.2rem', lineHeight: 1.9, fontWeight: 300, fontSize: '0.93rem' }}>{p}</p>
        ))}
      </div>

      {/* Línea del tiempo */}
<div style={{ background: 'rgba(250,244,230,0.08)', border: '1px solid rgba(250,244,230,0.18)', padding: '2.5rem' }}>        <p style={{ fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cs)', marginBottom: '2rem' }}>
          Línea del Tiempo
        </p>
          {[
            { year: '1600s', text: 'Origen de la charrería en los ranchos novohispanos de Jalisco y Querétaro' },
            { year: '1933', text: 'Declarada Deporte Nacional de México por el gobierno federal' },
            { year: '2016', text: 'UNESCO declara la charrería Patrimonio Inmaterial de la Humanidad' },
            { year: '2025', text: 'Apertura de Mundo Charro en Hidalgo: el mayor destino charro del mundo' },
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: 'flex', gap: '1.5rem',
              marginBottom: i < arr.length - 1 ? '1.5rem' : 0,
              paddingBottom: i < arr.length - 1 ? '1.5rem' : 0,
              borderBottom: i < arr.length - 1 ? '1px solid rgba(250,244,230,0.1)' : 'none',
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.1rem', color: '#e8d5b0',
                minWidth: '55px', flexShrink: 0, fontWeight: 600,
              }}>
                {item.year}
              </div>
              <div style={{ color: 'rgba(250,244,230,0.85)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                {item.text}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

function Cultura() {
  const pilares = [
    { emoji: '🤠', titulo: 'La Indumentaria', texto: 'El traje de charro es una obra de arte textil. Cada elemento —desde el sombrero hasta las espuelas— está bordado a mano y representa el orgullo de su portador.' },
    { emoji: '🐴', titulo: 'La Charrería', texto: 'El lienzo charro es el escenario donde se practican las 9 suertes. Cada suerte requiere años de práctica y dominio absoluto del caballo.' },
    { emoji: '🎵', titulo: 'La Música', texto: 'El mariachi es el alma sonora de la charrería. Declarado también Patrimonio de la UNESCO, los sones y corridos narran la historia de México.' },
    { emoji: '🍜', titulo: 'La Gastronomía', texto: 'Barbacoa de borrego, carnitas, enchiladas hidalguenses y tortillas hechas a mano son el banquete que sella la comunidad charra.' },
    { emoji: '🎨', titulo: 'Las Artesanías', texto: 'Talabartería, herrería artística, bordado en chaquira y trabajo en plata son las artes que adornan al charro y a su caballo.' },
    { emoji: '👨‍👩‍👧‍👦', titulo: 'La Familia', texto: 'La charrería es una tradición familiar que se transmite de generación en generación. Los lienzos son espacios de encuentro y celebración.' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(250,244,230,0.1)' }}>
      {pilares.map((p, i) => <PilarCard key={i} {...p} />)}
    </div>
  )
}

function PilarCard({ emoji, titulo, texto }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--ca)' : 'rgba(250,244,230,0.05)',
        padding: '2rem',
        borderLeft: `3px solid ${hovered ? '#e8d5b0' : 'var(--ca)'}`,
        transition: 'all 0.3s', cursor: 'default',
      }}
    >
      <div style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{emoji}</div>
      <h3 style={{
        fontFamily: "'Playfair Display', serif", fontSize: '1.05rem',
        color: hovered ? 'var(--cp)' : '#e8d5b0',
        marginBottom: '0.7rem', transition: 'color 0.3s',
      }}>
        {titulo}
      </h3>
      <p style={{ fontSize: '0.85rem', color: hovered ? 'rgba(250,244,230,0.85)' : 'rgba(250,244,230,0.7)', lineHeight: 1.7, transition: 'color 0.3s' }}>
        {texto}
      </p>
    </div>
  )
}

function Filosofia() {
  const valores = [
    { valor: 'Respeto', desc: 'Por la tradición, los mayores y las raíces que nos dieron identidad' },
    { valor: 'Destreza', desc: 'La búsqueda constante de la excelencia en cada arte y oficio' },
    { valor: 'Comunidad', desc: 'La fortaleza que viene de pertenecer a algo más grande que uno mismo' },
    { valor: 'Orgullo', desc: 'El amor profundo por México y la herencia que llevamos en la sangre' },
  ]

  return (
    <div>
      <p style={{ color: 'rgba(250,244,230,0.8)', fontSize: '0.95rem', lineHeight: 1.9, maxWidth: '680px', marginBottom: '3rem', fontWeight: 300 }}>
        En Mundo Charro creemos que la tradición no es museo: es una fuerza viva que debe evolucionar sin perder su esencia.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(250,244,230,0.1)' }}>
        {valores.map((v, i) => <ValorCard key={i} {...v} />)}
      </div>
    </div>
  )
}

function ValorCard({ valor, desc }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2.5rem 2rem', textAlign: 'center',
        background: hovered ? 'var(--ca)' : 'rgba(250,244,230,0.05)',
        transition: 'background 0.3s', cursor: 'default',
      }}
    >
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.6rem', color: hovered ? 'var(--cp)' : '#e8d5b0',
        marginBottom: '0.8rem', transition: 'color 0.3s',
      }}>
        {valor}
      </div>
      <p style={{ fontSize: '0.85rem', color: hovered ? 'rgba(250,244,230,0.85)' : 'rgba(250,244,230,0.65)', lineHeight: 1.7, transition: 'color 0.3s' }}>
        {desc}
      </p>
    </div>
  )
}

function Ecosistema() {
  const modulos = [
    { emoji: '🏨', tag: 'Hotel', titulo: 'Gran Hotel Mundo Charro', desc: '150 habitaciones y suites de lujo con arquitectura inspirada en las haciendas hidalguenses. Spa, restaurantes, alberca y vistas únicas al campo de charreada.', href: '/hotel' },
    { emoji: '🏛️', tag: 'Convenciones', titulo: 'Centro de Convenciones', desc: '8,000 m² de espacios para eventos de toda magnitud. Gran Salón con capacidad para 5,000 personas, auditorio y salas ejecutivas.', href: '/convenciones' },
    { emoji: '🎪', tag: 'Próximamente', titulo: 'Centro de Espectáculos', desc: 'Explanada con capacidad para 15,000 personas. Conciertos, charreadas nacionales y espectáculos internacionales.', href: '/parque' },
    { emoji: '🤠', tag: 'Corporativo', titulo: 'Corporativo Mundo Charro', desc: 'Infraestructura y servicios para empresas, inversionistas y relaciones institucionales con visión de largo plazo.', href: '/corporativo' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
      {modulos.map((m, i) => <EcoCard key={i} {...m} />)}
    </div>
  )
}

function EcoCard({ emoji, tag, titulo, desc, href }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a href={href} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? 'var(--ca)' : 'rgba(250,244,230,0.05)',
          border: '1px solid rgba(250,244,230,0.12)',
          padding: '2.5rem', position: 'relative',
          transition: 'all 0.3s', cursor: 'pointer',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.8 }}>{emoji}</div>
        <span style={{
          fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '0.2rem 0.6rem',
          background: hovered ? 'rgba(250,244,230,0.2)' : 'rgba(95,54,33,0.4)',
          color: hovered ? 'var(--cp)' : 'var(--cs)',
          borderRadius: '1px', marginBottom: '1rem', display: 'inline-block',
          transition: 'all 0.3s',
        }}>
          {tag}
        </span>
        <h3 style={{
          fontFamily: "'Playfair Display', serif", fontSize: '1.2rem',
          color: hovered ? 'var(--cp)' : '#e8d5b0',
          marginBottom: '0.75rem', transition: 'color 0.3s',
        }}>
          {titulo}
        </h3>
        <p style={{ fontSize: '0.85rem', color: hovered ? 'rgba(250,244,230,0.85)' : 'rgba(250,244,230,0.65)', lineHeight: 1.7, transition: 'color 0.3s' }}>
          {desc}
        </p>
        <span style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', color: hovered ? 'var(--cp)' : 'var(--ca)', fontSize: '1rem', transition: 'color 0.3s' }}>↗</span>
      </div>
    </a>
  )
}