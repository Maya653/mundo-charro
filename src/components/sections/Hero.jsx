'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section style={{
      height: '100vh', position: 'relative',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', overflow: 'hidden',
      marginTop: '-88px',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #1a0f0a 0%, #38331C 40%, #5F3621 70%, #A69A7B 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,15,10,0.42)' }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(250,244,230,0.5) 40px, rgba(250,244,230,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(250,244,230,0.5) 40px, rgba(250,244,230,0.5) 41px)`,
      }} />

      <div style={{ position: 'relative', textAlign: 'center', padding: '0 2rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cs)', marginBottom: '1.5rem', fontWeight: 400 }}>
          Singuilucan, Hidalgo · México
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          fontWeight: 400, color: 'var(--cp)',
          lineHeight: 1.15, marginBottom: '1.5rem', textAlign: 'center',
        }}>
          Una experiencia<br />
          <em style={{ fontStyle: 'italic', color: '#e8d5b0' }}>única en su tipo</em>
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'rgba(250,244,230,0.65)', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.8, fontWeight: 300 }}>
          Hotel, convenciones, parque temático y corporativo. Un ecosistema diseñado para momentos que perduran.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/hotel#reservas" style={{ padding: '0.85rem 2rem', background: 'var(--ca)', color: 'var(--cp)', border: 'none', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '1px', fontFamily: "'Roboto', sans-serif", textDecoration: 'none', display: 'inline-block' }}>
            Reservar habitación
          </Link>
          <Link href="/#narrativa" style={{ padding: '0.85rem 2rem', background: 'transparent', color: 'var(--cp)', border: '1px solid rgba(250,244,230,0.35)', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '1px', fontFamily: "'Roboto', sans-serif", textDecoration: 'none', display: 'inline-block' }}>
            Conocer más
          </Link>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(250,244,230,0.35)' }}>Descubrir</span>
        <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, rgba(250,244,230,0.35), transparent)', animation: 'scrollAnim 1.8s ease-in-out infinite' }} />
      </div>
      <style>{`@keyframes scrollAnim { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </section>
  )
}