// =============================================
// BOATMARKET - Stripe Helper Utilities
// =============================================

import type Stripe from 'stripe'
import { STRIPE_CONFIG } from './client'

// Stripe expects amounts in centavos (smallest currency unit)
export function formatStripeAmount(amount: number): number {
  return Math.round(amount * 100)
}

// Convert from Stripe centavos back to display amount
export function fromStripeAmount(amount: number): number {
  return amount / 100
}

interface LineItemInput {
  name: string
  description?: string
  price: number
  quantity: number
  imageUrl?: string
}

export function getLineItems(items: LineItemInput[]): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return items.map((item) => ({
    price_data: {
      currency: STRIPE_CONFIG.currency,
      product_data: {
        name: item.name,
        description: item.description || undefined,
        images: item.imageUrl ? [item.imageUrl] : undefined,
      },
      unit_amount: formatStripeAmount(item.price),
    },
    quantity: item.quantity,
  }))
}

type ShippingMethod = 'standard' | 'express'

const SHIPPING_RATES: Record<ShippingMethod, { base: number; perKg: number }> = {
  standard: { base: 2500, perKg: 350 },
  express: { base: 5500, perKg: 700 },
}

export function calculateShipping(
  items: LineItemInput[],
  method: ShippingMethod = 'standard'
): number {
  const rate = SHIPPING_RATES[method]
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  // Estimate: base + per-item surcharge
  const shippingAmount = rate.base + totalItems * rate.perKg
  return formatStripeAmount(shippingAmount)
}

export function formatReceiptAmount(amountInCents: number, currency: string = 'ARS'): string {
  const amount = fromStripeAmount(amountInCents)
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function getPaymentStatusLabel(status: string): { label: string; color: string } {
  const statuses: Record<string, { label: string; color: string }> = {
    succeeded: { label: 'Pagado', color: 'green' },
    processing: { label: 'Procesando', color: 'yellow' },
    requires_payment_method: { label: 'Pendiente de pago', color: 'orange' },
    requires_confirmation: { label: 'Requiere confirmacion', color: 'orange' },
    requires_action: { label: 'Accion requerida', color: 'red' },
    canceled: { label: 'Cancelado', color: 'gray' },
    requires_capture: { label: 'Por capturar', color: 'blue' },
  }
  return statuses[status] || { label: status, color: 'gray' }
}
