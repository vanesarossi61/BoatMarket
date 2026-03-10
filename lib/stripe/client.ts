// =============================================
// BOATMARKET - Stripe Client Singleton
// =============================================

import Stripe from 'stripe'

const globalForStripe = globalThis as unknown as {
  stripe: Stripe | undefined
}

export const stripe =
  globalForStripe.stripe ??
  new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia',
    typescript: true,
    appInfo: {
      name: 'BoatMarket',
      version: '1.0.0',
      url: 'https://boatmarket.com.ar',
    },
  })

if (process.env.NODE_ENV !== 'production') {
  globalForStripe.stripe = stripe
}

export const STRIPE_CONFIG = {
  currency: 'ars' as const,
  paymentMethods: ['card', 'bank_transfer'] as const,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
}