// =============================================
// BOATMARKET - Stripe Checkout & Payments
// =============================================

import { stripe, STRIPE_CONFIG } from './client'
import { formatStripeAmount, getLineItems, calculateShipping } from './helpers'
import type Stripe from 'stripe'

interface CreateCheckoutParams {
  items: Array<{
    name: string
    description?: string
    price: number
    quantity: number
    imageUrl?: string
  }>
  customerEmail: string
  customerId?: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
  shippingRequired?: boolean
}

export async function createCheckoutSession(params: CreateCheckoutParams): Promise<Stripe.Checkout.Session> {
  const {
    items,
    customerEmail,
    customerId,
    successUrl,
    cancelUrl,
    metadata = {},
    shippingRequired = true,
  } = params

  const lineItems = getLineItems(items)
  const shippingOptions = shippingRequired
    ? [
        {
          shipping_rate_data: {
            type: 'fixed_amount' as const,
            fixed_amount: {
              amount: calculateShipping(items),
              currency: STRIPE_CONFIG.currency,
            },
            display_name: 'Envio estandar',
            delivery_estimate: {
              minimum: { unit: 'business_day' as const, value: 5 },
              maximum: { unit: 'business_day' as const, value: 10 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount' as const,
            fixed_amount: {
              amount: calculateShipping(items, 'express'),
              currency: STRIPE_CONFIG.currency,
            },
            display_name: 'Envio express',
            delivery_estimate: {
              minimum: { unit: 'business_day' as const, value: 2 },
              maximum: { unit: 'business_day' as const, value: 3 },
            },
          },
        },
      ]
    : []

  return stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    customer_email: customerId ? undefined : customerEmail,
    customer: customerId || undefined,
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    metadata: {
      ...metadata,
      source: 'boatmarket',
    },
    shipping_options: shippingOptions,
    locale: 'es',
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    phone_number_collection: { enabled: true },
  })
}

interface CreatePaymentIntentParams {
  amount: number
  customerEmail: string
  customerId?: string
  metadata?: Record<string, string>
  description?: string
}

export async function createPaymentIntent(params: CreatePaymentIntentParams): Promise<Stripe.PaymentIntent> {
  const { amount, customerEmail, customerId, metadata = {}, description } = params

  let customer = customerId
  if (!customer) {
    const existing = await stripe.customers.list({ email: customerEmail, limit: 1 })
    if (existing.data.length > 0) {
      customer = existing.data[0].id
    } else {
      const newCustomer = await stripe.customers.create({ email: customerEmail })
      customer = newCustomer.id
    }
  }

  return stripe.paymentIntents.create({
    amount: formatStripeAmount(amount),
    currency: STRIPE_CONFIG.currency,
    customer,
    description: description || 'Compra en BoatMarket',
    metadata: {
      ...metadata,
      source: 'boatmarket',
    },
    automatic_payment_methods: { enabled: true },
  })
}

export async function webhookHandler(
  body: string | Buffer,
  signature: string
): Promise<Stripe.Event> {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    STRIPE_CONFIG.webhookSecret
  )
}

export async function getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer', 'payment_intent'],
  })
}

export async function createRefund(paymentIntentId: string, amount?: number): Promise<Stripe.Refund> {
  return stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount: amount ? formatStripeAmount(amount) : undefined,
  })
}
