import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool from '@/lib/db'
import jwt from 'jsonwebtoken'


const SECRET = 'my_super_secret_key' // ใช้เก็บใน .env จริงจัง

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  try {
    const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    if (rows.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const user = rows[0]
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 })
    }

    // สร้าง JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' })
    return NextResponse.json({ message: 'Login successful', token })
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error', error: err }, { status: 500 })
  }
}

