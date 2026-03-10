import Link from 'next/link'
import { StatsCard } from '@/components/shared/StatsCard'

const STATS = [
  { title: 'Publicaciones', value: '24', change: 12, icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { title: 'Consultas', value: '156', change: 8, icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  { title: 'Vistas', value: '2.4K', change: 23, icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  { title: 'Favoritos', value: '89', change: -3, icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
]

const RECENT_INQUIRIES = [
  { id: '1', name: 'Carlos Martinez', boat: 'Quicksilver 555 Open', date: '2026-03-09', status: 'new' },
  { id: '2', name: 'Laura Gomez', boat: 'Bermuda Classic 175', date: '2026-03-08', status: 'replied' },
  { id: '3', name: 'Diego Fernandez', boat: 'Regnicoli Albacora 640', date: '2026-03-07', status: 'new' },
  { id: '4', name: 'Ana Ruiz', boat: 'Tracker Taragui 620', date: '2026-03-06', status: 'replied' },
  { id: '5', name: 'Pablo Sosa', boat: 'Canestrari 215', date: '2026-03-05', status: 'closed' },
]

const ACTIVE_LISTINGS = [
  { id: '1', title: 'Quicksilver 555 Open', price: 'USD 42.000', views: 342, image: '/images/boats/quicksilver.jpg' },
  { id: '2', title: 'Bermuda Classic 175', price: 'USD 28.500', views: 218, image: '/images/boats/bermuda.jpg' },
  { id: '3', title: 'Regnicoli Albacora 640', price: 'USD 35.000', views: 156, image: '/images/boats/regnicoli.jpg' },
]

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
  })
}

function getStatusBadge(status: string) {
  const config: Record<string, { label: string; className: string }> = {
    new: { label: 'Nueva', className: 'bg-blue-100 text-blue-700' },
    replied: { label: 'Respondida', className: 'bg-green-100 text-green-700' },
    closed: { label: 'Cerrada', className: 'bg-gray-100 text-gray-600' },
  }
  const s = config[status] || config.new
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.className}`}>
      {s.label}
    </span>
  )
}

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Resumen de tu actividad en BoatMarket</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
              </svg>
            }
          />
        ))}
      </div>

      {/* Consultas recientes */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy-900">Consultas recientes</h2>
          <Link
            href="/dashboard/mis-consultas"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todas
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3">Nombre</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3">Embarcacion</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3">Fecha</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-6 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECENT_INQUIRIES.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-navy-900">{inquiry.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{inquiry.boat}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(inquiry.date)}</td>
                    <td className="px-6 py-4">{getStatusBadge(inquiry.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Publicaciones activas */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy-900">Publicaciones activas</h2>
          <Link
            href="/dashboard/mis-embarcaciones"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACTIVE_LISTINGS.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="aspect-video relative bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-navy-600/20" />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {listing.views}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-navy-900 text-sm group-hover:text-blue-600 transition-colors">
                  {listing.title}
                </h3>
                <p className="text-blue-600 font-bold text-sm mt-1">{listing.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
