import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool from '@/lib/db'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    // ตรวจสอบว่ามีผู้ใช้ซ้ำ
    const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    if (rows.length > 0) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    // บันทึกผู้ใช้ใหม่
    await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword])
    return NextResponse.json({ message: 'User registered successfully' })
  } catch (error) {
    return NextResponse.json({ message: 'Registration failed', error }, { status: 500 })
  }
}
