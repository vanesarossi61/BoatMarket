import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChevronRight,
  Plus,
  Trash2,
  Mail,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Comparar Embarcaciones | BoatMarket',
  description:
    'Compar\u00e1 hasta 3 embarcaciones lado a lado. Eleg\u00ed las que te interesan y analizá sus especificaciones, precios y caracter\u00edsticas para tomar la mejor decisi\u00f3n.',
  openGraph: {
    title: 'Comparar Embarcaciones | BoatMarket',
    description:
      'Compar\u00e1 embarcaciones lado a lado: especificaciones, precios y caracter\u00edsticas.',
    type: 'website',
  },
}

/* ---------- Types ---------- */
interface BoatComparison {
  slug: string
  name: string
  image: string
  specs: Record<string, string>
}

interface ComparisonRow {
  label: string
  key: string
  numeric?: boolean
  lowerIsBetter?: boolean
}

/* ---------- Mock Data ---------- */
const comparisonRows: ComparisonRow[] = [
  { label: 'Tipo', key: 'tipo' },
  { label: 'Marca', key: 'marca' },
  { label: 'Modelo', key: 'modelo' },
  { label: 'A\u00f1o', key: 'anio', numeric: true },
  { label: 'Precio', key: 'precio', numeric: true },
  { label: 'Eslora', key: 'eslora', numeric: true },
  { label: 'Manga', key: 'manga', numeric: true },
  { label: 'Calado', key: 'calado', numeric: true, lowerIsBetter: true },
  { label: 'Motor', key: 'motor' },
  { label: 'Potencia', key: 'potencia', numeric: true },
  { label: 'Combustible', key: 'combustible' },
  { label: 'Capacidad', key: 'capacidad', numeric: true },
  { label: 'Material Casco', key: 'materialCasco' },
  { label: 'Horas de Motor', key: 'horasMotor', numeric: true, lowerIsBetter: true },
]

const mockBoats: BoatComparison[] = [
  {
    slug: 'bayliner-vr5-2024',
    name: 'Bayliner VR5 2024',
    image: '/images/boats/bayliner-vr5.jpg',
    specs: {
      tipo: 'Lancha',
      marca: 'Bayliner',
      modelo: 'VR5',
      anio: '2024',
      precio: '$45.000.000',
      eslora: '5.94 m',
      manga: '2.34 m',
      calado: '0.84 m',
      motor: 'Mercury 150HP',
      potencia: '150 HP',
      combustible: 'Nafta',
      capacidad: '8 personas',
      materialCasco: 'Fibra de vidrio',
      horasMotor: '120 hs',
    },
  },
  {
    slug: 'sea-ray-spx-190-2023',
    name: 'Sea Ray SPX 190 2023',
    image: '/images/boats/sea-ray-spx190.jpg',
    specs: {
      tipo: 'Lancha',
      marca: 'Sea Ray',
      modelo: 'SPX 190',
      anio: '2023',
      precio: '$52.000.000',
      eslora: '5.79 m',
      manga: '2.44 m',
      calado: '0.91 m',
      motor: 'Mercury 200HP',
      potencia: '200 HP',
      combustible: 'Nafta',
      capacidad: '9 personas',
      materialCasco: 'Fibra de vidrio',
      horasMotor: '85 hs',
    },
  },
]

/* ---------- Helpers ---------- */
function parseNumeric(value: string): number {
  const cleaned = value.replace(/[^0-9.,]/g, '').replace(/\./g, '').replace(',', '.')
  return parseFloat(cleaned) || 0
}

function getBestIndex(
  values: string[],
  lowerIsBetter?: boolean
): number | null {
  const nums = values.map(parseNumeric)
  if (nums.every((n) => n === 0)) return null
  if (nums.every((n) => n === nums[0])) return null
  const best = lowerIsBetter ? Math.min(...nums) : Math.max(...nums)
  return nums.indexOf(best)
}

/* ---------- Page ---------- */
export default function CompararPage() {
  const boats = mockBoats
  const emptySlots = 3 - boats.length

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
            <span className="text-gray-900 font-medium">Comparar</span>
          </nav>
        </div>
      </div>

      {/* \u2500\u2500 Hero \u2500\u2500 */}
      <section className="relative bg-navy-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Compar\u00e1 Embarcaciones
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Eleg\u00ed hasta 3 embarcaciones y compar\u00e1 sus especificaciones lado a
            lado
          </p>
        </div>
      </section>

      {/* \u2500\u2500 Selection Slots \u2500\u2500 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Filled slots */}
          {boats.map((boat) => (
            <Card
              key={boat.slug}
              className="border-blue-200 bg-sky-50/50"
            >
              <CardContent className="p-4 text-center">
                <div className="relative h-32 bg-gradient-to-br from-sky-100 to-blue-200 rounded-lg mb-3 flex items-center justify-center">
                  <svg
                    className="h-12 w-12 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <button
                    className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    title="Quitar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-sm font-bold text-gray-900">
                  {boat.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {boat.specs.precio}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Empty slots */}
          {Array.from({ length: emptySlots }).map((_, i) => (
            <Link key={`empty-${i}`} href="/embarcaciones" className="group">
              <Card className="h-full border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                  <div className="h-14 w-14 rounded-full bg-gray-100 group-hover:bg-sky-100 flex items-center justify-center mb-3 transition-colors">
                    <Plus className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                    Seleccionar embarcaci\u00f3n
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/embarcaciones">
              <Plus className="h-4 w-4" />
              Agregar otra embarcaci\u00f3n
            </Link>
          </Button>
          <Button variant="ghost" className="gap-2 text-gray-500 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
            Limpiar comparaci\u00f3n
          </Button>
          <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-white">
            <Mail className="h-4 w-4" />
            Consultar por estas embarcaciones
          </Button>
        </div>
      </section>

      {/* \u2500\u2500 Comparison Table \u2500\u2500 */}
      {boats.length >= 2 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Comparaci\u00f3n Detallada
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 w-48">
                    Especificaci\u00f3n
                  </th>
                  {boats.map((boat) => (
                    <th
                      key={boat.slug}
                      className="text-center py-4 px-4"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-16 w-24 bg-gradient-to-br from-sky-100 to-blue-200 rounded-lg flex items-center justify-center">
                          <svg
                            className="h-8 w-8 text-blue-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1}
                          >
                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                          </svg>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {boat.name}
                        </span>
                      </div>
                    </th>
                  ))}
                  {/* Empty column for 3rd slot */}
                  {emptySlots > 0 && (
                    <th className="text-center py-4 px-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-16 w-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <Plus className="h-6 w-6 text-gray-300" />
                        </div>
                        <span className="text-sm text-gray-400">---</span>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, rowIndex) => {
                  const values = boats.map((b) => b.specs[row.key] || '-')
                  const bestIdx = row.numeric
                    ? getBestIndex(values, row.lowerIsBetter)
                    : null

                  return (
                    <tr
                      key={row.key}
                      className={`border-b border-gray-100 ${
                        rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">
                        {row.label}
                      </td>
                      {boats.map((boat, colIdx) => {
                        const value = boat.specs[row.key] || '-'
                        const isBest = bestIdx === colIdx
                        return (
                          <td
                            key={`${boat.slug}-${row.key}`}
                            className="py-3 px-4 text-center text-sm"
                          >
                            <span
                              className={`${
                                isBest
                                  ? 'text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1'
                                  : 'text-gray-600'
                              }`}
                            >
                              {isBest && (
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                              )}
                              {value}
                            </span>
                          </td>
                        )
                      })}
                      {emptySlots > 0 && (
                        <td className="py-3 px-4 text-center text-sm text-gray-300">
                          ---
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span>Mejor valor resaltado en verde</span>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">
              \u00bfQuer\u00e9s m\u00e1s informaci\u00f3n sobre estas embarcaciones?
            </p>
            <Button
              asChild
              className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Link href="/contacto">
                Consultar por estas embarcaciones
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}
    </main>
  )
}
