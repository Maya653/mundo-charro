const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export async function getDisponibilidad(fechaIn, fechaOut) {
  const res = await fetch(`${API_URL}/api/hotel/disponibilidad?fechaIn=${fechaIn}&fechaOut=${fechaOut}`)
  if (!res.ok) throw new Error('Error al obtener disponibilidad')
  return res.json()
}

export async function crearReserva(datos) {
  const res = await fetch(`${API_URL}/api/hotel/reservar`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!res.ok) throw new Error('Error al crear reserva')
  return res.json()
}

export async function getEspacios() {
  const res = await fetch(`${API_URL}/api/convenciones/espacios`)
  if (!res.ok) throw new Error('Error al obtener espacios')
  return res.json()
}

export async function crearSolicitudConvenciones(datos) {
  const res = await fetch(`${API_URL}/api/convenciones/solicitud`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!res.ok) throw new Error('Error al enviar solicitud')
  return res.json()
}

export async function crearContacto(datos) {
  const res = await fetch(`${API_URL}/api/contacto`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!res.ok) throw new Error('Error al enviar contacto')
  return res.json()
}