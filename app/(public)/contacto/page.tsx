import type { Metadata } from 'next'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Send,
  MessageSquare,
  Headphones,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contacto | BoatMarket',
  description:
    'Contactanos para consultas generales, soporte t\u00e9cnico o alianzas comerciales. Estamos en Puerto Madero, Buenos Aires. Respond\u00e9mos en menos de 24 horas.',
  openGraph: {
    title: 'Contacto | BoatMarket',
    description:
      'Ponete en contacto con el equipo de BoatMarket. Estamos para ayudarte.',
    type: 'website',
  },
}

/* ---------- Data ---------- */
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@boatmarket.com.ar',
    href: 'mailto:info@boatmarket.com.ar',
  },
  {
    icon: Phone,
    label: 'Tel\u00e9fono',
    value: '+54 11 5555-0000',
    href: 'tel:+541155550000',
  },
  {
    icon: MapPin,
    label: 'Direcci\u00f3n',
    value: 'Puerto Madero, Buenos Aires, Argentina',
    href: null,
  },
]

const schedule = [
  { day: 'Lunes a Viernes', hours: '9:00 a 18:00 hs' },
  { day: 'S\u00e1bados', hours: '10:00 a 14:00 hs' },
  { day: 'Domingos y Feriados', hours: 'Cerrado' },
]

const socialLinks = [
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://instagram.com/boatmarket',
    handle: '@boatmarket',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://facebook.com/boatmarket',
    handle: '/boatmarket',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://youtube.com/boatmarket',
    handle: '/boatmarket',
  },
]

const subjectOptions = [
  'Consulta General',
  'Soporte T\u00e9cnico',
  'Publicar Embarcaci\u00f3n',
  'Alianzas Comerciales',
  'Otro',
]

/* ---------- Page ---------- */
export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* \u2500\u2500 Breadcrumb \u2500\u2500 */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Contacto</span>
          </nav>
        </div>
      </div>

      {/* \u2500\u2500 Hero \u2500\u2500 */}
      <section className="relative bg-navy-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-5">
            <Headphones className="h-7 w-7 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contacto
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            \u00bfTen\u00e9s alguna consulta? Estamos ac\u00e1 para ayudarte.
            Respond\u00e9mos en menos de 24 horas.
          </p>
        </div>
      </section>

      {/* \u2500\u2500 Main Content: 2 Columns \u2500\u2500 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* \u2500\u2500 Left Column: Contact Info (2/5) \u2500\u2500 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact details */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Informaci\u00f3n de Contacto
              </h2>
              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-base font-semibold text-gray-900">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <Card className="border-gray-200">
              <CardContent className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Horario de Atenci\u00f3n
                </h3>
                <ul className="space-y-3">
                  {schedule.map((s) => (
                    <li
                      key={s.day}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600">{s.day}</span>
                      <span
                        className={`font-medium ${
                          s.hours === 'Cerrado'
                            ? 'text-red-500'
                            : 'text-gray-900'
                        }`}
                      >
                        {s.hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Social Media */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-4">
                Seguinos en Redes
              </h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl hover:bg-sky-50 hover:text-blue-600 transition-colors text-sm text-gray-700"
                    title={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="hidden sm:inline font-medium">
                      {social.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* \u2500\u2500 Right Column: Contact Form (3/5) \u2500\u2500 */}
          <div className="lg:col-span-3">
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-navy-900 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Envi\u00e1nos un Mensaje
                    </h2>
                    <p className="text-sm text-gray-500">
                      Complet\u00e1 el formulario y te respondemos a la brevedad.
                    </p>
                  </div>
                </div>

                <form className="space-y-5">
                  {/* Row: Nombre + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="nombre"
                        className="text-sm font-medium text-gray-700"
                      >
                        Nombre <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="nombre"
                        type="text"
                        placeholder="Tu nombre completo"
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Row: Tel\u00e9fono + Asunto */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="telefono"
                        className="text-sm font-medium text-gray-700"
                      >
                        Tel\u00e9fono{' '}
                        <span className="text-gray-400 font-normal">
                          (opcional)
                        </span>
                      </Label>
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder="+54 11 xxxx-xxxx"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="asunto"
                        className="text-sm font-medium text-gray-700"
                      >
                        Asunto <span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="asunto"
                        required
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Seleccion\u00e1 un asunto
                        </option>
                        {subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="mensaje"
                      className="text-sm font-medium text-gray-700"
                    >
                      Mensaje <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Cont\u00e1nos en qu\u00e9 podemos ayudarte..."
                      required
                      rows={5}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-5 text-base gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Enviar Mensaje
                  </Button>

                  <p className="text-xs text-gray-400">
                    Al enviar este formulario acept\u00e1s nuestra{' '}
                    <Link
                      href="/privacidad"
                      className="underline hover:text-blue-600"
                    >
                      pol\u00edtica de privacidad
                    </Link>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* \u2500\u2500 Map Placeholder \u2500\u2500 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Nuestra Ubicaci\u00f3n
        </h2>
        <div className="relative h-72 md:h-96 bg-gray-200 rounded-2xl overflow-hidden border border-gray-300">
          {/* Map placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <MapPin className="h-12 w-12 mb-3" />
            <p className="text-lg font-medium">Mapa de ubicaci\u00f3n</p>
            <p className="text-sm mt-1">Puerto Madero, Buenos Aires</p>
          </div>

          {/* Overlay card */}
          <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 max-w-xs">
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              BoatMarket HQ
            </h3>
            <p className="text-xs text-gray-600">
              Puerto Madero, Buenos Aires, Argentina
            </p>
            <a
              href="https://maps.google.com/?q=Puerto+Madero+Buenos+Aires"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium mt-2 hover:underline"
            >
              Ver en Google Maps
              <ChevronRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
