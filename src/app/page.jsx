import Hero from '@/components/sections/Hero'
import Noticias from '@/components/sections/Noticias'
import Ecosistema from '@/components/sections/Ecosistema'
import Narrativa from '@/components/sections/Narrativa'
import Stats from '@/components/sections/Stats'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Noticias />
      <Ecosistema />
      <Narrativa />
      <Stats />
    </>
  )
}