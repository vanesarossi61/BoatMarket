// =============================================
// BOATMARKET - Auth Middleware
// Route protection by role
// =============================================

import { auth } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = [
  '/',
  '/login',
  '/registro',
  '/embarcaciones',
  '/productos',
  '/blog',
  '/contacto',
  '/api/auth',
]

const dealerRoutes = ['/dashboard/dealer']
const sellerRoutes = ['/dashboard/mis-embarcaciones', '/dashboard/mis-anuncios']
const adminRoutes = ['/admin']

export default auth((req: NextRequest & { auth: any }) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Public routes - always accessible
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Not authenticated - redirect to login
  if (!session?.user) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const { role } = session.user

  // Admin routes
  if (adminRoutes.some((r) => pathname.startsWith(r)) && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Dealer routes
  if (dealerRoutes.some((r) => pathname.startsWith(r)) && role !== 'DEALER' && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Seller routes (seller, dealer, or admin)
  if (
    sellerRoutes.some((r) => pathname.startsWith(r)) &&
    !['SELLER', 'DEALER', 'ADMIN'].includes(role)
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
