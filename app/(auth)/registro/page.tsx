"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const registerSchema = z
  .object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Ingresa un email valido'),
    password: z
      .string()
      .min(8, 'Minimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayuscula')
      .regex(/[0-9]/, 'Debe contener al menos un numero'),
    confirmPassword: z.string(),
    accountType: z.enum(['buyer', 'seller', 'dealer'], {
      required_error: 'Selecciona un tipo de cuenta',
    }),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'Debes aceptar los terminos y condiciones' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contrasenas no coinciden',
    path: ['confirmPassword'],
  })

type RegisterForm = z.infer<typeof registerSchema>

function getPasswordStrength(password: string): {
  level: 'weak' | 'medium' | 'strong'
  label: string
  color: string
  width: string
} {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 2) return { level: 'weak', label: 'Debil', color: 'bg-red-500', width: 'w-1/3' }
  if (score <= 3) return { level: 'medium', label: 'Media', color: 'bg-amber-500', width: 'w-2/3' }
  return { level: 'strong', label: 'Fuerte', color: 'bg-green-500', width: 'w-full' }
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '' as string,
    terms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const passwordStrength = useMemo(
    () => (form.password ? getPasswordStrength(form.password) : null),
    [form.password]
  )

  function handleChange(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
    if (serverError) setServerError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError('')

    const result = registerSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          accountType: form.accountType,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setServerError(data.message || 'Error al crear la cuenta')
        return
      }

      router.push('/login?registered=true')
    } catch {
      setServerError('Ocurrio un error. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 text-center mb-6">
        Crea tu cuenta
      </h2>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div className="space-y-1.5">
          <Label htmlFor="name">Nombre completo</Label>
          <Input
            id="name"
            placeholder="Juan Perez"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={errors.name ? 'border-red-400' : ''}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={errors.email ? 'border-red-400' : ''}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password">Contrasena</Label>
          <Input
            id="password"
            type="password"
            placeholder="Minimo 8 caracteres"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            className={errors.password ? 'border-red-400' : ''}
          />
          {passwordStrength && (
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}
                />
              </div>
              <p
                className={`text-xs ${
                  passwordStrength.level === 'weak'
                    ? 'text-red-500'
                    : passwordStrength.level === 'medium'
                    ? 'text-amber-500'
                    : 'text-green-600'
                }`}
              >
                Seguridad: {passwordStrength.label}
              </p>
            </div>
          )}
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirmar contrasena</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Repeti tu contrasena"
            value={form.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            className={errors.confirmPassword ? 'border-red-400' : ''}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Account Type */}
        <div className="space-y-1.5">
          <Label>Tipo de cuenta</Label>
          <Select
            value={form.accountType}
            onValueChange={(val) => handleChange('accountType', val)}
          >
            <SelectTrigger className={errors.accountType ? 'border-red-400' : ''}>
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buyer">Comprador</SelectItem>
              <SelectItem value="seller">Vendedor particular</SelectItem>
              <SelectItem value="dealer">Dealer profesional</SelectItem>
            </SelectContent>
          </Select>
          {errors.accountType && (
            <p className="text-red-500 text-xs">{errors.accountType}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            checked={form.terms}
            onCheckedChange={(checked) => handleChange('terms', !!checked)}
            className="mt-0.5"
          />
          <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-tight">
            Acepto los{' '}
            <Link href="/terminos" className="text-blue-600 hover:underline">
              terminos y condiciones
            </Link>{' '}
            y la{' '}
            <Link href="/privacidad" className="text-blue-600 hover:underline">
              politica de privacidad
            </Link>
          </Label>
        </div>
        {errors.terms && <p className="text-red-500 text-xs -mt-2">{errors.terms}</p>}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold h-11"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creando cuenta...
            </span>
          ) : (
            'Crear cuenta'
          )}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Ya tenes cuenta?{' '}
        <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
          Inicia sesion
        </Link>
      </p>
    </div>
  )
}
