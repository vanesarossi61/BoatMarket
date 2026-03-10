// =============================================
// BOATMARKET - Boat Specifications Display
// =============================================

import {
  Ruler,
  Gauge,
  Fuel,
  Users,
  Waves,
  Anchor,
  Bed,
  Bath,
  Droplets,
  Navigation,
  Wind,
} from 'lucide-react'
import { formatLength, formatHours } from '@/lib/utils/formatters'
import type { Boat } from '@/types'

interface BoatSpecsProps {
  boat: Boat
}

interface SpecItem {
  icon: React.ElementType
  label: string
  value: string | number | undefined | null
}

export function BoatSpecs({ boat }: BoatSpecsProps) {
  const dimensionSpecs: SpecItem[] = [
    { icon: Ruler, label: 'Eslora', value: boat.lengthFt ? formatLength(boat.lengthFt) : null },
    { icon: Ruler, label: 'Manga', value: boat.beamFt ? formatLength(boat.beamFt) : null },
    { icon: Waves, label: 'Calado', value: boat.draftFt ? formatLength(boat.draftFt) : null },
    { icon: Anchor, label: 'Peso', value: boat.weightKg ? `${boat.weightKg.toLocaleString()} kg` : null },
    { icon: Navigation, label: 'Francobordo', value: boat.bridgeClearance ? `${boat.bridgeClearance} ft` : null },
    { icon: Wind, label: 'Deadrise', value: boat.deadrise ? `${boat.deadrise} grados` : null },
  ].filter((s) => s.value)

  const engineSpecs: SpecItem[] = [
    { icon: Gauge, label: 'Tipo motor', value: boat.engineType },
    { icon: Gauge, label: 'Motor', value: boat.engineMake && boat.engineModel ? `${boat.engineMake} ${boat.engineModel}` : boat.engineMake },
    { icon: Gauge, label: 'Potencia', value: boat.totalHp ? `${boat.totalHp} HP${boat.engineCount && boat.engineCount > 1 ? ` (${boat.engineCount}x${boat.engineHp})` : ''}` : null },
    { icon: Gauge, label: 'Horas motor', value: boat.engineHours ? formatHours(boat.engineHours) : null },
    { icon: Fuel, label: 'Combustible', value: boat.fuelType },
    { icon: Gauge, label: 'Vel. maxima', value: boat.maxSpeedKnots ? `${boat.maxSpeedKnots} nudos` : null },
    { icon: Gauge, label: 'Vel. crucero', value: boat.cruiseSpeedKnots ? `${boat.cruiseSpeedKnots} nudos` : null },
  ].filter((s) => s.value)

  const capacitySpecs: SpecItem[] = [
    { icon: Bed, label: 'Camarotes', value: boat.cabins },
    { icon: Bed, label: 'Literas', value: boat.berths },
    { icon: Bath, label: 'Banos', value: boat.heads },
    { icon: Users, label: 'Pasajeros max.', value: boat.maxPassengers },
    { icon: Droplets, label: 'Combustible', value: boat.fuelCapGal ? `${boat.fuelCapGal} gal` : null },
    { icon: Droplets, label: 'Agua dulce', value: boat.waterCapGal ? `${boat.waterCapGal} gal` : null },
  ].filter((s) => s.value)

  const equipmentItems = [
    { label: 'GPS', active: boat.hasGps },
    { label: 'Fishfinder', active: boat.hasFishfinder },
    { label: 'Radar', active: boat.hasRadar },
    { label: 'Radio VHF', active: boat.hasVhf },
    { label: 'Piloto automatico', active: boat.hasAutopilot },
    { label: 'Chartplotter', active: boat.hasChartplotter },
    { label: 'AIS', active: boat.hasAis },
    { label: 'Aire acondicionado', active: boat.hasAirCond },
    { label: 'Generador', active: boat.hasGenerator },
    { label: 'Bimini', active: boat.hasBimini },
    { label: 'Windlass', active: boat.hasWindlass },
    { label: 'Bow Thruster', active: boat.hasBowThruster },
    { label: 'Plataforma de bano', active: boat.hasSwimPlatform },
    { label: 'Livewell', active: boat.hasLivewell },
    { label: 'Estabilizadores', active: boat.hasStabilizers },
    { label: 'Shore Power', active: boat.hasShorepower },
  ].filter((item) => item.active)

  const SpecGroup = ({ title, specs }: { title: string; specs: SpecItem[] }) => {
    if (specs.length === 0) return null
    return (
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">{title}</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {specs.map((spec) => (
            <div key={spec.label} className="flex items-start gap-2.5 rounded-lg bg-gray-50 p-3">
              <spec.icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">{spec.label}</p>
                <p className="text-sm font-semibold text-gray-900">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <SpecGroup title="Dimensiones" specs={dimensionSpecs} />
      <SpecGroup title="Motor" specs={engineSpecs} />
      <SpecGroup title="Capacidad" specs={capacitySpecs} />

      {/* Equipment */}
      {equipmentItems.length > 0 && (
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Equipamiento
          </h3>
          <div className="flex flex-wrap gap-2">
            {equipmentItems.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hull Info */}
      {(boat.hullMaterial || boat.hullType) && (
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Casco</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {boat.hullMaterial && (
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Material</p>
                <p className="text-sm font-semibold capitalize text-gray-900">{boat.hullMaterial.replace('_', ' ')}</p>
              </div>
            )}
            {boat.hullType && (
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Tipo</p>
                <p className="text-sm font-semibold capitalize text-gray-900">{boat.hullType.replace('_', ' ')}</p>
              </div>
            )}
            {boat.hullColor && (
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Color</p>
                <p className="text-sm font-semibold text-gray-900">{boat.hullColor}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
