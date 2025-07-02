'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError(res.error)
    } else {
      router.push('/dashboard')
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
              <main className="p-6 max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="border p-2 rounded"
                  />
                  {error && <p className="text-red-500">{error}</p>}
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Login
                  </button>
                </form>
              </main>
            </div>
      </section>

  )
}
