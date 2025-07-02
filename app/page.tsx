'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from './components/Navbar'
import SessionWrapper from './components/SessionWrapper'
export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetch('/api/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) setAuthorized(true)
        else router.push('/login')
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-20 text-xl">Loading...</p>
  if (!authorized) return null

  return (

        <html lang="en" className="scroll-smooth bg-gray-50">
      <body className="min-h-screen flex flex-col">
        
          <header className="bg-blue-600 text-white px-6 py-4 shadow-md">
            <SessionWrapper><Navbar /></SessionWrapper>
            
            <h1 className="text-xl font-semibold">My Awesome App</h1>
            <div>
              <h1>Welcome to your dashboard!</h1>
          </div>
          </header>
        <div className="max-w-3xl mx-auto p-8 mt-10 bg-white bg-opacity-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
        <p className="mb-6 text-lg">You are logged in!</p>
        </div>
      </body>
    </html>
  )
}
