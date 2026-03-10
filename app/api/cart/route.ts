import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';

interface CartItem {
  productId: string;
  quantity: number;
}

function parseCartCookie(req: NextRequest): CartItem[] {
  try {
    const raw = req.cookies.get('cart')?.value;
    if (!raw) return [];
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item: unknown): item is CartItem =>
        typeof item === 'object' &&
        item !== null &&
        'productId' in item &&
        'quantity' in item &&
        typeof (item as CartItem).productId === 'string' &&
        typeof (item as CartItem).quantity === 'number' &&
        (item as CartItem).quantity > 0
    );
  } catch {
    return [];
  }
}

function setCartCookie(response: NextResponse, items: CartItem[]): void {
  response.cookies.set('cart', encodeURIComponent(JSON.stringify(items)), {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  });
}

// GET — obtener carrito completo
export async function GET(req: NextRequest) {
  try {
    const cartItems = parseCartCookie(req);

    if (cartItems.length === 0) {
      return NextResponse.json({
        items: [],
        total: 0,
        itemCount: 0,
      });
    }

    const productIds = cartItems.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    const items = cartItems
      .map((item) => {
        const product = productMap.get(item.productId);
        if (!product) return null;
        return { product, quantity: item.quantity };
      })
      .filter(Boolean);

    const total = items.reduce((sum, item) => {
      if (!item) return sum;
      return sum + (item.product.price ?? 0) * item.quantity;
    }, 0);

    return NextResponse.json({
      items,
      total: Math.round(total * 100) / 100,
      itemCount: items.reduce((sum, item) => sum + (item?.quantity ?? 0), 0),
    });
  } catch (error) {
    console.error('[Cart GET]', error);
    return NextResponse.json(
      { error: 'Error al obtener el carrito' },
      { status: 500 }
    );
  }
}

// POST — agregar producto al carrito
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, quantity } = body as {
      productId: string;
      quantity: number;
    };

    if (!productId || typeof quantity !== 'number' || quantity < 1) {
      return NextResponse.json(
        { error: 'productId y quantity (>= 1) son requeridos' },
        { status: 400 }
      );
    }

    // Validar que el producto existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    const cartItems = parseCartCookie(req);
    const existingIndex = cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (existingIndex >= 0) {
      cartItems[existingIndex].quantity += quantity;
    } else {
      cartItems.push({ productId, quantity });
    }

    const response = NextResponse.json({
      success: true,
      items: cartItems,
    });

    setCartCookie(response, cartItems);
    return response;
  } catch (error) {
    console.error('[Cart POST]', error);
    return NextResponse.json(
      { error: 'Error al agregar al carrito' },
      { status: 500 }
    );
  }
}

// DELETE — eliminar producto del carrito
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId } = body as { productId: string };

    if (!productId) {
      return NextResponse.json(
        { error: 'productId es requerido' },
        { status: 400 }
      );
    }

    const cartItems = parseCartCookie(req);
    const filteredItems = cartItems.filter(
      (item) => item.productId !== productId
    );

    const response = NextResponse.json({
      success: true,
      items: filteredItems,
    });

    setCartCookie(response, filteredItems);
    return response;
  } catch (error) {
    console.error('[Cart DELETE]', error);
    return NextResponse.json(
      { error: 'Error al eliminar del carrito' },
      { status: 500 }
    );
  }
}
