"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Eye,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Hash,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  BarChart3,
  Target,
  Search,
  Camera,
  FileText,
  DollarSign,
  Lightbulb,
  Globe,
  Smartphone,
  Monitor,
  Share2,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type PeriodKey = '7d' | '30d' | '90d' | 'year'

interface StatCard {
  label: string
  value: string
  change: number
  changeLabel: string
  icon: typeof Eye
  color: string
  bgColor: string
}

interface TopListing {
  id: string
  title: string
  views: number
  inquiries: number
  ctr: number
}

interface TrafficSource {
  label: string
  value: number
  color: string
}

interface Recommendation {
  title: string
  description: string
  icon: typeof Camera
  priority: 'alta' | 'media' | 'baja'
}

/* ------------------------------------------------------------------ */
/*  Mock data per period                                              */
/* ------------------------------------------------------------------ */

const PERIOD_LABELS: Record<PeriodKey, string> = {
  '7d': 'Ultimos 7 dias',
  '30d': 'Ultimos 30 dias',
  '90d': 'Ultimos 90 dias',
  year: 'Este anio',
}

const MOCK_STATS: Record<PeriodKey, StatCard[]> = {
  '7d': [
    {
      label: 'Vistas totales',
      value: '1.247',
      change: 12,
      changeLabel: 'vs semana anterior',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Consultas recibidas',
      value: '18',
      change: 8,
      changeLabel: 'vs semana anterior',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Tasa de conversion',
      value: '3,2%',
      change: -0.4,
      changeLabel: 'vs semana anterior',
      icon: Target,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'Posicion promedio',
      value: '#4',
      change: 2,
      changeLabel: 'posiciones subiste',
      icon: Hash,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ],
  '30d': [
    {
      label: 'Vistas totales',
      value: '4.832',
      change: 18,
      changeLabel: 'vs mes anterior',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Consultas recibidas',
      value: '67',
      change: 15,
      changeLabel: 'vs mes anterior',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Tasa de conversion',
      value: '3,8%',
      change: 0.6,
      changeLabel: 'vs mes anterior',
      icon: Target,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'Posicion promedio',
      value: '#3',
      change: 1,
      changeLabel: 'posiciones subiste',
      icon: Hash,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ],
  '90d': [
    {
      label: 'Vistas totales',
      value: '12.456',
      change: 24,
      changeLabel: 'vs trimestre anterior',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Consultas recibidas',
      value: '189',
      change: 22,
      changeLabel: 'vs trimestre anterior',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Tasa de conversion',
      value: '4,1%',
      change: 1.2,
      changeLabel: 'vs trimestre anterior',
      icon: Target,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'Posicion promedio',
      value: '#3',
      change: 3,
      changeLabel: 'posiciones subiste',
      icon: Hash,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ],
  year: [
    {
      label: 'Vistas totales',
      value: '34.891',
      change: 45,
      changeLabel: 'vs anio anterior',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Consultas recibidas',
      value: '412',
      change: 38,
      changeLabel: 'vs anio anterior',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Tasa de conversion',
      value: '3,5%',
      change: 0.8,
      changeLabel: 'vs anio anterior',
      icon: Target,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'Posicion promedio',
      value: '#4',
      change: 2,
      changeLabel: 'posiciones subiste',
      icon: Hash,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ],
}

const MOCK_TOP_LISTINGS: TopListing[] = [
  { id: '1', title: 'Bayliner VR5 2024 - Impecable', views: 342, inquiries: 12, ctr: 3.5 },
  { id: '2', title: 'Sea Ray SPX 190 - Solo agua dulce', views: 218, inquiries: 8, ctr: 3.7 },
  { id: '3', title: 'Mercury 150HP FourStroke', views: 189, inquiries: 6, ctr: 3.2 },
  { id: '4', title: 'Garmin ECHOMAP UHD2 93sv', views: 156, inquiries: 4, ctr: 2.6 },
  { id: '5', title: 'Yamaha WaveRunner EX Deluxe', views: 98, inquiries: 2, ctr: 2.0 },
]

const MOCK_TRAFFIC: TrafficSource[] = [
  { label: 'Busqueda interna', value: 45, color: 'bg-blue-500' },
  { label: 'Google', value: 30, color: 'bg-green-500' },
  { label: 'Directo', value: 15, color: 'bg-amber-500' },
  { label: 'Redes sociales', value: 10, color: 'bg-purple-500' },
]

const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    title: 'Mejora tus fotos',
    description:
      'Las publicaciones con 5 o mas fotos de alta calidad reciben un 40% mas de consultas. Tu Yamaha WaveRunner solo tiene 2 fotos.',
    icon: Camera,
    priority: 'alta',
  },
  {
    title: 'Completa la descripcion',
    description:
      'Agrega detalles como equipamiento, historial de mantenimiento y estado del motor. Las descripciones completas mejoran tu posicion en busqueda.',
    icon: FileText,
    priority: 'media',
  },
  {
    title: 'Ajusta el precio',
    description:
      'Tu Garmin ECHOMAP esta un 15% por encima del precio promedio para productos similares. Considera ajustarlo para aumentar las vistas.',
    icon: DollarSign,
    priority: 'baja',
  },
]

/* ------------------------------------------------------------------ */
/*  Chart placeholder days data                                       */
/* ------------------------------------------------------------------ */

const CHART_DAYS = [
  { day: 'Lun', views: 145 },
  { day: 'Mar', views: 198 },
  { day: 'Mie', views: 167 },
  { day: 'Jue', views: 210 },
  { day: 'Vie', views: 245 },
  { day: 'Sab', views: 178 },
  { day: 'Dom', views: 104 },
]

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MisAnalyticsPage() {
  const [period, setPeriod] = useState<PeriodKey>('7d')

  const currentStats = MOCK_STATS[period]
  const maxViews = Math.max(...CHART_DAYS.map((d) => d.views))

  /* ---------------------------------------------------------------- */
  return (
    <div className="space-y-6">
      {/* Header + Period Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Mis Estadisticas</h1>
          <p className="text-gray-500 mt-1">
            Analiza el rendimiento de tus publicaciones
          </p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {(Object.keys(PERIOD_LABELS) as PeriodKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                period === key
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {key === 'year' ? 'Este anio' : key === '7d' ? '7 dias' : key === '30d' ? '30 dias' : '90 dias'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {currentStats.map((stat) => {
          const isPositive = stat.change > 0
          return (
            <Card key={stat.label} className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      isPositive
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {isPositive ? '+' : ''}
                    {stat.change}
                    {stat.label === 'Tasa de conversion' ? 'pp' : '%'}
                  </div>
                </div>
                <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.changeLabel}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Chart Placeholder */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-navy-900">Vistas por dia</CardTitle>
              <CardDescription>Trafico de tus publicaciones en los {PERIOD_LABELS[period].toLowerCase()}</CardDescription>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
              <Eye className="h-3 w-3 mr-1" />
              {currentStats[0].value} total
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Simple bar chart with CSS */}
          <div className="flex items-end gap-2 h-48">
            {CHART_DAYS.map((day) => {
              const height = (day.views / maxViews) * 100
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">
                    {day.views}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-500 hover:from-amber-500 hover:to-amber-400 cursor-pointer min-h-[4px]"
                    style={{ height: `${height}%` }}
                    title={`${day.day}: ${day.views} vistas`}
                  />
                  <span className="text-xs text-gray-500">{day.day}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Two column layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Listings */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-navy-900">Top publicaciones por rendimiento</CardTitle>
            <CardDescription>Tus publicaciones con mas actividad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <div className="col-span-6">Publicacion</div>
                <div className="col-span-2 text-right">Vistas</div>
                <div className="col-span-2 text-right">Consultas</div>
                <div className="col-span-2 text-right">CTR</div>
              </div>

              {/* Table rows */}
              {MOCK_TOP_LISTINGS.map((listing, idx) => (
                <div
                  key={listing.id}
                  className={`grid grid-cols-12 gap-2 px-3 py-3 text-sm items-center ${
                    idx % 2 === 0 ? 'bg-gray-50/50' : ''
                  }`}
                >
                  <div className="col-span-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-400 w-4">#{idx + 1}</span>
                      <span className="text-navy-900 font-medium truncate">
                        {listing.title}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 text-right font-medium text-gray-700">
                    {listing.views.toLocaleString('es-AR')}
                  </div>
                  <div className="col-span-2 text-right font-medium text-gray-700">
                    {listing.inquiries}
                  </div>
                  <div className="col-span-2 text-right">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        listing.ctr >= 3.5
                          ? 'text-green-700 border-green-200 bg-green-50'
                          : listing.ctr >= 2.5
                          ? 'text-amber-700 border-amber-200 bg-amber-50'
                          : 'text-red-700 border-red-200 bg-red-50'
                      }`}
                    >
                      {listing.ctr}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-navy-900">Fuentes de trafico</CardTitle>
            <CardDescription>De donde llegan los visitantes a tus publicaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_TRAFFIC.map((source) => (
                <div key={source.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${source.color}`} />
                      <span className="text-sm font-medium text-gray-700">
                        {source.label}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-navy-900">
                      {source.value}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${source.color} rounded-full transition-all duration-700`}
                      style={{ width: `${source.value}%` }}
                    />
                  </div>
                </div>
              ))}

              {/* Device breakdown */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Dispositivos
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Mobile</span>
                    <span className="text-sm font-bold text-navy-900">62%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Desktop</span>
                    <span className="text-sm font-bold text-navy-900">33%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Tablet</span>
                    <span className="text-sm font-bold text-navy-900">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-navy-900">Recomendaciones para mejorar</CardTitle>
          </div>
          <CardDescription>
            Sugerencias personalizadas basadas en el rendimiento de tus publicaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            {MOCK_RECOMMENDATIONS.map((rec) => {
              const priorityStyles = {
                alta: 'border-l-red-400 bg-red-50/30',
                media: 'border-l-amber-400 bg-amber-50/30',
                baja: 'border-l-blue-400 bg-blue-50/30',
              }
              const priorityLabel = {
                alta: { text: 'Prioridad alta', class: 'text-red-600 bg-red-100' },
                media: { text: 'Prioridad media', class: 'text-amber-600 bg-amber-100' },
                baja: { text: 'Prioridad baja', class: 'text-blue-600 bg-blue-100' },
              }

              return (
                <div
                  key={rec.title}
                  className={`p-4 rounded-lg border-l-4 ${priorityStyles[rec.priority]}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <rec.icon className="h-5 w-5 text-navy-900" />
                    <h4 className="font-semibold text-navy-900 text-sm">
                      {rec.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {rec.description}
                  </p>
                  <Badge
                    className={`text-xs ${priorityLabel[rec.priority].class}`}
                  >
                    {priorityLabel[rec.priority].text}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
