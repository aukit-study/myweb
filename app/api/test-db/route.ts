import pool from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    return NextResponse.json({ result: rows });
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed', details: error }, { status: 500 });
  }
}
