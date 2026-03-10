import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { createCheckoutSession } from '@/lib/stripe/checkout';
import { prisma } from '@/lib/db/client';

interface CheckoutItem {
  productId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    // Verificar autenticacion
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Debes iniciar sesion para realizar una compra' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { items } = body as { items: CheckoutItem[] };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Se requiere al menos un producto' },
        { status: 400 }
      );
    }

    // Validar que todos los items tengan formato correcto
    for (const item of items) {
      if (!item.productId || typeof item.quantity !== 'number' || item.quantity < 1) {
        return NextResponse.json(
          { error: 'Cada item debe tener productId y quantity validos' },
          { status: 400 }
        );
      }
    }

    // Fetch productos de la base de datos
    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      const foundIds = new Set(products.map((p) => p.id));
      const missingIds = productIds.filter((id) => !foundIds.has(id));
      return NextResponse.json(
        { error: `Productos no encontrados: ${missingIds.join(', ')}` },
        { status: 404 }
      );
    }

    // Construir line items para Stripe
    const productMap = new Map(products.map((p) => [p.id, p]));

    const lineItems = items.map((item) => {
      const product = productMap.get(item.productId)!;
      return {
        price_data: {
          currency: 'ars',
          product_data: {
            name: product.name,
            description: product.description ?? undefined,
            images: product.images?.length
              ? [product.images[0]]
              : undefined,
          },
          unit_amount: Math.round((product.price ?? 0) * 100), // centavos
        },
        quantity: item.quantity,
      };
    });

    // Crear sesion de checkout en Stripe
    const checkoutSession = await createCheckoutSession({
      lineItems,
      customerEmail: session.user.email ?? undefined,
      metadata: {
        userId: session.user.id ?? '',
        itemCount: String(items.length),
      },
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('[Checkout POST]', error);
    return NextResponse.json(
      { error: 'Error al crear la sesion de pago' },
      { status: 500 }
    );
  }
}
