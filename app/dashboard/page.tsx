'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') return <p className="p-6 text-gray-500">Loading...</p>
  if (!session) return null

  return (

    <section>
      <div className="stars"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Welcome, {session.user?.name || session.user?.email}
        </h1>
        <p className="text-gray-700 mb-6">
          You are logged in as <strong>{session.user?.email}</strong>
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
          <button
            onClick={() => router.push('/profile')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </section>
    
  )
}
