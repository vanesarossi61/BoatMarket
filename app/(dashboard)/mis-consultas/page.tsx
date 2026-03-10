import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

type InquiryStatus = 'new' | 'replied' | 'closed'

interface Inquiry {
  id: string
  personName: string
  boatTitle: string
  boatSlug: string
  message: string
  date: string
  status: InquiryStatus
}

const RECEIVED_INQUIRIES: Inquiry[] = [
  {
    id: 'r1',
    personName: 'Carlos Martinez',
    boatTitle: 'Quicksilver 555 Open',
    boatSlug: 'quicksilver-555-open',
    message: 'Hola, me interesa esta embarcacion. Estaria disponible para verla este fin de semana? Estoy en zona norte y podria acercarme al puerto.',
    date: '2026-03-09',
    status: 'new',
  },
  {
    id: 'r2',
    personName: 'Laura Gomez',
    boatTitle: 'Bermuda Classic 175',
    boatSlug: 'bermuda-classic-175',
    message: 'Buenos dias, queria consultar si el precio es negociable y si aceptan financiacion. Tambien me gustaria saber el estado del motor.',
    date: '2026-03-08',
    status: 'replied',
  },
  {
    id: 'r3',
    personName: 'Diego Fernandez',
    boatTitle: 'Regnicoli Albacora 640',
    boatSlug: 'regnicoli-albacora-640',
    message: 'Buenas tardes, consulto por las horas de motor y si tiene algun detalle de chapa o pintura. Gracias.',
    date: '2026-03-07',
    status: 'new',
  },
  {
    id: 'r4',
    personName: 'Ana Ruiz',
    boatTitle: 'Tracker Taragui 620',
    boatSlug: 'tracker-taragui-620',
    message: 'Hola! Vi la publicacion y me encanto. Mi marido esta interesado, podriamos coordinar una visita?',
    date: '2026-03-05',
    status: 'closed',
  },
]

const SENT_INQUIRIES: Inquiry[] = [
  {
    id: 's1',
    personName: 'Nautica del Sur',
    boatTitle: 'Canestrari 215 Cruiser',
    boatSlug: 'canestrari-215-cruiser',
    message: 'Hola, me interesa el Canestrari. Podrian enviarme mas fotos del interior y datos de la mecanica?',
    date: '2026-03-06',
    status: 'replied',
  },
  {
    id: 's2',
    personName: 'Jorge Boats',
    boatTitle: 'Fishing 480 Pro',
    boatSlug: 'fishing-480-pro',
    message: 'Buenas, consulto por el Fishing 480. Viene con electronica incluida? Ecosonda, GPS?',
    date: '2026-03-04',
    status: 'new',
  },
  {
    id: 's3',
    personName: 'Delta Marine',
    boatTitle: 'Bermuda Sport 210',
    boatSlug: 'bermuda-sport-210',
    message: 'Buen dia, queria saber si hacen permuta parcial. Tengo una lancha mas chica para ofrecer.',
    date: '2026-03-02',
    status: 'replied',
  },
  {
    id: 's4',
    personName: 'Embarcaciones Premium',
    boatTitle: 'Quicksilver 675 Activ',
    boatSlug: 'quicksilver-675-activ',
    message: 'Hola, consulto disponibilidad y si tiene trailer incluido. Desde ya gracias.',
    date: '2026-02-28',
    status: 'closed',
  },
]

const STATUS_CONFIG: Record<InquiryStatus, { label: string; className: string }> = {
  new: { label: 'Nueva', className: 'bg-blue-100 text-blue-700' },
  replied: { label: 'Respondida', className: 'bg-green-100 text-green-700' },
  closed: { label: 'Cerrada', className: 'bg-gray-100 text-gray-600' },
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function InquiryCard({ inquiry, type }: { inquiry: Inquiry; type: 'received' | 'sent' }) {
  const statusConf = STATUS_CONFIG[inquiry.status]

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-navy-600 flex items-center justify-center text-white text-xs font-bold">
            {inquiry.personName.charAt(0)}
          </div>
          <span className="font-medium text-navy-900 text-sm">{inquiry.personName}</span>
        </div>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusConf.className}`}>
          {statusConf.label}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-2">
        <Link
          href={`/embarcaciones/${inquiry.boatSlug}`}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
        >
          {inquiry.boatTitle}
        </Link>
        <p className="text-sm text-gray-600 line-clamp-2">{inquiry.message}</p>
        <time className="text-xs text-gray-400 block">{formatDate(inquiry.date)}</time>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
        {type === 'received' && inquiry.status !== 'closed' && (
          <Button size="sm" className="bg-navy-900 hover:bg-navy-800 text-xs h-8">
            Responder
          </Button>
        )}
        <Button size="sm" variant="outline" asChild className="text-xs h-8">
          <Link href={`/embarcaciones/${inquiry.boatSlug}`}>
            Ver embarcacion
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default async function MisConsultasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Mis Consultas</h1>
        <p className="text-gray-500 mt-1">Gestiona las consultas recibidas y enviadas</p>
      </div>

      <Tabs defaultValue="received" className="w-full">
        <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
          <TabsTrigger
            value="received"
            className="data-[state=active]:bg-navy-900 data-[state=active]:text-white rounded-md px-4"
          >
            Recibidas ({RECEIVED_INQUIRIES.length})
          </TabsTrigger>
          <TabsTrigger
            value="sent"
            className="data-[state=active]:bg-navy-900 data-[state=active]:text-white rounded-md px-4"
          >
            Enviadas ({SENT_INQUIRIES.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RECEIVED_INQUIRIES.map((inquiry) => (
              <InquiryCard key={inquiry.id} inquiry={inquiry} type="received" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sent" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SENT_INQUIRIES.map((inquiry) => (
              <InquiryCard key={inquiry.id} inquiry={inquiry} type="sent" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
