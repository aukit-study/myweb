import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const SECRET = 'my_super_secret_key'

export async function POST(req: NextRequest) {
  const { token } = await req.json()
  try {
    const decoded = jwt.verify(token, SECRET)
    return NextResponse.json({ valid: true, user: decoded })
  } catch (err) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
}
