'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/admin/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Invalid authorization token.')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans antialiased text-white px-4">
      <div className="max-w-sm w-full border border-neutral-800 p-8 bg-neutral-950">
        <h1 className="text-xs uppercase tracking-widest text-neutral-400 mb-6 font-light">
          System Core Access
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs tracking-widest text-white focus:outline-none focus:border-neutral-500 rounded-none placeholder-neutral-600"
          />
          {error && <p className="text-xs text-red-500 font-light tracking-wide">{error}</p>}
          
          <button className="w-full bg-white text-black py-3 text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors rounded-none">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  )
}
