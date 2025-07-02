'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    if (res.ok) {
      router.push('/login')
    } else {
      setError(data.message)
    }
  }

  return (
      <section>
        <div className="stars"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleRegister}>
              <input
                type="email"
                placeholder="Email"
                className="block w-full mb-4 p-2 border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="block w-full mb-4 p-2 border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Register
              </button>
            </form>
        </div>
      </section>
  )
}
