import '../styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Mundo Charro — Hidalgo, Mx.',
  description: 'Hotel, convenciones, parque temático y corporativo en Singuilucan, Hidalgo.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main style={{ paddingTop: '88px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}