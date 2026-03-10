'use client'

// =============================================
// BOATMARKET - Main Header
// =============================================

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import {
  Anchor,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Heart,
  ShoppingCart,
  Ship,
  Sailboat,
  Waves,
  Gauge,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/hooks/useCart'

const NAV_ITEMS = [
  { href: '/embarcaciones', label: 'Embarcaciones' },
  { href: '/productos', label: 'Productos' },
  { href: '/blog', label: 'Blog' },
]

const BOAT_CATEGORIES = [
  { href: '/embarcaciones?type=lancha', label: 'Lanchas', icon: Ship },
  { href: '/embarcaciones?type=velero', label: 'Veleros', icon: Sailboat },
  { href: '/embarcaciones?type=yate', label: 'Yates', icon: Ship },
  { href: '/embarcaciones?type=moto-de-agua', label: 'Motos de Agua', icon: Waves },
  { href: '/embarcaciones?type=semirigido', label: 'Semirigidos', icon: Ship },
  { href: '/embarcaciones?type=pesca', label: 'Pesca', icon: Anchor },
]

export function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const { itemCount } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/embarcaciones?q=${encodeURIComponent(searchQuery.trim())}`
      setSearchOpen(false)
    }
  }

  const initials = session?.user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-navy-900">
          <Anchor className="h-7 w-7 text-blue-600" />
          <span className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>
            Boat<span className="text-blue-600">Market</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <Link
              href="/embarcaciones"
              className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-blue-600 ${
                pathname.startsWith('/embarcaciones') ? 'text-blue-600 bg-sky-50' : 'text-gray-700'
              }`}
            >
              Embarcaciones
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            {/* Mega Menu */}
            {megaMenuOpen && (
              <div className="absolute left-0 top-full z-50 w-80 animate-slide-down rounded-xl border bg-white p-4 shadow-xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Categorias
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {BOAT_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-sky-50 hover:text-blue-600"
                    >
                      <cat.icon className="h-4 w-4" />
                      {cat.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t pt-3">
                  <Link
                    href="/embarcaciones"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Ver todas las embarcaciones
                  </Link>
                </div>
              </div>
            )}
          </div>

          {NAV_ITEMS.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-blue-600 ${
                pathname.startsWith(item.href) ? 'text-blue-600 bg-sky-50' : 'text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Search toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-gray-600 hover:text-blue-600"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Link href="/productos" className="relative">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center bg-blue-600">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Auth */}
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground">{session.user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />
                    Panel de control
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/mis-embarcaciones" className="flex items-center gap-2 cursor-pointer">
                    <Ship className="h-4 w-4" />
                    Mis embarcaciones
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/mis-consultas" className="flex items-center gap-2 cursor-pointer">
                    <Heart className="h-4 w-4" />
                    Mis consultas
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/perfil" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Mi perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Ingresar</Link>
              </Button>
              <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/registro">Registrarse</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Anchor className="h-5 w-5 text-blue-600" />
                  BoatMarket
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-sky-50 ${
                      pathname.startsWith(item.href)
                        ? 'bg-sky-50 text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="my-4 h-px bg-gray-100" />
                {!session?.user && (
                  <>
                    <Link href="/login" className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-sky-50">
                      Ingresar
                    </Link>
                    <Link href="/registro" className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-blue-700">
                      Registrarse
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Collapsible Search Bar */}
      {searchOpen && (
        <div className="animate-slide-down border-t bg-white px-4 py-3">
          <form onSubmit={handleSearch} className="container flex gap-2">
            <Input
              type="search"
              placeholder="Buscar embarcaciones, productos, marcas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Buscar
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </header>
  )
}
