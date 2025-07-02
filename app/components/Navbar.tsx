'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Home, DollarSign, BarChart3, Car, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from "next/image"


export default function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl px-6 py-3 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md shadow-lg flex items-center justify-between z-50">
      {/* Left: Logo or Brand */}
      <div className="text-white font-bold text-xl tracking-wide">
      <Link href="/dashboard" className="flex items-center gap-2">
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      </Link>

      </div>

      {/* Center: Menu */}
      <ul className="flex gap-6 text-white font-medium">
        <li className="flex items-center gap-1 hover:text-blue-300 transition">
          <Home size={18} />
          <Link href="/dashboard">Home</Link>
        </li>

        <li className="flex items-center gap-1 hover:text-blue-300 transition">
          <DollarSign size={18} />
          <Link href="/weather">Weather</Link>
        </li>

        <li className="flex items-center gap-1 hover:text-blue-300 transition">
          <BarChart3 size={18} />
          <Link href="/music">Music</Link>
        </li>
        
        <li className="flex items-center gap-1 hover:text-blue-300 transition">
        <Download size={18} />
        <Link href="/upload">Upload</Link>
        </li>
        
        <li className="flex items-center gap-1 hover:text-blue-300 transition">
          <Car size={18} />
          <Link href="/comingsoon">comingsoon...</Link>
        </li>

      </ul>

      {/* Right: Auth */}
      <div className="text-white flex gap-3">
        {session ? (
          <>
            <span className="hidden md:inline font-semibold">{session.user?.name || 'User'}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-sm font-semibold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full text-sm font-semibold transition"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/register')}
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full text-sm font-semibold transition"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
