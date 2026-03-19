import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--cdark)', padding: '4rem 3rem 2rem' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: '3rem', marginBottom: '3rem', paddingBottom: '3rem',
        borderBottom: '1px solid rgba(250,244,230,0.07)',
      }}>
        <div>
          <span style={{
            fontFamily: "'Playfair Display', serif", fontSize: '1.3rem',
            letterSpacing: '0.1em', color: 'var(--cp)', display: 'block', marginBottom: '1rem',
          }}>Mundo Charro</span>
          <p style={{ fontSize: '0.83rem', color: 'rgba(250,244,230,0.35)', lineHeight: 1.8, maxWidth: '230px' }}>
            Un destino donde la tradición charra y la hospitalidad moderna se encuentran en Singuilucan, Hidalgo.
          </p>
        </div>
        <FooterCol title="Servicios" links={[
          { label: 'Hotel', href: '/hotel' },
          { label: 'Convenciones', href: '/convenciones' },
          { label: 'Parque Temático', href: '/parque' },
          { label: 'Corporativo', href: '/corporativo' },
        ]} />
        <FooterCol title="Empresa" links={[
          { label: 'Historia', href: '/#narrativa' },
          { label: 'Cultura', href: '/#narrativa' },
          { label: 'Inversionistas', href: '/corporativo' },
          { label: 'Sala de Prensa', href: '/corporativo' },
        ]} />
        <FooterCol title="Contacto" links={[
          { label: 'Reservaciones', href: '/hotel' },
          { label: 'Eventos', href: '/convenciones' },
          { label: 'Corporativo', href: '/corporativo' },
          { label: 'Sustentabilidad', href: '/corporativo' },
        ]} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.72rem', color: 'rgba(250,244,230,0.2)', letterSpacing: '0.05em' }}>
          © 2025 Mundo Charro · Singuilucan, Hidalgo
        </p>
        <p style={{ fontSize: '0.72rem', color: 'rgba(250,244,230,0.2)', letterSpacing: '0.05em' }}>
          Aviso de privacidad · Términos de uso
        </p>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h5 style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cs)', marginBottom: '1.2rem', fontWeight: 400 }}>
        {title}
      </h5>
      {links.map((l, i) => (
        <Link key={i} href={l.href} style={{ display: 'block', fontSize: '0.83rem', color: 'rgba(250,244,230,0.38)', textDecoration: 'none', marginBottom: '0.6rem' }}>
          {l.label}
        </Link>
      ))}
    </div>
  )
}