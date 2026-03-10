import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type ListingStatus = 'active' | 'pending' | 'paused' | 'rejected'

interface Listing {
  id: string
  title: string
  price: string
  status: ListingStatus
  views: number
  inquiries: number
  date: string
  image: string
}

const LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Quicksilver 555 Open',
    price: 'USD 42.000',
    status: 'active',
    views: 342,
    inquiries: 12,
    date: '2026-02-15',
    image: '/images/boats/quicksilver.jpg',
  },
  {
    id: '2',
    title: 'Bermuda Classic 175',
    price: 'USD 28.500',
    status: 'active',
    views: 218,
    inquiries: 8,
    date: '2026-02-20',
    image: '/images/boats/bermuda.jpg',
  },
  {
    id: '3',
    title: 'Regnicoli Albacora 640',
    price: 'USD 35.000',
    status: 'pending',
    views: 0,
    inquiries: 0,
    date: '2026-03-08',
    image: '/images/boats/regnicoli.jpg',
  },
  {
    id: '4',
    title: 'Tracker Taragui 620',
    price: 'USD 22.000',
    status: 'paused',
    views: 156,
    inquiries: 5,
    date: '2026-01-10',
    image: '/images/boats/tracker.jpg',
  },
  {
    id: '5',
    title: 'Canestrari 215',
    price: 'USD 58.000',
    status: 'rejected',
    views: 0,
    inquiries: 0,
    date: '2026-03-01',
    image: '/images/boats/canestrari.jpg',
  },
]

const STATUS_CONFIG: Record<ListingStatus, { label: string; className: string }> = {
  active: { label: 'Activa', className: 'bg-green-100 text-green-700' },
  pending: { label: 'Pendiente', className: 'bg-amber-100 text-amber-700' },
  paused: { label: 'Pausada', className: 'bg-gray-100 text-gray-600' },
  rejected: { label: 'Rechazada', className: 'bg-red-100 text-red-700' },
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
        <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-navy-900 mb-2">
        Todavia no publicaste ninguna embarcacion
      </h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        Publica tu primera embarcacion y empeza a recibir consultas de compradores interesados.
      </p>
      <Button asChild className="bg-navy-900 hover:bg-navy-800">
        <Link href="/dashboard/publicar">Publicar ahora</Link>
      </Button>
    </div>
  )
}

export default async function MisEmbarcacionesPage() {
  const hasListings = LISTINGS.length > 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Mis Embarcaciones</h1>
          <p className="text-gray-500 mt-1">{LISTINGS.length} publicaciones en total</p>
        </div>
        <Button asChild className="bg-navy-900 hover:bg-navy-800">
          <Link href="/dashboard/publicar" className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nueva publicacion
          </Link>
        </Button>
      </div>

      {!hasListings ? (
        <EmptyState />
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3">Embarcacion</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3">Precio</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3">Estado</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3">Vistas</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3">Consultas</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3">Fecha</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {LISTINGS.map((listing) => {
                  const statusConf = STATUS_CONFIG[listing.status]
                  return (
                    <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-[60px] h-[45px] relative rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            <Image
                              src={listing.image}
                              alt={listing.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-navy-900">{listing.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-blue-600">{listing.price}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConf.className}`}>
                          {statusConf.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{listing.views}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{listing.inquiries}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(listing.date)}</td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                              </svg>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>
                              {listing.status === 'paused' ? 'Activar' : 'Pausar'}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
