import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChevronRight,
  Users,
  Clock,
  DollarSign,
  UserPlus,
  Camera,
  MessageSquare,
  Check,
  Star,
  ArrowRight,
  BarChart3,
  Award,
  Headphones,
  ChevronDown,
  Zap,
  Shield,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Public\u00e1 tu Embarcaci\u00f3n | BoatMarket',
  description:
    'Vend\u00e9 tu embarcaci\u00f3n en BoatMarket. Miles de compradores buscan lanchas, veleros y yates cada mes. Publicaci\u00f3n gratuita, consultas directas y herramientas para vendedores.',
  openGraph: {
    title: 'Public\u00e1 tu Embarcaci\u00f3n | BoatMarket',
    description:
      'Miles de compradores buscan embarcaciones como la tuya cada mes. Public\u00e1 gratis.',
    type: 'website',
  },
}

/* ---------- Data ---------- */
const stats = [
  {
    icon: Users,
    value: '12.000+',
    label: 'compradores activos',
  },
  {
    icon: Clock,
    value: '48hs',
    label: 'tiempo promedio de respuesta',
  },
  {
    icon: DollarSign,
    value: '$0',
    label: 'costo de publicaci\u00f3n b\u00e1sica',
  },
]

const steps = [
  {
    number: '1',
    icon: UserPlus,
    title: 'Cre\u00e1 tu cuenta',
    description:
      'Registrate en menos de 2 minutos con tu email o redes sociales. Es 100% gratuito.',
  },
  {
    number: '2',
    icon: Camera,
    title: 'Public\u00e1 tu embarcaci\u00f3n con fotos',
    description:
      'Agreg\u00e1 fotos de calidad, descripci\u00f3n detallada y precio. Nuestro asistente te gu\u00eda paso a paso.',
  },
  {
    number: '3',
    icon: MessageSquare,
    title: 'Recib\u00ed consultas y vend\u00e9',
    description:
      'Los compradores interesados te contactan directamente. Gestion\u00e1 todo desde tu dashboard.',
  },
]

interface Plan {
  name: string
  price: string
  period: string
  description: string
  popular: boolean
  features: string[]
  cta: string
  ctaVariant: 'default' | 'outline'
}

const plans: Plan[] = [
  {
    name: 'Gratuito',
    price: '$0',
    period: 'por siempre',
    description: 'Ideal para vender tu embarcaci\u00f3n personal.',
    popular: false,
    features: [
      '1 publicaci\u00f3n activa',
      'Hasta 5 fotos por listing',
      'Consultas por email',
      'Estad\u00edsticas b\u00e1sicas',
      'Duraci\u00f3n: 60 d\u00edas',
    ],
    cta: 'Empezar Gratis',
    ctaVariant: 'outline',
  },
  {
    name: 'Premium',
    price: '$9.990',
    period: '/mes',
    description: 'Para vendedores frecuentes y semi-profesionales.',
    popular: true,
    features: [
      'Publicaciones ilimitadas',
      'Hasta 20 fotos por listing',
      'Posici\u00f3n destacada en b\u00fasquedas',
      'Consultas por email y WhatsApp',
      'Analytics completos',
      'Badge "Vendedor Premium"',
      'Soporte prioritario por chat',
    ],
    cta: 'Elegir Premium',
    ctaVariant: 'default',
  },
  {
    name: 'Dealer',
    price: '$29.990',
    period: '/mes',
    description: 'Para concesionarias y vendedores profesionales.',
    popular: false,
    features: [
      'Todo lo de Premium',
      'Dashboard completo de gesti\u00f3n',
      'Logo de marca en listings',
      'P\u00e1gina de dealer personalizada',
      'Importaci\u00f3n masiva de listings',
      'API de integraci\u00f3n',
      'Manager de cuenta dedicado',
      'Soporte prioritario telef\u00f3nico',
    ],
    cta: 'Contactar Ventas',
    ctaVariant: 'outline',
  },
]

interface Testimonial {
  name: string
  type: string
  quote: string
  initial: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Carlos Medina',
    type: 'Vendedor particular',
    quote:
      'Publiqu\u00e9 mi lancha un viernes y el lunes ya ten\u00eda 4 consultas. Vend\u00ed en menos de dos semanas. La plataforma es muy f\u00e1cil de usar.',
    initial: 'C',
  },
  {
    name: 'Marina del Sol',
    type: 'Dealer Premium',
    quote:
      'Como concesionaria, el plan Dealer nos cambi\u00f3 el negocio. El dashboard es incre\u00edble y las consultas son de calidad. Recomendado 100%.',
    initial: 'M',
  },
  {
    name: 'Laura Gim\u00e9nez',
    type: 'Vendedora Premium',
    quote:
      'Ya vend\u00ed 3 embarcaciones en 6 meses. El badge Premium genera confianza en los compradores y las estad\u00edsticas me ayudan a optimizar mis publicaciones.',
    initial: 'L',
  },
]

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: '\u00bfCu\u00e1nto cuesta publicar?',
    answer:
      'Publicar una embarcaci\u00f3n es 100% gratuito con nuestro plan b\u00e1sico. Pod\u00e9s subir hasta 5 fotos y recibir consultas por email sin ning\u00fan costo. Si quer\u00e9s m\u00e1s visibilidad y funciones avanzadas, ten\u00e9s los planes Premium ($9.990/mes) y Dealer ($29.990/mes).',
  },
  {
    question: '\u00bfCu\u00e1nto tarda en venderse?',
    answer:
      'Depende del tipo de embarcaci\u00f3n, precio y temporada. En promedio, las embarcaciones con fotos de calidad y precio competitivo reciben consultas en las primeras 48 horas. El tiempo promedio de venta es de 30 a 45 d\u00edas.',
  },
  {
    question: '\u00bfC\u00f3mo recibo las consultas?',
    answer:
      'Las consultas llegan directamente a tu email registrado. Con los planes Premium y Dealer, tambi\u00e9n pod\u00e9s recibir notificaciones por WhatsApp y gestionar todo desde el dashboard integrado.',
  },
  {
    question: '\u00bfPuedo publicar productos adem\u00e1s de embarcaciones?',
    answer:
      'S\u00ed, pod\u00e9s publicar embarcaciones, motores, electr\u00f3nica marina, accesorios y cualquier producto n\u00e1utico. Cada tipo de publicaci\u00f3n tiene su propia secci\u00f3n optimizada.',
  },
  {
    question: '\u00bfQu\u00e9 documentaci\u00f3n necesito?',
    answer:
      'Para publicar necesit\u00e1s: t\u00edtulo de propiedad o documentaci\u00f3n que acredite la titularidad, matr\u00edcula de la embarcaci\u00f3n y datos del motor. Para vendedores Dealer, se requiere documentaci\u00f3n comercial adicional (CUIT, habilitaci\u00f3n).',
  },
]

/* ---------- Page ---------- */
export default function VenderPage() {
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
            <span className="text-gray-900 font-medium">Vender</span>
          </nav>
        </div>
      </div>

      {/* \u2500\u2500 Hero \u2500\u2500 */}
      <section className="relative bg-navy-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-6">
            <Zap className="h-3 w-3 mr-1" />
            Publicaci\u00f3n gratuita
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Vend\u00e9 tu Embarcaci\u00f3n
            <br />
            <span className="text-amber-400">al Mejor Precio</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-8">
            Miles de compradores buscan embarcaciones como la tuya cada mes.
            Public\u00e1 gratis y empez\u00e1 a recibir consultas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-amber-500/25"
            >
              <Link href="/registro">
                Publicar Ahora
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-medium text-lg px-8 py-6 rounded-xl"
            >
              <Link href="#planes">Ver Planes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* \u2500\u2500 Stats \u2500\u2500 */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
              >
                <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center mb-3">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-navy-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* \u2500\u2500 How It Works \u2500\u2500 */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              \u00bfC\u00f3mo Funciona?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Vender tu embarcaci\u00f3n es simple. Segu\u00ed estos 3 pasos y empez\u00e1 a
              recibir consultas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                {/* Step number */}
                <div className="mx-auto h-16 w-16 rounded-2xl bg-navy-900 flex items-center justify-center mb-5 shadow-lg">
                  <step.icon className="h-8 w-8 text-amber-400" />
                </div>
                <div className="absolute -top-2 left-1/2 ml-6 h-7 w-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* \u2500\u2500 Pricing Plans \u2500\u2500 */}
      <section id="planes" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Eleg\u00ed tu Plan
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Desde la publicaci\u00f3n gratuita hasta herramientas profesionales
              para dealers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  plan.popular
                    ? 'border-2 border-amber-500 shadow-md scale-[1.02]'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-none rounded-bl-lg bg-amber-500 text-white font-semibold px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-navy-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={plan.ctaVariant}
                    className={`w-full font-semibold ${
                      plan.popular
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : ''
                    }`}
                  >
                    <Link href="/registro">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* \u2500\u2500 Testimonials \u2500\u2500 */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Lo que Dicen Nuestros Vendedores
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-gray-200">
                <CardContent className="p-6">
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-navy-900 text-white flex items-center justify-center font-semibold">
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">{t.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* \u2500\u2500 FAQ \u2500\u2500 */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-gray-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 bg-white hover:bg-gray-50 transition-colors">
                  <span className="text-base font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className="h-5 w-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* \u2500\u2500 Final CTA \u2500\u2500 */}
      <section className="bg-navy-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            \u00bfListo para Vender?
          </h2>
          <p className="text-lg text-blue-200 max-w-xl mx-auto mb-8">
            Cre\u00e1 tu cuenta gratuita y public\u00e1 tu embarcaci\u00f3n en minutos.
            Miles de compradores est\u00e1n esperando.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-amber-500/25"
            >
              <Link href="/registro">
                Publicar Ahora
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-medium px-8 py-6 rounded-xl"
            >
              <Link href="/contacto">Contactar al Equipo</Link>
            </Button>
          </div>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-blue-300">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Pago seguro
            </span>
            <span className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Garant\u00eda de satisfacci\u00f3n
            </span>
            <span className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              Soporte dedicado
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
