'use client'

import { useState } from 'react'

const WORKER_URL = 'https://plain-violet-1e1a.pavanafrancisco.workers.dev'

const habitaciones = [
  {
    id: 'estandar',
    nombre: 'Estándar',
    precio: 2800,
    m2: '35 m²',
    emoji: '🛏️',
    badge: 'Más popular',
    desc: 'Espacio acogedor con vista al jardín o patio interior. Decoración inspirada en la charrería con detalles en cuero artesanal y madera tallada.',
    features: ['Cama King o dos Queen', 'TV 55" Smart', 'Baño con regadera de lluvia', 'Wi-Fi de alta velocidad', 'Minibar artesanal', 'Clima individual'],
  },
  {
    id: 'deluxe',
    nombre: 'Deluxe',
    precio: 4200,
    m2: '48 m²',
    emoji: '🌿',
    badge: null,
    desc: 'Balcón privado con vista al campo de charreada. Acabados premium en mosaico talavera y herrería artesanal.',
    features: ['Cama King Size premium', 'Balcón privado con vista a lienzo', 'Bañera de hidromasaje', 'Sala de estar', 'Servicio a cuartos 24/7', 'Desayuno incluido'],
  },
  {
    id: 'suite-charra',
    nombre: 'Suite Charra',
    precio: 8500,
    m2: '85 m²',
    emoji: '⭐',
    badge: 'Premium',
    desc: 'Cada suite está dedicada a un estado de la República, con piezas de arte original y artesanías únicas.',
    features: ['Sala y comedor privados', 'Terraza panorámica', 'Jacuzzi exterior', 'Mayordomo personal', 'Cena de bienvenida incluida', 'Acceso a Spa Ejecutivo'],
  },
  {
    id: 'presidencial',
    nombre: 'Suite Presidencial',
    precio: 22000,
    m2: '200 m²',
    emoji: '👑',
    badge: 'Exclusivo',
    desc: 'La experiencia definitiva en el piso ejecutivo. Rooftop privado con alberca y chef disponible.',
    features: ['2 recámaras + sala de negocios', 'Rooftop privado con alberca', 'Chef privado disponible', 'Traslado en camioneta privada', 'All Inclusive Premium', 'Acceso VIP a todos los eventos'],
  },
]

const amenidades = [
  { emoji: '🏊', nombre: 'Alberca Panorámica', desc: 'Temperada todo el año con vista al campo de charreada' },
  { emoji: '💆', nombre: 'Spa Charro', desc: 'Tratamientos con ingredientes naturales mexicanos' },
  { emoji: '🍽️', nombre: '3 Restaurantes', desc: 'Alta cocina mexicana, asador y terraza-bar' },
  { emoji: '🏇', nombre: 'Clases Ecuestres', desc: 'Aprende equitación con charros profesionales' },
  { emoji: '🏋️', nombre: 'Gimnasio 24/7', desc: 'Equipado con tecnología Technogym' },
  { emoji: '👨‍👩‍👧', nombre: 'Club Infantil', desc: 'Actividades culturales y recreativas para niños' },
  { emoji: '🚗', nombre: 'Valet Parking', desc: 'Estacionamiento con cámaras 24/7 incluido' },
  { emoji: '📶', nombre: 'Conectividad Total', desc: 'Wi-Fi Gigabit en todas las instalaciones' },
]

export default function HotelPage() {
  const [activeTab, setActiveTab] = useState('estandar')
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '',
    checkin: '', checkout: '',
    habitacion: 'Estándar',
    huespedes: '2 personas', notas: '',
  })
  const [status, setStatus] = useState('idle')
  const [leadId, setLeadId] = useState(null)

  const hab = habitaciones.find(h => h.id === activeTab)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleReservar = () => {
    setForm(prev => ({ ...prev, habitacion: hab.nombre }))
    document.getElementById('reservas')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Error al enviar')
      setLeadId(data.leadId)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div style={{ background: 'var(--cp)', minHeight: '100vh' }}>

      {/* HEADER */}
      <div style={{ background: 'var(--cad)', padding: '6rem 3rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(250,244,230,.5) 40px,rgba(250,244,230,.5) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(250,244,230,.5) 40px,rgba(250,244,230,.5) 41px)` }} />
        <div style={{ position: 'relative' }}>
          <p style={eyebrow}>Hospedaje de lujo</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 400, color: 'var(--cp)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Hotel <em style={{ fontStyle: 'italic', color: '#e8d5b0' }}>Esplendor Mundo Charro</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(250,244,230,0.65)', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.8, fontWeight: 300 }}>
            150 habitaciones y suites diseñadas para el descanso más placentero, rodeado de la elegancia y tradición de México.
          </p>
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
            {[{ num: '150', label: 'Habitaciones' }, { num: '4', label: 'Tipos de suite' }, { num: '3', label: 'Restaurantes' }, { num: '5★', label: 'Servicio' }].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: '#e8d5b0', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,244,230,0.4)', marginTop: '0.3rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HABITACIONES CON TABS */}
      <div style={{ padding: '6rem 3rem', background: 'var(--cp)', borderBottom: '1px solid rgba(38,22,18,0.08)' }}>
        <p style={labelStyle}>Habitaciones</p>
        <h2 style={titleStyle}>Tu <em style={{ fontStyle: 'italic', color: 'var(--ca)' }}>santuario privado</em></h2>

        {/* Tab nav */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(38,22,18,0.12)', margin: '2.5rem 0 0' }}>
          {habitaciones.map(h => (
            <button
              key={h.id}
              onClick={() => setActiveTab(h.id)}
              style={{
                padding: '0.8rem 1.6rem', fontSize: '0.8rem',
                letterSpacing: '0.08em', fontFamily: "'Roboto',sans-serif",
                background: 'none', border: 'none', cursor: 'pointer',
                color: activeTab === h.id ? 'var(--ct)' : 'var(--cs)',
                borderBottom: activeTab === h.id ? '2px solid var(--ca)' : '2px solid transparent',
                marginBottom: '-1px', transition: 'color 0.3s',
                fontWeight: activeTab === h.id ? 600 : 400,
              }}
            >
              {h.nombre}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', padding: '3rem 0' }}>
          {/* Imagen placeholder */}
          <div style={{ background: 'var(--cad)', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: 'rgba(250,244,230,0.2)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <span style={{ fontSize: '5rem', opacity: 0.3 }}>{hab.emoji}</span>
            <span>Imagen {hab.nombre}</span>
          </div>

          {/* Info */}
          <div>
            {hab.badge && (
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.25rem 0.8rem', background: 'rgba(95,54,33,0.1)', color: 'var(--ca)', borderRadius: '1px', marginBottom: '1.2rem', display: 'inline-block' }}>
                {hab.badge}
              </span>
            )}
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: 'var(--ct)', marginBottom: '0.4rem', fontWeight: 400 }}>
              Habitación {hab.nombre}
            </h3>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cs)', marginBottom: '1.5rem' }}>{hab.m2}</p>
            <p style={{ color: 'var(--cs)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.93rem' }}>{hab.desc}</p>

            <ul style={{ listStyle: 'none', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {hab.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', fontSize: '0.9rem', color: 'var(--ct)' }}>
                  <span style={{ color: 'var(--ca)', fontSize: '0.65rem', flexShrink: 0 }}>✦</span>
                  {f}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '2rem' }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.5rem', color: 'var(--ca)' }}>
                ${hab.precio.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--cs)', letterSpacing: '0.1em' }}>MXN / noche</span>
            </div>

            <button onClick={handleReservar} style={{ padding: '0.9rem 2.5rem', background: 'var(--ca)', color: 'var(--cp)', border: 'none', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Roboto',sans-serif", borderRadius: '1px', transition: 'background 0.3s' }}>
              Reservar esta habitación
            </button>
          </div>
        </div>
      </div>

      {/* AMENIDADES */}
      <div style={{ padding: '6rem 3rem', background: 'var(--cp)', borderBottom: '1px solid rgba(38,22,18,0.08)' }}>
        <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 4rem' }}>
          <p style={labelStyle}>Servicios</p>
          <h2 style={titleStyle}>Amenidades <em style={{ fontStyle: 'italic', color: 'var(--ca)' }}>de clase mundial</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5px', background: 'rgba(38,22,18,0.1)' }}>
          {amenidades.map((a, i) => <AmenidadCard key={i} {...a} />)}
        </div>
      </div>

      {/* GALERÍA */}
      <div style={{ padding: '6rem 3rem', background: 'var(--cp)', borderBottom: '1px solid rgba(38,22,18,0.08)' }}>
        <div style={{ marginBottom: '3rem' }}>
          <p style={labelStyle}>Galería</p>
          <h2 style={titleStyle}>Espacios que <em style={{ fontStyle: 'italic', color: 'var(--ca)' }}>inspiran</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(2,220px)', gap: '0.75rem' }}>
          <div style={{ gridColumn: 'span 2', gridRow: 'span 2', background: 'var(--cad)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontSize: '4rem', opacity: 0.3 }}>🏨</span>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,244,230,0.3)' }}>Lobby principal</span>
          </div>
          <div style={{ background: 'var(--cad)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '2.5rem', opacity: 0.3 }}>🛏️</span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,244,230,0.3)' }}>Habitación Deluxe</span>
          </div>
          <div style={{ background: 'var(--cad)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '2.5rem', opacity: 0.3 }}>🏊</span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(250,244,230,0.3)' }}>Alberca panorámica</span>
          </div>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--cs)', marginTop: '1rem', fontSize: '0.85rem' }}>
          Las fotografías profesionales se mostrarán aquí cuando estén disponibles
        </p>
      </div>

      {/* FORMULARIO */}
      <div style={{ padding: '6rem 3rem', background: 'var(--cp)' }} id="reservas">
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <p style={labelStyle}>Reservaciones</p>
            <h2 style={titleStyle}>Haz tu <em style={{ fontStyle: 'italic', color: 'var(--ca)' }}>reserva ahora</em></h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--cs)', lineHeight: 1.7, marginTop: '0.5rem' }}>
              Completa el formulario y nuestro equipo confirmará tu reserva en menos de 2 horas.
            </p>
          </div>

          {status === 'success' ? (
            <SuccessMessage leadId={leadId} onReset={() => { setStatus('idle'); setForm({ nombre: '', email: '', telefono: '', checkin: '', checkout: '', habitacion: 'Estándar', huespedes: '2 personas', notas: '' }) }} />
          ) : (
            <form onSubmit={handleSubmit} style={{ border: '1px solid rgba(38,22,18,0.12)', padding: '3rem' }}>

              {/* Habitación seleccionada */}
              <div style={{ background: 'rgba(95,54,33,0.06)', border: '1px solid rgba(95,54,33,0.12)', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ca)', marginBottom: '0.2rem' }}>Habitación seleccionada</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", color: 'var(--ct)', fontSize: '1rem' }}>{form.habitacion}</p>
                </div>
                <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontSize: '0.72rem', color: 'var(--ca)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em', textDecoration: 'underline', fontFamily: "'Roboto',sans-serif" }}>
                  Cambiar
                </button>
              </div>

              <div style={grid2}>
                <FormGroup label="Nombre completo *">
                  <input name="nombre" type="text" required placeholder="Tu nombre" value={form.nombre} onChange={handleChange} style={inputStyle} />
                </FormGroup>
                <FormGroup label="Teléfono *">
                  <input name="telefono" type="tel" required placeholder="+52 (771) 000-0000" value={form.telefono} onChange={handleChange} style={inputStyle} />
                </FormGroup>
              </div>

              <FormGroup label="Email *">
                <input name="email" type="email" required placeholder="tu@correo.com" value={form.email} onChange={handleChange} style={inputStyle} />
              </FormGroup>

              <div style={grid2}>
                <FormGroup label="Check-in *">
                  <input name="checkin" type="date" required value={form.checkin} onChange={handleChange} style={inputStyle} min={new Date().toISOString().split('T')[0]} />
                </FormGroup>
                <FormGroup label="Check-out *">
                  <input name="checkout" type="date" required value={form.checkout} onChange={handleChange} style={inputStyle} min={form.checkin || new Date().toISOString().split('T')[0]} />
                </FormGroup>
              </div>

              <div style={grid2}>
                <FormGroup label="Tipo de habitación">
                  <select name="habitacion" value={form.habitacion} onChange={handleChange} style={inputStyle}>
                    {habitaciones.map(h => (
                      <option key={h.id} value={h.nombre}>{h.nombre} — desde ${h.precio.toLocaleString()}/noche</option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup label="Número de huéspedes">
                  <select name="huespedes" value={form.huespedes} onChange={handleChange} style={inputStyle}>
                    {['1 persona', '2 personas', '3 personas', '4 personas', 'Más de 4'].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </FormGroup>
              </div>

              <FormGroup label="Solicitudes especiales">
                <textarea name="notas" rows={3} placeholder="Aniversario, alergias, preferencias, accesibilidad..." value={form.notas} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} />
              </FormGroup>

              {status === 'error' && (
                <div style={{ background: 'rgba(139,0,0,0.06)', border: '1px solid rgba(139,0,0,0.15)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#8B0000' }}>
                  Ocurrió un error. Por favor intenta de nuevo o contáctanos directamente.
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} style={{ width: '100%', padding: '1rem', background: status === 'loading' ? 'var(--cs)' : 'var(--ca)', color: 'var(--cp)', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Roboto',sans-serif", borderRadius: '1px', transition: 'background 0.3s' }}>
                {status === 'loading' ? 'Enviando...' : 'Solicitar Reservación'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--cs)', textTransform: 'uppercase' }}>
                  Tu solicitud se registra automáticamente en Odoo CRM
                </span>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        input:focus, select:focus, textarea:focus { outline: none; border-color: var(--ca) !important; }
        input::placeholder, textarea::placeholder { color: var(--cs); opacity: 0.7; }
      `}</style>
    </div>
  )
}

function AmenidadCard({ emoji, nombre, desc }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--ca)' : 'var(--cp)',
        padding: '2.5rem 2rem', textAlign: 'center',
        transition: 'background 0.3s',
      }}
    >
      <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{emoji}</div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.05rem', color: hovered ? 'var(--cp)' : 'var(--ct)', marginBottom: '0.5rem', transition: 'color 0.3s', fontWeight: 400 }}>{nombre}</h3>
      <p style={{ fontSize: '0.85rem', color: hovered ? 'rgba(250,244,230,0.8)' : 'var(--cs)', lineHeight: 1.7, transition: 'color 0.3s' }}>{desc}</p>
    </div>
  )
}

function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ca)', marginBottom: '0.4rem', fontWeight: 600 }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function SuccessMessage({ leadId, onReset }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px solid rgba(38,22,18,0.12)' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: 'var(--ct)', marginBottom: '0.75rem', fontWeight: 400 }}>¡Reserva recibida!</h3>
      <p style={{ fontSize: '0.95rem', color: 'var(--cs)', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 0.5rem' }}>
        Tu solicitud fue enviada con éxito. Nuestro equipo te contactará en menos de 2 horas para confirmar tu reserva.
      </p>
      {leadId && (
        <p style={{ fontSize: '0.78rem', color: 'var(--cs)', marginBottom: '2rem' }}>
          ID de referencia: <strong style={{ color: 'var(--ca)' }}>#{leadId}</strong>
        </p>
      )}
      <button onClick={onReset} style={{ padding: '0.85rem 2rem', background: 'transparent', color: 'var(--ca)', border: '1px solid var(--ca)', cursor: 'pointer', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Roboto',sans-serif", borderRadius: '1px' }}>
        Hacer otra reserva
      </button>
    </div>
  )
}

const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }

const inputStyle = {
  width: '100%', padding: '0.8rem 1rem',
  background: 'var(--cp)', border: '1px solid rgba(38,22,18,0.2)',
  color: 'var(--ct)', fontSize: '0.9rem',
  fontFamily: "'Roboto',sans-serif", fontWeight: 300,
  borderRadius: '1px', transition: 'border-color 0.3s',
}

const eyebrow = {
  fontSize: '0.68rem', letterSpacing: '0.3em',
  textTransform: 'uppercase', color: 'var(--cs)',
  marginBottom: '0.8rem', fontWeight: 400,
}

const labelStyle = {
  fontSize: '0.68rem', letterSpacing: '0.3em',
  textTransform: 'uppercase', color: 'var(--cs)',
  marginBottom: '0.6rem', fontWeight: 400,
  display: 'block',
}

const titleStyle = {
  fontFamily: "'Playfair Display',serif",
  fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
  fontWeight: 400, color: 'var(--ct)', lineHeight: 1.2,
}