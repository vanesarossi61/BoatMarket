import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl" role="img" aria-label="ancla">&#9875;</span>
            <span className="text-2xl font-bold text-white tracking-tight">
              Boat<span className="text-blue-400">Market</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-blue-300 text-sm mt-6">
          &copy; {new Date().getFullYear()} BoatMarket. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}
