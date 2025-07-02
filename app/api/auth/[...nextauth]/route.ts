import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/lib/db' // หรือเปลี่ยนเป็น path ถูกต้อง
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const { email, password } = credentials
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null
        if (!user) return null

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return null

        return {
          id: user.id,
          name: user.name || user.email,
          email: user.email,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


