'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const universoLinks = [
  {
    href: '/hotel',
    label: 'Hotel',
    submenu: [
      { href: '/hotel#habitaciones', label: 'Habitaciones' },
      { href: '/hotel#amenidades', label: 'Amenidades' },
      { href: '/hotel#galeria', label: 'Galería' },
      { href: '/hotel#reservas', label: 'Reservaciones' },
    ]
  },
  {
    href: '/convenciones',
    label: 'Centro de Convenciones',
    submenu: [
      { href: '/convenciones#espacios', label: 'Espacios' },
      { href: '/convenciones#tipos', label: 'Tipos de Evento' },
      { href: '/convenciones#propuesta', label: 'Solicitar Propuesta' },
    ]
  },
  {
    href: '/eventos',
    label: 'Eventos',
    submenu: [
      { href: '/eventos#fifa', label: 'Copa Mundial FIFA' },
      { href: '/eventos#boletos', label: 'Comprar Boletos' },
      { href: '/eventos#proximos', label: 'Próximos Eventos' },
    ]
  },
  {
    href: '/parque',
    label: 'Parque Temático',
    submenu: [
      { href: '/parque', label: 'Próximamente' },
    ]
  },
  {
    href: '/corporativo',
    label: 'Corporativo',
    submenu: [
      { href: '/corporativo#quienes', label: 'Quiénes Somos' },
      { href: '/corporativo#inversionistas', label: 'Inversionistas' },
      { href: '/corporativo#prensa', label: 'Sala de Prensa' },
      { href: '/corporativo#sustentabilidad', label: 'Sustentabilidad' },
      { href: '/corporativo#contacto', label: 'Contacto Corporativo' },
    ]
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const dropdownRef = useRef(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
        setActiveSubmenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

const handleDropdownEnter = () => {
    clearTimeout(closeTimer.current)
    setDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => {
      setDropdownOpen(false)
      setActiveSubmenu(null)
    }, 300)
  }
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: 'rgba(250,244,230,0.97)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(38,22,18,0.08)',
      boxShadow: scrolled ? '0 2px 20px rgba(38,22,18,0.1)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      {/* Top idioma */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.3rem 2.5rem', gap: '1.2rem', borderBottom: '1px solid rgba(38,22,18,0.06)' }}>
        <Link href="#" style={topLink}>🌐 EN</Link>
        <Link href="#" style={topLink}>ES</Link>
      </div>

      {/* Main */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 2.5rem', gap: '2rem' }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--ct)', textTransform: 'uppercase', lineHeight: 1 }}>
            Mundo Charro
            <span style={{ display: 'block', fontSize: '0.52rem', letterSpacing: '0.35em', color: 'var(--cs)', fontFamily: "'Roboto', sans-serif", fontWeight: 400, marginTop: '0.15rem' }}>
              Hidalgo, Mx.
            </span>
          </div>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>

          {/* Dropdown principal */}
          <div
            ref={dropdownRef}
            style={{ position: 'relative' }}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--ct)', letterSpacing: '0.05em', fontFamily: "'Roboto', sans-serif", display: 'flex', alignItems: 'center', gap: '0.3rem', padding: 0 }}
            >
              El Universo Mundo Charro®
              <span style={{ fontSize: '0.6rem', display: 'inline-block', transition: 'transform 0.3s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 1rem)', left: 0, background: 'rgba(250,244,230,0.98)', backdropFilter: 'blur(16px)', border: '1px solid rgba(38,22,18,0.1)', borderTop: '2px solid var(--ca)', minWidth: '240px', boxShadow: '0 8px 32px rgba(38,22,18,0.12)', zIndex: 300 }}>
                {universoLinks.map((item, i) => (
                  <div
                    key={i}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setActiveSubmenu(i)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <Link
                      href={item.href}
                      onClick={() => { setDropdownOpen(false); setActiveSubmenu(null) }}
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '0.75rem 1.4rem', fontSize: '0.82rem', color: 'var(--ct)',
                        textDecoration: 'none', letterSpacing: '0.04em',
                        borderBottom: i < universoLinks.length - 1 ? '1px solid rgba(38,22,18,0.06)' : 'none',
                        background: activeSubmenu === i ? 'rgba(95,54,33,0.06)' : 'transparent',
                        transition: 'background 0.2s',
                      }}
                    >
                      {item.label}
                      {item.submenu && <span style={{ fontSize: '0.6rem', color: 'var(--cs)', marginLeft: '0.5rem' }}>›</span>}
                    </Link>

                    {/* Submenú */}
                    {activeSubmenu === i && item.submenu && (
                      <div style={{
                        position: 'absolute', top: '0', left: '-210px',
                        background: 'rgba(250,244,230,0.98)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(38,22,18,0.1)',
                        borderTop: '2px solid var(--ca)',
                        minWidth: '210px',
                        boxShadow: '0 8px 32px rgba(38,22,18,0.12)',
                        zIndex: 400,
                      }}>
                        {item.submenu.map((sub, j) => (
                          <Link
                            key={j}
                            href={sub.href}
                            onClick={() => { setDropdownOpen(false); setActiveSubmenu(null) }}
                            style={{
                              display: 'block', padding: '0.65rem 1.4rem',
                              fontSize: '0.8rem', color: 'var(--ct)',
                              textDecoration: 'none', letterSpacing: '0.03em',
                              borderBottom: j < item.submenu.length - 1 ? '1px solid rgba(38,22,18,0.06)' : 'none',
                              transition: 'background 0.2s, color 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--ca)'; e.currentTarget.style.color = 'var(--cp)' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ct)' }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/contacto" style={navLink}>Contacto</Link>
        </div>
      </div>

      <div style={{ height: '2px', background: 'var(--cad)' }} />
    </nav>
  )
}

const topLink = { fontSize: '0.7rem', color: 'var(--ct)', textDecoration: 'none', letterSpacing: '0.08em' }
const navLink = { fontSize: '0.82rem', color: 'var(--ct)', textDecoration: 'none', letterSpacing: '0.05em' }