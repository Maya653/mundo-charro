const stats = [
  { num: '4', label: 'Destinos en uno' },
  { num: '15K', label: 'Capacidad explanada' },
  { num: '360°', label: 'Servicios integrados' },
  { num: 'Hgo.', label: 'Singuilucan, Hidalgo' },
]

export default function Stats() {
  return (
    <section style={{ background: 'var(--ca)', padding: '4.5rem 3rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: 'rgba(250,244,230,0.12)' }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: 'var(--ca)', padding: '2.5rem 2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 400, color: 'var(--cp)', lineHeight: 1, marginBottom: '0.6rem' }}>{s.num}</p>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,244,230,0.55)' }}>{s.label}</p>
        </div>
      ))}
    </section>
  )
}