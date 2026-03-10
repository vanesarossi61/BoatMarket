import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe/client';
import { prisma } from '@/lib/db/client';

export const runtime = 'nodejs';

// Desactivar body parsing de Next.js para leer raw body
export const dynamic = 'force-dynamic';

async function getRawBody(req: NextRequest): Promise<Buffer> {
  const reader = req.body?.getReader();
  if (!reader) throw new Error('No request body');

  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const result = await reader.read();
    done = result.done;
    if (result.value) chunks.push(result.value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      console.error('[Stripe Webhook] Missing stripe-signature header');
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error(`[Stripe Webhook] Signature verification failed: ${message}`);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${message}` },
        { status: 400 }
      );
    }

    // Procesar evento segun tipo
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[Stripe Webhook] Checkout completed: ${session.id}`);

        const userId = session.metadata?.userId;
        if (!userId) {
          console.error('[Stripe Webhook] No userId in session metadata');
          break;
        }

        // Obtener line items de la sesion
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          { limit: 100 }
        );

        // Crear orden en la base de datos
        const order = await prisma.order.create({
          data: {
            userId,
            stripeSessionId: session.id,
            stripePaymentIntentId:
              typeof session.payment_intent === 'string'
                ? session.payment_intent
                : session.payment_intent?.id ?? null,
            status: 'completed',
            total: (session.amount_total ?? 0) / 100,
            currency: session.currency ?? 'ars',
            customerEmail: session.customer_details?.email ?? null,
            items: {
              create: lineItems.data.map((item) => ({
                name: item.description ?? 'Producto',
                quantity: item.quantity ?? 1,
                unitPrice: (item.price?.unit_amount ?? 0) / 100,
                total: ((item.price?.unit_amount ?? 0) * (item.quantity ?? 1)) / 100,
              })),
            },
          },
        });

        console.log(`[Stripe Webhook] Order created: ${order.id}`);

        // Actualizar stock de productos
        for (const item of lineItems.data) {
          const productName = item.description;
          if (productName) {
            await prisma.product.updateMany({
              where: { name: productName },
              data: { stock: { decrement: item.quantity ?? 1 } },
            });
          }
        }

        console.log(`[Stripe Webhook] Stock updated for ${lineItems.data.length} items`);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          `[Stripe Webhook] Payment intent succeeded: ${paymentIntent.id}, amount: ${paymentIntent.amount / 100} ${paymentIntent.currency}`
        );
        break;
      }

      case 'payment_intent.payment_failed': {
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          `[Stripe Webhook] Payment failed: ${failedIntent.id}, error: ${failedIntent.last_payment_error?.message ?? 'unknown'}`
        );
        break;
      }

      default: {
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
