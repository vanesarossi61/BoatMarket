"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const PROVINCIAS = [
  'Buenos Aires',
  'CABA',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Cordoba',
  'Corrientes',
  'Entre Rios',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquen',
  'Rio Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucuman',
]

export default function PerfilPage() {
  const [profile, setProfile] = useState({
    name: 'Vane Rossi',
    email: 'vanesarossi61@gmail.com',
    phone: '',
    provincia: '',
    city: '',
  })

  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  })

  const [notifications, setNotifications] = useState({
    newInquiry: true,
    savedBoat: true,
    newsletter: false,
  })

  const [isSaving, setIsSaving] = useState(false)

  function handleProfileChange(field: string, value: string) {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  function handlePasswordChange(field: string, value: string) {
    setPasswords((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave() {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Mi Perfil</h1>
        <p className="text-gray-500 mt-1">Gestiona tu informacion personal y preferencias</p>
      </div>

      {/* Avatar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-navy-700 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {profile.name
                .split(' ')
                .map((n) => n.charAt(0))
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <h3 className="font-semibold text-navy-900">{profile.name}</h3>
              <p className="text-sm text-gray-500">{profile.email}</p>
              <Button variant="outline" size="sm" className="mt-2 text-xs">
                Cambiar foto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Datos personales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Datos personales</CardTitle>
          <CardDescription>Tu informacion de contacto y ubicacion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                disabled
                className="bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="phone">Telefono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+54 11 1234-5678"
                value={profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Provincia</Label>
              <Select
                value={profile.provincia}
                onValueChange={(val) => handleProfileChange('provincia', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona provincia" />
                </SelectTrigger>
                <SelectContent>
                  {PROVINCIAS.map((prov) => (
                    <SelectItem key={prov} value={prov}>
                      {prov}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                placeholder="Tu ciudad"
                value={profile.city}
                onChange={(e) => handleProfileChange('city', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cambiar contrasena */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cambiar contrasena</CardTitle>
          <CardDescription>Actualiza tu contrasena de acceso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="current-password">Contrasena actual</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Tu contrasena actual"
              value={passwords.current}
              onChange={(e) => handlePasswordChange('current', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="new-password">Nueva contrasena</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Minimo 8 caracteres"
                value={passwords.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirmar nueva contrasena</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Repeti la contrasena"
                value={passwords.confirm}
                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notificaciones</CardTitle>
          <CardDescription>Configura que emails queres recibir</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-navy-900">Email por nuevas consultas</p>
              <p className="text-sm text-gray-500">Recibir un email cuando alguien consulta por tu embarcacion</p>
            </div>
            <Switch
              checked={notifications.newInquiry}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, newInquiry: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-navy-900">Email cuando guardan mi embarcacion</p>
              <p className="text-sm text-gray-500">Aviso cuando un usuario agrega tu embarcacion a favoritos</p>
            </div>
            <Switch
              checked={notifications.savedBoat}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, savedBoat: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-navy-900">Newsletter semanal</p>
              <p className="text-sm text-gray-500">Resumen semanal con novedades y estadisticas de tus publicaciones</p>
            </div>
            <Switch
              checked={notifications.newsletter}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, newsletter: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button - sticky bottom */}
      <div className="sticky bottom-4 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-navy-900 hover:bg-navy-800 text-white shadow-lg px-8 h-11"
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Guardando...
            </span>
          ) : (
            'Guardar cambios'
          )}
        </Button>
      </div>
    </div>
  )
}
