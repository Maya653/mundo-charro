'use client'

import { useState, useEffect } from 'react'

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
          name: `Boleto FIFA — ${datos.categoria} × ${datos.cantidad} — ${datos.nombre}`,
          contact_name: datos.nombre,
          email_from: datos.email,
          phone: datos.telefono,
          tag_ids: [[4, 23]],
          description:
            `Evento: Copa Mundial FIFA — Inauguración\n` +
            `Categoría: ${datos.categoria}\n` +
            `Cantidad: ${datos.cantidad}\n` +
            `Total: $${datos.total} MXN`,
        }]]
      }
    })
  })
  const leadJson = await leadRes.json()
  const leadId = leadJson?.result
  if (!leadId) throw new Error('Lead fallido')
  return leadId
}

const precios = { General: 2800, Preferente: 5500, VIP: 8500 }

const proximosEventos = [
  { dia: '11', mes: 'Jun 2026', badge: '⚽ Copa Mundial FIFA', titulo: 'Ceremonia de Inauguración', lugar: 'Centro de Espectáculos · 18:00 hrs', cta: 'Boletos', ctaHref: '#boletos', accent: true },
  { dia: '15', mes: 'Ago 2025', badge: '🤠 Charrería', titulo: 'Campeonato Nacional de Charrería', lugar: 'Lienzo Charro Principal · Todo el día', cta: 'Próximamente', ctaHref: '#' },
  { dia: '22', mes: 'Sep 2025', badge: '🎵 Música', titulo: 'Noche de Mariachi y Folklor', lugar: 'Plaza Central · 20:00 hrs', cta: 'Próximamente', ctaHref: '#' },
]

export default function EventosPage() {
  const [countdown, setCountdown] = useState({ d: '--', h: '--', m: '--', s: '--' })
  const [selectedCat, setSelectedCat] = useState('Preferente')
  const [cantidad, setCantidad] = useState(1)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '' })
  const [status, setStatus] = useState('idle')
  const [leadId, setLeadId] = useState(null)

  useEffect(() => {
    const target = new Date('2026-06-11T18:00:00-06:00')
    const timer = setInterval(() => {
      const diff = target - new Date()
      if (diff <= 0) { clearInterval(timer); return }
      setCountdown({
        d: String(Math.floor(diff / 86400000)).padStart(2, '0'),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const total = precios[selectedCat] * cantidad

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const id = await crearLead({ ...form, categoria: selectedCat, cantidad, total: total.toLocaleString() })
      setLeadId(id)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div style={{ background: 'var(--cp)', minHeight: '100vh' }}>

      {/* HERO FIFA */}
      <div id="fifa" style={{ background: 'var(--cad)', padding: '6rem 3rem 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(250,244,230,.5) 40px,rgba(250,244,230,.5) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(250,244,230,.5) 40px,rgba(250,244,230,.5) 41px)` }} />
        <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            {/* Badge preventa */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(139,50,50,0.25)', border: '1px solid rgba(200,80,80,0.3)', padding: '0.4rem 1.2rem', borderRadius: '1px', marginBottom: '1.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E88080', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8a0a0' }}>Preventa Activa — Boletos Limitados</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.5rem,5vw,4.5rem)', color: 'var(--cp)', lineHeight: 1.05, marginBottom: '1rem', fontWeight: 400 }}>
              Copa Mundial<br />
              <em style={{ fontStyle: 'italic', color: '#C4913A' }}>de la FIFA 2026</em>
            </h1>
            <p style={{ color: 'rgba(250,244,230,0.65)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.8, fontWeight: 300 }}>
              Vive la Ceremonia de Inauguración en el estadio más espectacular de México. Sé parte de la historia del fútbol mundial.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {['⚽ 11 de Junio, 2026', '📍 Mundo Charro, Hidalgo', '🏟️ 15,000 Aficionados'].map((b, i) => (
                <span key={i} style={{ fontSize: '0.72rem', letterSpacing: '0.1em', padding: '0.3rem 0.9rem', border: '1px solid rgba(95,54,33,0.4)', color: 'var(--cs)', borderRadius: '1px' }}>{b}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#boletos" style={{ padding: '0.9rem 2rem', background: 'var(--ca)', color: 'var(--cp)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '1px', fontFamily: "'Roboto',sans-serif" }}>
                Comprar Boletos
              </a>
              <a href="#proximos" style={{ padding: '0.9rem 2rem', background: 'transparent', color: 'var(--cp)', border: '1px solid rgba(250,244,230,0.3)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '1px', fontFamily: "'Roboto',sans-serif" }}>
                Más Eventos
              </a>
            </div>
          </div>

          {/* Countdown */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '6rem', lineHeight: 1, marginBottom: '1.5rem' }}>⚽</div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cs)', marginBottom: '1rem' }}>Cuenta regresiva</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              {[{ val: countdown.d, label: 'Días' }, { val: countdown.h, label: 'Horas' }, { val: countdown.m, label: 'Min' }, { val: countdown.s, label: 'Seg' }].map((c, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.5rem', color: 'var(--cp)', background: 'rgba(250,244,230,0.08)', border: '1px solid rgba(250,244,230,0.12)', padding: '0.8rem 1rem', minWidth: '72px', lineHeight: 1 }}>{c.val}</div>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cs)', marginTop: '0.4rem' }}>{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOLETOS */}
      <div id="boletos" style={{ padding: '6rem 3rem', background: 'var(--cp)', borderBottom: '1px solid rgba(38,22,18,0.08)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={labelStyle}>Preventa de Boletos</p>
            <h2 style={titleStyle}>Elige tu <em style={{ fontStyle: 'italic', color: 'var(--ca)' }}>experiencia FIFA</em></h2>
            <p style={{ color: 'var(--cs)', fontSize: '0.9rem', marginTop: '0.75rem', maxWidth: '500px', margin: '0.75rem auto 0', lineHeight: 1.7 }}>
              Todos los boletos incluyen acceso al área de fanáticos y espectáculos previos.
            </p>
          </div>

          {/* Cards de boletos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
            {[
              { cat: 'General', precio: 2800, popular: false, features: ['Acceso zona general', 'Pantallas gigantes', 'Zona de comida y bebida', 'Espectáculo charro previo', 'Recuerdo oficial'] },
              { cat: 'Preferente', precio: 5500, popular: true, features: ['Asiento numerado zona media', 'Vista privilegiada del campo', 'Acceso a lounge exclusivo', 'Bebida de bienvenida', 'Programa oficial FIFA', 'Todo lo de General'] },
              { cat: 'VIP', precio: 8500, popular: false, features: ['Palco privado mejor vista', 'Catering gourmet incluido', 'Estacionamiento VIP', 'Acceso área de jugadores', 'Fotografía con trofeo FIFA', 'Traslado hotel-estadio'] },
            ].map((b, i) => (
              <BoletoCard key={i} {...b} selected={selectedCat === b.cat} onSelect={() => setSelectedCat(b.cat)} />
            ))}
          </div>

          {/* Formulario compra */}
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            {status === 'success' ? (
              <SuccessMessage leadId={leadId} onReset={() => { setStatus('idle'); setForm({ nombre: '', email: '', telefono: '' }); setSelectedCat('Preferente'); setCantidad(1) }} />
            ) : (
              <form onSubmit={handleSubmit} style={{ border: '1px solid rgba(38,22,18,0.12)', padding: '3rem' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.6rem', color: 'var(--ct)', marginBottom: '0.5rem', fontWeight: 400 }}>Pre-registro de Boletos</h3>
                <p style={{ color: 'var(--cs)', fontSize: '0.88rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                  Registra tu interés y recibirás instrucciones de pago. Tu lugar queda reservado por 48 horas.
                </p>

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
                  <FormGroup label="Categoría">
                    <select value={selectedCat} onChange={e => setSelectedCat(e.target.value)} style={inputStyle}>
                      <option value="General">General — $2,800 MXN</option>
                      <option value="Preferente">Preferente — $5,500 MXN</option>
                      <option value="VIP">VIP / Palco — $8,500 MXN</option>
                    </select>
                  </FormGroup>
                  <FormGroup label="Cantidad">
                    <select value={cantidad} onChange={e => setCantidad(parseInt(e.target.value))} style={inputStyle}>
                      {[1, 2, 3, 4, 5, 10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'boleto' : 'boletos'}{n === 10 ? ' (grupo)' : ''}</option>)}
                    </select>
                  </FormGroup>
                </div>

                {/* Total */}
                <div style={{ background: 'rgba(95,54,33,0.06)', border: '1px solid rgba(95,54,33,0.12)', padding: '1.2rem 1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cs)' }}>Total estimado</span>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: 'var(--ca)' }}>${total.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--cs)' }}>MXN</span></span>
                </div>

                {status === 'error' && (
                  <div style={{ background: 'rgba(139,0,0,0.06)', border: '1px solid rgba(139,0,0,0.15)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#8B0000' }}>
                    Ocurrió un error. Por favor intenta de nuevo.
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'} style={{ width: '100%', padding: '1rem', background: status === 'loading' ? 'var(--cs)' : 'var(--ca)', color: 'var(--cp)', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Roboto',sans-serif", borderRadius: '1px' }}>
                  {status === 'loading' ? 'Enviando...' : 'Registrar Pre-compra'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--cs)', textTransform: 'uppercase' }}>
                    Se crea un Lead en Odoo CRM automáticamente
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* PRÓXIMOS EVENTOS */}
      <div id="proximos" style={{ padding: '6rem 3rem', background: 'var(--cp)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <p style={labelStyle}>Calendario</p>
          <h2 style={{ ...titleStyle, marginBottom: '3rem' }}>Próximos <em style={{ fontStyle: 'italic', color: 'var(--ca)' }}>Espectáculos</em></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {proximosEventos.map((ev, i) => (
              <EventoRow key={i} {...ev} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        input:focus, select:focus { outline: none; border-color: var(--ca) !important; }
        input::placeholder { color: var(--cs); opacity: 0.7; }
      `}</style>
    </div>
  )
}

function BoletoCard({ cat, precio, popular, features, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{ border: selected ? '2px solid var(--ca)' : '1px solid rgba(38,22,18,0.12)', background: selected ? 'rgba(95,54,33,0.04)' : 'var(--cp)', cursor: 'pointer', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
    >
      {popular && (
        <div style={{ background: 'var(--ca)', padding: '0.35rem', textAlign: 'center', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cp)', fontFamily: "'Roboto',sans-serif" }}>
          Más Popular
        </div>
      )}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(38,22,18,0.08)' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: selected ? 'var(--ca)' : 'var(--cs)', marginBottom: '0.5rem' }}>Zona {cat}</p>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.5rem', color: selected ? 'var(--ca)' : 'var(--ct)', lineHeight: 1 }}>
          ${precio.toLocaleString()}
          <span style={{ fontSize: '0.9rem', color: 'var(--cs)', fontFamily: "'Roboto',sans-serif", marginLeft: '0.3rem' }}>MXN</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--cs)', marginTop: '0.3rem' }}>por persona</p>
      </div>
      <div style={{ padding: '1.5rem' }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--ct)' }}>
            <span style={{ color: 'var(--ca)', fontSize: '0.6rem', flexShrink: 0 }}>✦</span>
            {f}
          </div>
        ))}
      </div>
      <div style={{ padding: '0 1.5rem 1.5rem' }}>
        <div style={{ width: '100%', padding: '0.7rem', background: selected ? 'var(--ca)' : 'transparent', color: selected ? 'var(--cp)' : 'var(--ca)', border: `1px solid ${selected ? 'var(--ca)' : 'rgba(95,54,33,0.3)'}`, textAlign: 'center', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '1px', transition: 'all 0.3s' }}>
          {selected ? '✓ Seleccionado' : 'Seleccionar'}
        </div>
      </div>
    </div>
  )
}

function EventoRow({ dia, mes, badge, titulo, lugar, cta, ctaHref, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1.5rem 2rem', border: '1px solid rgba(38,22,18,0.1)', background: 'var(--cp)', flexWrap: 'wrap', transition: 'border-color 0.3s' }}>
      <div style={{ textAlign: 'center', minWidth: '60px' }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: 'var(--ca)', lineHeight: 1 }}>{dia}</div>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cs)' }}>{mes}</div>
      </div>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.2rem 0.7rem', background: accent ? 'rgba(95,54,33,0.1)' : 'rgba(166,154,123,0.1)', color: accent ? 'var(--ca)' : 'var(--cs)', borderRadius: '1px', display: 'inline-block', marginBottom: '0.5rem' }}>{badge}</span>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: 'var(--ct)', marginBottom: '0.3rem' }}>{titulo}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--cs)' }}>{lugar}</div>
      </div>
      <a href={ctaHref} style={{ padding: '0.7rem 1.5rem', background: accent ? 'var(--ca)' : 'transparent', color: accent ? 'var(--cp)' : 'var(--ca)', border: `1px solid ${accent ? 'var(--ca)' : 'rgba(95,54,33,0.3)'}`, textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '1px', fontFamily: "'Roboto',sans-serif" }}>
        {cta}
      </a>
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
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: 'var(--ct)', marginBottom: '0.75rem', fontWeight: 400 }}>¡Pre-registro completado!</h3>
      <p style={{ fontSize: '0.95rem', color: 'var(--cs)', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 0.5rem' }}>
        Te enviaremos instrucciones de pago a tu correo. Tu lugar queda reservado por 48 horas.
      </p>
      {leadId && <p style={{ fontSize: '0.78rem', color: 'var(--cs)', marginBottom: '2rem' }}>ID de referencia: <strong style={{ color: 'var(--ca)' }}>#{leadId}</strong></p>}
      <button onClick={onReset} style={{ padding: '0.85rem 2rem', background: 'transparent', color: 'var(--ca)', border: '1px solid var(--ca)', cursor: 'pointer', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Roboto',sans-serif", borderRadius: '1px' }}>
        Nuevo registro
      </button>
    </div>
  )
}

const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }
const inputStyle = { width: '100%', padding: '0.8rem 1rem', background: 'var(--cp)', border: '1px solid rgba(38,22,18,0.2)', color: 'var(--ct)', fontSize: '0.9rem', fontFamily: "'Roboto',sans-serif", fontWeight: 300, borderRadius: '1px', transition: 'border-color 0.3s' }
const labelStyle = { fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cs)', marginBottom: '0.6rem', fontWeight: 400, display: 'block' }
const titleStyle = { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.6rem,2.5vw,2.4rem)', fontWeight: 400, color: 'var(--ct)', lineHeight: 1.2 }