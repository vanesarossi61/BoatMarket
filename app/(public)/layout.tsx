// =============================================
// BOATMARKET - Public Routes Layout
// Wrapper for all public-facing pages
// Header/Footer are in root layout
// =============================================

import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: true, follow: true },
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.16))] flex-col">
      {children}
    </div>
  )
}
