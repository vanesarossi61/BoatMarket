// =============================================
// BOATMARKET - NextAuth.js v5 Route Handler
// Catch-all API route for authentication
// Handles: /api/auth/signin, /api/auth/signout,
//          /api/auth/callback/*, /api/auth/session,
//          /api/auth/csrf, /api/auth/providers
// =============================================

import { handlers } from '@/lib/auth/auth'

export const { GET, POST } = handlers
