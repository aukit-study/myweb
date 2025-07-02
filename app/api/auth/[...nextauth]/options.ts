import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        const [rows] = (await db.query(
          "SELECT * FROM users WHERE email = ?",
          [email]
        )) as unknown as [RowDataPacket[]];
        const user = rows[0];
        if (!user) return null;
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return { id: user.id, name: user.name || user.email, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
