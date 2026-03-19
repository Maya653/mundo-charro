'use client'

import { useState } from 'react'

const ODOO_CONFIG = {
  baseUrl: 'https://mundocharro.odoo.com',
  db: 'mundocharro',
  username: 'francisco.pavana@mundocharro.mx',
  password: 'cbd7980aef0e5a56d5b9f26abc18c5a53ad54109',
}

async function crearLead(datos) {
  const authRes = await fetch(`${ODOO_CONFIG.baseUrl}/jsonrpc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0', method: 'call', id: 1,
      params: { service: 'common', method: 'authenticate', args: [ODOO_CONFIG.db, ODOO_CONFIG.username, ODOO_CONFIG.password, {}] }
    })
  })
  const authJson = await authRes.json()
  const uid = authJson?.result
  if (!uid) throw new Error('Auth fallida')

  const leadRes = await fetch(`${ODOO_CONFIG.baseUrl}/jsonrpc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0', method: 'call', id: 2,
      params: {
        service: 'object', method: 'execute_kw',
        args: [ODOO_CONFIG.db, uid, ODOO_CONFIG.password, 'crm.lead', 'create', [{
          name: `Evento Convenciones — ${datos.empresa || datos.contacto} | ${datos.tipo_evento}`,
          contact_name: datos.contacto,
          email_from: datos.email,
          phone: datos.telefono,
          tag_ids: [[4, 22]],
          description:
            `Empresa: ${datos.empresa || ''}\n` +
            `Fecha: ${datos.fecha || ''}\n` +
            `Espacio: ${datos.espacio || ''}\n` +
            `Asistentes: ${datos.asistentes || ''}\n` +
            `Tipo de evento: ${datos.tipo_evento || ''}\n` +
            `Descripción: ${datos.descripcion || ''}`,
        }]]
      }
    })
  })
  const leadJson = await leadRes.json()
  const leadId = leadJson?.result
  if (!leadId) throw new Error('Lead fallido')
  return leadId
}

const espacios = [
  {
    id: 'gran-salon',
    nombre: 'Gran Salón Charro',
    eyebrow: 'Salón Principal',
    emoji: '🏛️',
    desc: '3,500 m² divisibles en 3 secciones. La sala de eventos más grande del Bajío con equipamiento audiovisual de última generación.',
    badges: ['Hasta 5,000 pax', 'Divisible'],
    caps: { teatro: '5,000', escuela: '3,200', coctel: '5,000', banquete: '3,500', m2: '3,500' },
  },
  {
    id: 'auditorio',
    nombre: 'Auditorio Tradición',
    eyebrow: 'Auditorio',
    emoji: '🎭',
    desc: 'Diseñado para conferencias magistrales, presentaciones y eventos con palco ejecutivo. Acústica de concierto.',
    badges: ['800 asientos fijos', 'Palco VIP'],
    caps: { teatro: '800', escuela: '—', coctel: '600', banquete: '—', m2: '1,200' },
  },
  {
    id: 'salas',
    nombre: 'Salas Ejecutivas',
    eyebrow: 'Juntas y Negocios',
    emoji: '🤝',
    desc: '8 salas de juntas equipadas con videoconferencia, capacidades de 10 a 80 personas. Ideal para breakout sessions.',
    badges: ['8 salas', '10–80 pax'],
    caps: { teatro: '80', escuela: '50', coctel: '60', banquete: '40', m2: '120' },
  },
  {
    id: 'terraza',
    nombre: 'Terraza La Hacienda',
    eyebrow: 'Espacios al Aire Libre',
    emoji: '🌿',
    desc: '5,000 m² de jardines y explanadas bajo el cielo de Hidalgo. Perfectos para cócteles, galas y eventos temáticos charros.',
    badges: ['Hasta 3,000 pax', 'Jardín'],
    caps: { teatro: '3,000', escuela: '—', coctel: '3,000', banquete: '2,000', m2: '5,000' },
  },
  {
    id: 'lienzo',
    nombre: 'Lienzo Charro Corp.',
    eyebrow: 'Experiencia Única',
    emoji: '🏇',
    desc: 'El lienzo charro más grande adaptado para eventos empresariales con demostración charra incluida.',
    badges: ['Hasta 2,500 pax', 'Exclusivo'],
    caps: { teatro: '2,500', escuela: '—', coctel: '2,500', banquete: '1,500', m2: '8,000' },
  },
  {
    id: 'salon-fiesta',
    nombre: 'Salón Fiesta',
    eyebrow: 'Social',
    emoji: '🎉',
    desc: 'Para bodas, quinceañeras y celebraciones sociales de hasta 500 invitados con todo incluido.',
    badges: ['Hasta 500 pax', 'Todo incluido'],
    caps: { teatro: '500', escuela: '300', coctel: '500', banquete: '400', m2: '800' },
  },
]

const tiposEvento = [
  { emoji: '🏢', nombre: 'Congresos', desc: 'Nacionales e internacionales con traducción simultánea' },
  { emoji: '📊', nombre: 'Convenciones Corp.', desc: 'Lanzamientos de producto, kick-off anuales y convenciones de ventas' },
  { emoji: '💍', nombre: 'Bodas & Social', desc: 'Bodas, XV años y celebraciones con ambiente charro' },
  { emoji: '🎓', nombre: 'Académicos', desc: 'Simposios, graduaciones y eventos de instituciones educativas' },
  { emoji: '🎪', nombre: 'Ferias & Expos', desc: 'Exposiciones comerciales y showrooms' },
  { emoji: '🏆', nombre: 'Deportivos', desc: 'Torneos, premiaciones y eventos de la industria del deporte' },
  { emoji: '🤠', nombre: 'Charros & Culturales', desc: 'Festivales culturales y celebraciones patrias' },
  { emoji: '🍽️', nombre: 'Gastronomía', desc: 'Cenas de gala, maridajes y festivales gastronómicos' },
]

export default function ConvencionesPage() {
  const [activeTab, setActiveTab] = useState('gran-salon')
  const [form, setForm] = useState({
    empresa: '', contacto: '', email: '', telefono: '',
    fecha: '', asistentes: '1 – 50 personas',
    tipo_evento: 'Congreso / Convención',
    espacio: 'Gran Salón Charro', descripcion: '',
  })
  const [status, setStatus] = useState('idle')
  const [leadId, setLeadId] = useState(null)

  const espacio = espacios.find(e => e.id === activeTab)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const id = await crearLead(form)
      setLeadId(id)
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
          <p style={eyebrow}>Eventos Corporativos</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 400, color: 'var(--cp)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Centro de <em style={{ fontStyle: 'italic', color: '#e8d5b0' }}>Convenciones</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(250,244,230,0.65)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.8, fontWeight: 300 }}>
            Espacios de clase mundial para hacer de tu evento corporativo una experiencia memorable en el corazón de México.
          </p>
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
            {[{ num: '6', label: 'Espacios' }, { num: '5,000', label: 'Aforo máx.' }, { num: '8,000', label: 'm² totales' }, { num: '8', label: 'Tipos de evento' }].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: '#e8d5b0', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,244,230,0.4)', marginTop: '0.3rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ESPACIOS CON TABS */}
      <div style={{ padding: '6rem 3rem', background: 'var(--cp)', borderBottom: '1px solid rgba(38,22,18,0.08)' }}>
        <p style={labelStyle}>Nuestros Espacios</p>
        <h2 style={titleStyle}>Cada evento merece <em style={{ fontStyle: 'italic', color: 'var(--ca)' }}>el espacio perfecto</em></h2>

        {/* Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid rgba(38,22,18,0.12)', margin: '2.5rem 0 0', gap: 0 }}>
          {espacios.map(e => (
            <button key={e.id} onClick={() => setActiveTab(e.id)} style={{
              padding: '0.8rem 1.4rem', fontSize: '0.78rem',
              letterSpacing: '0.06em', fontFamily: "'Roboto',sans-serif",
              background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === e.id ? 'var(--ct)' : 'var(--cs)',
              borderBottom: activeTab === e.id ? '2px solid var(--ca)' : '2px solid transparent',
              marginBottom: '-1px', transition: 'color 0.3s',
              fontWeight: activeTab === e.id ? 600 : 400,
            }}>
              {e.nombre}
            </button>
          ))}
        </div>

        {/* Contenido tab */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', padding: '3rem 0' }}>
          {/* Imagen placeholder */}
          <div style={{ background: 'var(--cad)', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: 'rgba(250,244,230,0.2)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <span style={{ fontSize: '5rem', opacity: 0.25 }}>{espacio.emoji}</span>
            <span>Imagen {espacio.nombre}</span>
          </div>

          {/* Info */}
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cs)', marginBottom: '0.5rem' }}>{espacio.eyebrow}</p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: 'var(--ct)', marginBottom: '1rem', fontWeight: 400 }}>{espacio.nombre}</h3>
            <p style={{ color: 'var(--cs)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.93rem' }}>{espacio.desc}</p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {espacio.badges.map((b, i) => (
                <span key={i} style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.3rem 0.8rem', background: 'rgba(95,54,33,0.08)', color: 'var(--ca)', border: '1px solid rgba(95,54,33,0.15)', borderRadius: '1px' }}>{b}</span>
              ))}
            </div>

            {/* Capacidades */}
            <div style={{ background: 'rgba(38,22,18,0.03)', border: '1px solid rgba(38,22,18,0.08)', padding: '1.5rem', marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ca)', marginBottom: '1rem' }}>Capacidades</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.5rem', textAlign: 'center' }}>
                {[
                  { label: 'Teatro', val: espacio.caps.teatro },
                  { label: 'Escuela', val: espacio.caps.escuela },
                  { label: 'Cóctel', val: espacio.caps.coctel },
                  { label: 'Banquete', val: espacio.caps.banquete },
                  { label: 'm²', val: espacio.caps.m2 },
                ].map((c, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', color: 'var(--ca)', lineHeight: 1 }}>{c.val}</div>
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cs)', marginTop: '0.3rem' }}>{c.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setForm(prev => ({ ...prev, espacio: espacio.nombre })); document.getElementById('propuesta')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{ padding: '0.9rem 2.5rem', background: 'var(--ca)', color: 'var(--cp)', border: 'none', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Roboto',sans-serif", borderRadius: '1px' }}
            >
              Solicitar propuesta para este espacio
            </button>
          </div>
        </div>
      </div>

      {/* TIPOS DE EVENTO */}
      <div style={{ padding: '6rem 3rem', background: 'var(--cp)', borderBottom: '1px solid rgba(38,22,18,0.08)' }}>
        <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 4rem' }}>
          <p style={labelStyle}>Especialidades</p>
          <h2 style={titleStyle}>Tipos de <em style={{ fontStyle: 'italic', color: 'var(--ca)' }}>Evento</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5px', background: 'rgba(38,22,18,0.1)' }}>
          {tiposEvento.map((t, i) => <TipoCard key={i} {...t} />)}
        </div>
      </div>

      {/* FORMULARIO */}
      <div style={{ padding: '6rem 3rem', background: 'var(--cp)' }} id="propuesta">
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={labelStyle}>Cotización</p>
            <h2 style={titleStyle}>Solicita tu <em style={{ fontStyle: 'italic', color: 'var(--ca)' }}>propuesta personalizada</em></h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--cs)', lineHeight: 1.7, marginTop: '0.75rem', maxWidth: '540px', margin: '0.75rem auto 0' }}>
              Cuéntanos sobre tu evento y en menos de 24 horas recibirás una propuesta detallada. Tu solicitud se registra en Odoo CRM.
            </p>
          </div>

          {status === 'success' ? (
            <SuccessMessage leadId={leadId} onReset={() => { setStatus('idle'); setForm({ empresa: '', contacto: '', email: '', telefono: '', fecha: '', asistentes: '1 – 50 personas', tipo_evento: 'Congreso / Convención', espacio: 'Gran Salón Charro', descripcion: '' }) }} />
          ) : (
            <form onSubmit={handleSubmit} style={{ border: '1px solid rgba(38,22,18,0.12)', padding: '3rem' }}>

              {/* Espacio seleccionado */}
              <div style={{ background: 'rgba(95,54,33,0.06)', border: '1px solid rgba(95,54,33,0.12)', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ca)', marginBottom: '0.2rem' }}>Espacio seleccionado</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", color: 'var(--ct)', fontSize: '1rem' }}>{form.espacio}</p>
                </div>
                <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontSize: '0.72rem', color: 'var(--ca)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em', textDecoration: 'underline', fontFamily: "'Roboto',sans-serif" }}>
                  Cambiar
                </button>
              </div>

              <div style={grid2}>
                <FormGroup label="Empresa / Organización *">
                  <input name="empresa" type="text" required placeholder="Nombre de tu empresa" value={form.empresa} onChange={handleChange} style={inputStyle} />
                </FormGroup>
                <FormGroup label="Nombre del contacto *">
                  <input name="contacto" type="text" required placeholder="Tu nombre completo" value={form.contacto} onChange={handleChange} style={inputStyle} />
                </FormGroup>
              </div>

              <div style={grid2}>
                <FormGroup label="Email *">
                  <input name="email" type="email" required placeholder="tu@empresa.com" value={form.email} onChange={handleChange} style={inputStyle} />
                </FormGroup>
                <FormGroup label="Teléfono *">
                  <input name="telefono" type="tel" required placeholder="+52 (771) 000-0000" value={form.telefono} onChange={handleChange} style={inputStyle} />
                </FormGroup>
              </div>

              <div style={grid2}>
                <FormGroup label="Fecha del evento">
                  <input name="fecha" type="date" value={form.fecha} onChange={handleChange} style={inputStyle} min={new Date().toISOString().split('T')[0]} />
                </FormGroup>
                <FormGroup label="Número de asistentes">
                  <select name="asistentes" value={form.asistentes} onChange={handleChange} style={inputStyle}>
                    {['1 – 50 personas', '51 – 200 personas', '201 – 500 personas', '501 – 1,000 personas', '1,001 – 3,000 personas', 'Más de 3,000 personas'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </FormGroup>
              </div>

              <div style={grid2}>
                <FormGroup label="Tipo de evento">
                  <select name="tipo_evento" value={form.tipo_evento} onChange={handleChange} style={inputStyle}>
                    {['Congreso / Convención', 'Conferencia corporativa', 'Lanzamiento de producto', 'Boda / Evento social', 'Exposición / Feria', 'Cena de gala', 'Evento charro / Cultural', 'Otro'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </FormGroup>
                <FormGroup label="Espacio de interés">
                  <select name="espacio" value={form.espacio} onChange={handleChange} style={inputStyle}>
                    {espacios.map(e => <option key={e.id}>{e.nombre}</option>)}
                    <option>No sé / Necesito asesoría</option>
                  </select>
                </FormGroup>
              </div>

              <FormGroup label="Descripción del evento">
                <textarea name="descripcion" rows={4} placeholder="Cuéntanos más sobre tu evento: tema, objetivo, servicios adicionales que necesitas (catering, audiovisual, hospedaje, etc.)..." value={form.descripcion} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} />
              </FormGroup>

              {status === 'error' && (
                <div style={{ background: 'rgba(139,0,0,0.06)', border: '1px solid rgba(139,0,0,0.15)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#8B0000' }}>
                  Ocurrió un error. Por favor intenta de nuevo o contáctanos directamente.
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} style={{ width: '100%', padding: '1rem', background: status === 'loading' ? 'var(--cs)' : 'var(--ca)', color: 'var(--cp)', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Roboto',sans-serif", borderRadius: '1px', transition: 'background 0.3s' }}>
                {status === 'loading' ? 'Enviando...' : 'Enviar Solicitud de Propuesta'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--cs)', textTransform: 'uppercase' }}>
                  Tu solicitud crea un Lead en Odoo CRM · Respuesta en 24 horas
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

function TipoCard({ emoji, nombre, desc }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? 'var(--ca)' : 'var(--cp)', padding: '2rem', textAlign: 'center', transition: 'background 0.3s', cursor: 'default' }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{emoji}</div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', color: hovered ? 'var(--cp)' : 'var(--ct)', marginBottom: '0.5rem', fontWeight: 400, transition: 'color 0.3s' }}>{nombre}</h3>
      <p style={{ fontSize: '0.83rem', color: hovered ? 'rgba(250,244,230,0.8)' : 'var(--cs)', lineHeight: 1.7, transition: 'color 0.3s' }}>{desc}</p>
    </div>
  )
}

function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ca)', marginBottom: '0.4rem', fontWeight: 600 }}>{label}</label>
      {children}
    </div>
  )
}

function SuccessMessage({ leadId, onReset }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px solid rgba(38,22,18,0.12)' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: 'var(--ct)', marginBottom: '0.75rem', fontWeight: 400 }}>¡Solicitud enviada!</h3>
      <p style={{ fontSize: '0.95rem', color: 'var(--cs)', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 0.5rem' }}>
        Tu propuesta fue registrada con éxito. Un ejecutivo te contactará en menos de 24 horas.
      </p>
      {leadId && (
        <p style={{ fontSize: '0.78rem', color: 'var(--cs)', marginBottom: '2rem' }}>
          ID de referencia: <strong style={{ color: 'var(--ca)' }}>#{leadId}</strong>
        </p>
      )}
      <button onClick={onReset} style={{ padding: '0.85rem 2rem', background: 'transparent', color: 'var(--ca)', border: '1px solid var(--ca)', cursor: 'pointer', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Roboto',sans-serif", borderRadius: '1px' }}>
        Enviar otra solicitud
      </button>
    </div>
  )
}

const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }
const inputStyle = { width: '100%', padding: '0.8rem 1rem', background: 'var(--cp)', border: '1px solid rgba(38,22,18,0.2)', color: 'var(--ct)', fontSize: '0.9rem', fontFamily: "'Roboto',sans-serif", fontWeight: 300, borderRadius: '1px', transition: 'border-color 0.3s' }
const eyebrow = { fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cs)', marginBottom: '0.8rem', fontWeight: 400 }
const labelStyle = { fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cs)', marginBottom: '0.6rem', fontWeight: 400, display: 'block' }
const titleStyle = { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.6rem,2.5vw,2.4rem)', fontWeight: 400, color: 'var(--ct)', lineHeight: 1.2 }