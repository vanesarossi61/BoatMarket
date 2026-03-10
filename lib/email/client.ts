// =============================================
// BOATMARKET - Resend Email Client
// =============================================

import { Resend } from 'resend'

const globalForResend = globalThis as unknown as {
  resend: Resend | undefined
}

export const resend =
  globalForResend.resend ??
  new Resend(process.env.RESEND_API_KEY!)

if (process.env.NODE_ENV !== 'production') {
  globalForResend.resend = resend
}

export const EMAIL_FROM = 'BoatMarket <hola@boatmarket.com.ar>'
export const EMAIL_REPLY_TO = 'soporte@boatmarket.com.ar'

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}) {
  return resend.emails.send({
    from: EMAIL_FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    reply_to: replyTo || EMAIL_REPLY_TO,
  })
}
