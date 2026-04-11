import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { z } from 'zod'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn:  '/login',
    signOut: '/',
    error:   '/login',
  },
  providers: [
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'E-pos', type: 'email' },
        password: { label: 'Wagwoord', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = z.object({
          email:    z.string().email(),
          password: z.string().min(6),
        }).safeParse(credentials)

        if (!parsed.success) return null

        const user = await db.user.findUnique({
          where: { email: parsed.data.email },
        })

        if (!user || !user.password) return null

        const valid = await bcrypt.compare(parsed.data.password, user.password)
        if (!valid) return null

        return {
          id:    user.id,
          email: user.email,
          name:  user.name,
          role:  user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id   = token.id as string
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
})

// ─── Helper: get current session (server-side) ───────────────────────────────
export { auth as getServerSession }

// ─── Helper: assert authenticated ────────────────────────────────────────────
export async function requireAuth() {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')
  return session
}

export async function requireAdmin() {
  const session = await requireAuth()
  if ((session.user as any).role !== 'ADMIN') throw new Error('Forbidden')
  return session
}
