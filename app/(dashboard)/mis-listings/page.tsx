"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Plus,
  Edit,
  Pause,
  Play,
  Trash2,
  BarChart3,
  Eye,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Package,
  Ship,
  Search,
  FileText,
  TrendingUp,
  Clock,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type ListingStatus = 'activa' | 'pausada' | 'borrador' | 'vendida'
type ListingType = 'embarcacion' | 'producto'
type TabKey = 'todas' | 'activas' | 'pausadas' | 'borradores' | 'vendidas'

interface Listing {
  id: string
  title: string
  type: ListingType
  status: ListingStatus
  price: number
  image: string
  views: number
  inquiries: number
  publishedAt: string
  category: string
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                         */
/* ------------------------------------------------------------------ */

const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Bayliner VR5 2024 - Impecable',
    type: 'embarcacion',
    status: 'activa',
    price: 45_500_000,
    image: '/placeholder-boat-1.jpg',
    views: 342,
    inquiries: 12,
    publishedAt: '2026-02-15',
    category: 'Lanchas',
  },
  {
    id: '2',
    title: 'Sea Ray SPX 190 - Solo agua dulce',
    type: 'embarcacion',
    status: 'activa',
    price: 38_900_000,
    image: '/placeholder-boat-2.jpg',
    views: 218,
    inquiries: 8,
    publishedAt: '2026-02-20',
    category: 'Lanchas',
  },
  {
    id: '3',
    title: 'Garmin ECHOMAP UHD2 93sv',
    type: 'producto',
    status: 'pausada',
    price: 1_250_000,
    image: '/placeholder-product-1.jpg',
    views: 89,
    inquiries: 3,
    publishedAt: '2026-01-10',
    category: 'Electronica Marina',
  },
  {
    id: '4',
    title: 'Yamaha WaveRunner EX Deluxe 2025',
    type: 'embarcacion',
    status: 'borrador',
    price: 22_000_000,
    image: '/placeholder-jet-1.jpg',
    views: 0,
    inquiries: 0,
    publishedAt: '',
    category: 'Motos de Agua',
  },
  {
    id: '5',
    title: 'Mercury 150HP FourStroke - 120hs',
    type: 'producto',
    status: 'vendida',
    price: 18_500_000,
    image: '/placeholder-motor-1.jpg',
    views: 567,
    inquiries: 24,
    publishedAt: '2025-12-05',
    category: 'Motores',
  },
]

const TABS: { key: TabKey; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'activas', label: 'Activas' },
  { key: 'pausadas', label: 'Pausadas' },
  { key: 'borradores', label: 'Borradores' },
  { key: 'vendidas', label: 'Vendidas' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const STATUS_MAP: Record<ListingStatus, { label: string; class: string }> = {
  activa: { label: 'Activa', class: 'bg-green-100 text-green-700 border-green-200' },
  pausada: { label: 'Pausada', class: 'bg-amber-100 text-amber-700 border-amber-200' },
  borrador: { label: 'Borrador', class: 'bg-gray-100 text-gray-600 border-gray-200' },
  vendida: { label: 'Vendida', class: 'bg-blue-100 text-blue-700 border-blue-200' },
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(n)
}

function formatDate(d: string) {
  if (!d) return '\u2014'
  return new Date(d).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MisListingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('todas')
  const [sortBy, setSortBy] = useState('recientes')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  /* derived ------------------------------------------------------- */
  const statusFilter: Record<TabKey, ListingStatus | null> = {
    todas: null,
    activas: 'activa',
    pausadas: 'pausada',
    borradores: 'borrador',
    vendidas: 'vendida',
  }

  let filtered = MOCK_LISTINGS.filter((l) => {
    const sf = statusFilter[activeTab]
    if (sf && l.status !== sf) return false
    if (searchQuery && !l.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  if (sortBy === 'precio-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  else if (sortBy === 'precio-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  else if (sortBy === 'vistas') filtered = [...filtered].sort((a, b) => b.views - a.views)
  else filtered = [...filtered].sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))

  const perPage = 4
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  /* stats --------------------------------------------------------- */
  const totalListings = MOCK_LISTINGS.length
  const activeCount = MOCK_LISTINGS.filter((l) => l.status === 'activa').length
  const pausedCount = MOCK_LISTINGS.filter((l) => l.status === 'pausada').length
  const totalInquiries = MOCK_LISTINGS.reduce((s, l) => s + l.inquiries, 0)

  const stats = [
    { label: 'Total publicaciones', value: totalListings, icon: FileText, color: 'text-navy-900' },
    { label: 'Activas', value: activeCount, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Pausadas', value: pausedCount, icon: Pause, color: 'text-amber-600' },
    { label: 'Consultas recibidas', value: totalInquiries, icon: MessageSquare, color: 'text-blue-600' },
  ]

  const tabCounts: Record<TabKey, number> = {
    todas: MOCK_LISTINGS.length,
    activas: activeCount,
    pausadas: pausedCount,
    borradores: MOCK_LISTINGS.filter((l) => l.status === 'borrador').length,
    vendidas: MOCK_LISTINGS.filter((l) => l.status === 'vendida').length,
  }

  /* handlers ------------------------------------------------------ */
  function handleToggleStatus(id: string) {
    console.log('Toggle status', id)
  }
  function handleDelete(id: string) {
    console.log('Delete', id)
  }
  function handleEdit(id: string) {
    console.log('Edit', id)
  }
  function handleStats(id: string) {
    console.log('Stats', id)
  }

  /* ---------------------------------------------------------------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Mis Publicaciones</h1>
          <p className="text-gray-500 mt-1">Gestiona todas tus embarcaciones y productos publicados</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          Nueva Publicacion
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-gray-200">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-sky-50 flex items-center justify-center">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs + Search + Sort */}
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-gray-200 pb-px">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {tabCounts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar publicacion..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recientes">Mas recientes</SelectItem>
              <SelectItem value="precio-asc">Precio: menor a mayor</SelectItem>
              <SelectItem value="precio-desc">Precio: mayor a menor</SelectItem>
              <SelectItem value="vistas">Mas vistas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Listings */}
      {paginated.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-sky-50 flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-2">No tenes publicaciones</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              {activeTab === 'todas'
                ? 'Empeza publicando tu primera embarcacion o producto.'
                : `No tenes publicaciones en estado "${TABS.find((t) => t.key === activeTab)?.label}".`}
            </p>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2">
              <Plus className="h-4 w-4" />
              Nueva Publicacion
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {paginated.map((listing) => {
            const statusInfo = STATUS_MAP[listing.status]
            return (
              <Card key={listing.id} className="border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Thumbnail */}
                    <div className="h-20 w-20 sm:h-24 sm:w-32 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {listing.type === 'embarcacion' ? (
                        <Ship className="h-8 w-8 text-gray-400" />
                      ) : (
                        <Package className="h-8 w-8 text-gray-400" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2 mb-1">
                        <h3 className="font-semibold text-navy-900 truncate">
                          {listing.title}
                        </h3>
                        <Badge variant="outline" className={`text-xs ${statusInfo.class}`}>
                          {statusInfo.label}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                          {listing.type === 'embarcacion' ? (
                            <Ship className="h-3.5 w-3.5" />
                          ) : (
                            <Package className="h-3.5 w-3.5" />
                          )}
                          {listing.type === 'embarcacion' ? 'Embarcacion' : 'Producto'}
                        </span>
                        <span>{listing.category}</span>
                        {listing.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {formatDate(listing.publishedAt)}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-lg font-bold text-navy-900">
                          {formatPrice(listing.price)}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Eye className="h-3.5 w-3.5" />
                          {listing.views} vistas
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <MessageSquare className="h-3.5 w-3.5" />
                          {listing.inquiries} consultas
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col items-center gap-2 sm:justify-center shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                        onClick={() => handleEdit(listing.id)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Editar</span>
                      </Button>

                      {(listing.status === 'activa' || listing.status === 'pausada') && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 text-xs"
                          onClick={() => handleToggleStatus(listing.id)}
                        >
                          {listing.status === 'activa' ? (
                            <>
                              <Pause className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Pausar</span>
                            </>
                          ) : (
                            <>
                              <Play className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Activar</span>
                            </>
                          )}
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                        onClick={() => handleStats(listing.id)}
                      >
                        <BarChart3 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Stats</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(listing.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Eliminar</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-500">
            Mostrando {(currentPage - 1) * perPage + 1}-
            {Math.min(currentPage * perPage, filtered.length)} de {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === currentPage ? 'default' : 'outline'}
                size="sm"
                className={p === currentPage ? 'bg-navy-900 text-white' : ''}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
