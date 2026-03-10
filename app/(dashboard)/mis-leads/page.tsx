"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import {
  MessageSquare,
  Mail,
  Clock,
  CheckCircle2,
  Archive,
  ChevronDown,
  ChevronUp,
  Send,
  Inbox,
  AlertCircle,
  BarChart3,
  Ship,
  Package,
  ExternalLink,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type LeadStatus = 'sin_responder' | 'respondida' | 'archivada'
type FilterKey = 'todas' | 'sin_responder' | 'respondidas' | 'archivadas'

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  itemTitle: string
  itemType: 'embarcacion' | 'producto'
  itemSlug: string
  message: string
  status: LeadStatus
  createdAt: string
  respondedAt?: string
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                         */
/* ------------------------------------------------------------------ */

const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Martin Gonzalez',
    email: 'martin.gonzalez@email.com',
    phone: '+54 11 4555-1234',
    itemTitle: 'Bayliner VR5 2024 - Impecable',
    itemType: 'embarcacion',
    itemSlug: '/embarcaciones/lanchas/bayliner-vr5-2024',
    message:
      'Hola, estoy muy interesado en la Bayliner VR5. Me gustaria saber si tiene alguna marca o golpe en el casco, y si es posible hacer una prueba de navegacion en el Tigre. Tengo disponibilidad los fines de semana. Tambien me interesa saber si aceptan permuta parcial por una lancha mas chica. Desde ya muchas gracias.',
    status: 'sin_responder',
    createdAt: '2026-03-09T14:30:00Z',
  },
  {
    id: '2',
    name: 'Carolina Mendez',
    email: 'carol.mendez@email.com',
    itemTitle: 'Garmin ECHOMAP UHD2 93sv',
    itemType: 'producto',
    itemSlug: '/productos/garmin-echomap-uhd2-93sv',
    message:
      'Buenas tardes, quisiera saber si este GPS viene con la cartografia argentina incluida o hay que comprarla aparte. Tambien necesito saber el plazo de entrega a Rosario.',
    status: 'sin_responder',
    createdAt: '2026-03-09T10:15:00Z',
  },
  {
    id: '3',
    name: 'Roberto Alvarez',
    email: 'roberto.alvarez@email.com',
    phone: '+54 341 555-9876',
    itemTitle: 'Sea Ray SPX 190 - Solo agua dulce',
    itemType: 'embarcacion',
    itemSlug: '/embarcaciones/lanchas/sea-ray-spx-190-2023',
    message:
      'Hola, vi la publicacion y me interesa. Soy de Rosario y tengo un amarre en el Club Nautico. Podemos coordinar una visita? Tengo financiacion propia aprobada.',
    status: 'respondida',
    createdAt: '2026-03-07T09:00:00Z',
    respondedAt: '2026-03-07T11:30:00Z',
  },
  {
    id: '4',
    name: 'Lucia Fernandez',
    email: 'lucia.fernandez@email.com',
    itemTitle: 'Bayliner VR5 2024 - Impecable',
    itemType: 'embarcacion',
    itemSlug: '/embarcaciones/lanchas/bayliner-vr5-2024',
    message:
      'Buenas! Queria consultar si hacen envio a Cordoba y cual seria el costo aproximado del flete. Gracias.',
    status: 'respondida',
    createdAt: '2026-03-05T16:45:00Z',
    respondedAt: '2026-03-06T08:00:00Z',
  },
  {
    id: '5',
    name: 'Diego Ramirez',
    email: 'diego.ramirez@email.com',
    phone: '+54 11 6789-0000',
    itemTitle: 'Mercury 150HP FourStroke - 120hs',
    itemType: 'producto',
    itemSlug: '/productos/mercury-150hp-fourstroke',
    message:
      'Hola, me interesa el motor Mercury. Queria saber si lo puedo ir a ver y probarlo antes de comprarlo.',
    status: 'archivada',
    createdAt: '2026-02-20T12:00:00Z',
    respondedAt: '2026-02-20T14:00:00Z',
  },
  {
    id: '6',
    name: 'Ana Perez',
    email: 'ana.perez@email.com',
    itemTitle: 'Bayliner VR5 2024 - Impecable',
    itemType: 'embarcacion',
    itemSlug: '/embarcaciones/lanchas/bayliner-vr5-2024',
    message:
      'Buenos dias, estoy buscando una lancha para familia de 4 personas. La Bayliner se ve ideal. Aceptan tarjeta en cuotas?',
    status: 'sin_responder',
    createdAt: '2026-03-10T08:00:00Z',
  },
]

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'sin_responder', label: 'Sin responder' },
  { key: 'respondidas', label: 'Respondidas' },
  { key: 'archivadas', label: 'Archivadas' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const STATUS_CONFIG: Record<LeadStatus, { label: string; class: string; icon: typeof CheckCircle2 }> = {
  sin_responder: {
    label: 'Sin responder',
    class: 'bg-red-100 text-red-700 border-red-200',
    icon: AlertCircle,
  },
  respondida: {
    label: 'Respondida',
    class: 'bg-green-100 text-green-700 border-green-200',
    icon: CheckCircle2,
  },
  archivada: {
    label: 'Archivada',
    class: 'bg-gray-100 text-gray-600 border-gray-200',
    icon: Archive,
  },
}

function timeAgo(dateStr: string) {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `hace ${diffMins} min`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `hace ${diffHours}h`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return 'ayer'
  if (diffDays < 7) return `hace ${diffDays} dias`
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
  })
}

function getInitial(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MisLeadsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('todas')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({})

  /* derived ------------------------------------------------------- */
  const filterMap: Record<FilterKey, LeadStatus | null> = {
    todas: null,
    sin_responder: 'sin_responder',
    respondidas: 'respondida',
    archivadas: 'archivada',
  }

  const filtered = MOCK_LEADS.filter((l) => {
    const sf = filterMap[activeFilter]
    if (sf && l.status !== sf) return false
    return true
  })

  /* stats --------------------------------------------------------- */
  const totalLeads = MOCK_LEADS.length
  const unanswered = MOCK_LEADS.filter((l) => l.status === 'sin_responder').length
  const answered = MOCK_LEADS.filter((l) => l.status === 'respondida').length
  const responseRate =
    totalLeads > 0
      ? Math.round(((answered + MOCK_LEADS.filter((l) => l.status === 'archivada').length) / totalLeads) * 100)
      : 0

  const stats = [
    { label: 'Total consultas', value: totalLeads, icon: Inbox, color: 'text-navy-900' },
    { label: 'Sin responder', value: unanswered, icon: AlertCircle, color: 'text-red-600' },
    { label: 'Respondidas', value: answered, icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Tasa de respuesta', value: `${responseRate}%`, icon: BarChart3, color: 'text-blue-600' },
  ]

  const filterCounts: Record<FilterKey, number> = {
    todas: totalLeads,
    sin_responder: unanswered,
    respondidas: answered,
    archivadas: MOCK_LEADS.filter((l) => l.status === 'archivada').length,
  }

  /* handlers ------------------------------------------------------ */
  function handleToggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  function handleReply(id: string) {
    const text = replyTexts[id]
    if (!text?.trim()) return
    console.log('Reply to lead', id, ':', text)
    setReplyTexts((prev) => ({ ...prev, [id]: '' }))
  }

  function handleArchive(id: string) {
    console.log('Archive lead', id)
  }

  /* ---------------------------------------------------------------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-navy-900">Mis Consultas Recibidas</h1>
          {unanswered > 0 && (
            <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
              {unanswered} sin responder
            </Badge>
          )}
        </div>
        <p className="text-gray-500 mt-1">Gestiona las consultas de compradores interesados</p>
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

      {/* Filter Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-gray-200 pb-px">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeFilter === f.key
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {f.label}
            <span
              className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                activeFilter === f.key
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {filterCounts[f.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Leads List */}
      {filtered.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-sky-50 flex items-center justify-center mb-4">
              <Inbox className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-2">No hay consultas</h3>
            <p className="text-gray-500 max-w-sm">
              {activeFilter === 'todas'
                ? 'Todavia no recibiste consultas. Cuando un comprador se interese en tus publicaciones, vas a verlas aca.'
                : `No tenes consultas en estado "${FILTERS.find((f) => f.key === activeFilter)?.label}".`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((lead) => {
            const isExpanded = expandedId === lead.id
            const statusCfg = STATUS_CONFIG[lead.status]
            const StatusIcon = statusCfg.icon
            const previewText =
              lead.message.length > 120
                ? lead.message.slice(0, 120) + '...'
                : lead.message

            return (
              <Card
                key={lead.id}
                className={`border-gray-200 transition-all ${
                  lead.status === 'sin_responder'
                    ? 'border-l-4 border-l-red-400'
                    : ''
                }`}
              >
                <CardContent className="p-0">
                  {/* Header row - clickable */}
                  <button
                    onClick={() => handleToggleExpand(lead.id)}
                    className="w-full p-4 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                          lead.status === 'sin_responder'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-sky-100 text-blue-700'
                        }`}
                      >
                        {getInitial(lead.name)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="font-semibold text-navy-900">
                            {lead.name}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${statusCfg.class}`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusCfg.label}
                          </Badge>
                          <span className="text-xs text-gray-400 ml-auto flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {timeAgo(lead.createdAt)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          <span className="flex items-center gap-1">
                            {lead.itemType === 'embarcacion' ? (
                              <Ship className="h-3.5 w-3.5" />
                            ) : (
                              <Package className="h-3.5 w-3.5" />
                            )}
                            {lead.itemTitle}
                          </span>
                        </div>

                        {!isExpanded && (
                          <p className="text-sm text-gray-600 truncate">
                            {previewText}
                          </p>
                        )}
                      </div>

                      {/* Expand icon */}
                      <div className="shrink-0 pt-1">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100 pt-4 ml-13">
                      {/* Contact info */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1.5 text-blue-600 hover:underline"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          {lead.email}
                        </a>
                        {lead.phone && (
                          <span className="text-gray-500">{lead.phone}</span>
                        )}
                        <a
                          href={lead.itemSlug}
                          className="flex items-center gap-1.5 text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Ver publicacion
                        </a>
                      </div>

                      {/* Full message */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {lead.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Recibida el{' '}
                          {new Date(lead.createdAt).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      {/* Reply area */}
                      {lead.status !== 'archivada' && (
                        <div className="space-y-3">
                          <textarea
                            placeholder="Escribi tu respuesta..."
                            value={replyTexts[lead.id] || ''}
                            onChange={(e) =>
                              setReplyTexts((prev) => ({
                                ...prev,
                                [lead.id]: e.target.value,
                              }))
                            }
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                          />
                          <div className="flex items-center gap-2">
                            <Button
                              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2"
                              onClick={() => handleReply(lead.id)}
                              disabled={!replyTexts[lead.id]?.trim()}
                            >
                              <Send className="h-4 w-4" />
                              Responder
                            </Button>
                            <Button
                              variant="outline"
                              className="gap-2 text-gray-600"
                              onClick={() => handleArchive(lead.id)}
                            >
                              <Archive className="h-4 w-4" />
                              Archivar
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Responded info */}
                      {lead.respondedAt && (
                        <div className="flex items-center gap-2 text-xs text-green-600 mt-2">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Respondida el{' '}
                          {new Date(lead.respondedAt).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
