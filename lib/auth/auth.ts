// =============================================
// BOATMARKET - NextAuth.js v5 Configuration
// Roles: Admin, Dealer, Seller, Buyer
// =============================================

import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db/client'
import bcrypt from 'bcryptjs'
import type { UserRole } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string
      role: UserRole
      isVerified: boolean
      dealerName?: string
    }
  }
  interface User {
    role: UserRole
    isVerified: boolean
    dealerName?: string
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: '/login',
    newUser: '/registro',
    error: '/login?error=true',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            image: true,
            role: true,
            isVerified: true,
            dealerName: true,
            isBanned: true,
          },
        })

        if (!user || !user.password) return null
        if (user.isBanned) throw new Error('ACCOUNT_BANNED')

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )
        if (!isValid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          isVerified: user.isVerified,
          dealerName: user.dealerName,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role
        token.isVerified = user.isVerified
        token.dealerName = user.dealerName
      }
      if (trigger === 'update' && session) {
        token.name = session.user.name
        token.role = session.user.role
        token.isVerified = session.user.isVerified
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub!
      session.user.role = token.role as UserRole
      session.user.isVerified = token.isVerified as boolean
      session.user.dealerName = token.dealerName as string | undefined
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { isBanned: true },
        })
        if (dbUser?.isBanned) return false
      }
      return true
    },
  },
})

// Role-based access helpers
export function isAdmin(role: UserRole) {
  return role === 'ADMIN'
}

export function isDealer(role: UserRole) {
  return role === 'DEALER'
}

export function canListBoats(role: UserRole) {
  return ['ADMIN', 'DEALER', 'SELLER'].includes(role)
}

export function canManageProducts(role: UserRole) {
  return ['ADMIN', 'DEALER'].includes(role)
}

export function canModerate(role: UserRole) {
  return role === 'ADMIN'
}
