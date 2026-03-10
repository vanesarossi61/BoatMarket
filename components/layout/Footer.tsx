// =============================================
// BOATMARKET - Footer
// =============================================

import Link from 'next/link'
import { Anchor, Instagram, Facebook, Twitter, Youtube, Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const CATEGORIES = [
  { href: '/embarcaciones?type=lancha', label: 'Lanchas' },
  { href: '/embarcaciones?type=velero', label: 'Veleros' },
  { href: '/embarcaciones?type=yate', label: 'Yates' },
  { href: '/embarcaciones?type=moto-de-agua', label: 'Motos de Agua' },
  { href: '/embarcaciones?type=semirigido', label: 'Semirigidos' },
  { href: '/embarcaciones?type=pesca', label: 'Pesca' },
]

const COMPANY = [
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/publicar', label: 'Publicar Embarcacion' },
  { href: '/preguntas-frecuentes', label: 'Preguntas Frecuentes' },
]

const LEGAL = [
  { href: '/terminos', label: 'Terminos y Condiciones' },
  { href: '/privacidad', label: 'Politica de Privacidad' },
  { href: '/cookies', label: 'Politica de Cookies' },
]

const SOCIAL = [
  { href: 'https://instagram.com/boatmarket.ar', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com/boatmarket.ar', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com/boatmarket_ar', icon: Twitter, label: 'Twitter' },
  { href: 'https://youtube.com/@boatmarket', icon: Youtube, label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      {/* Newsletter */}
      <div className="bg-navy-gradient py-12">
        <div className="container text-center">
          <h3 className="mb-2 text-2xl font-bold text-white">
            Mantente al dia con BoatMarket
          </h3>
          <p className="mb-6 text-sky-200">
            Recibir las ultimas embarcaciones, ofertas y novedades nauticas.
          </p>
          <form className="mx-auto flex max-w-md gap-2">
            <Input
              type="email"
              placeholder="Tu email"
              className="bg-white/10 text-white placeholder:text-sky-300 border-white/20 focus:border-white"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
              <Mail className="mr-2 h-4 w-4" />
              Suscribirme
            </Button>
          </form>
        </div>
      </div>

      {/* Links Grid */}
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Column 1: Categories */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Categorias
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Empresa
            </h4>
            <ul className="space-y-2">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Legal
            </h4>
            <ul className="space-y-2">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>info@boatmarket.com.ar</li>
              <li>+54 11 5555-0100</li>
              <li>Av. Costanera Norte 1234</li>
              <li>Buenos Aires, Argentina</li>
            </ul>
            {/* Social Icons */}
            <div className="mt-4 flex gap-3">
              {SOCIAL.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Anchor className="h-4 w-4 text-blue-600" />
            <span>&copy; {new Date().getFullYear()} BoatMarket. Todos los derechos reservados.</span>
          </div>
          <p className="text-xs text-gray-400">
            Hecho con pasion nautica en Buenos Aires, Argentina.
          </p>
        </div>
      </div>
    </footer>
  )
}
