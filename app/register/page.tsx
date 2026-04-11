'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Wagwoorde stem nie ooreen nie.')
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    })

    if (res.ok) {
      router.push('/login?registered=1')
    } else {
      const data = await res.json()
      setError(data.error || 'Registrasie het misluk.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center section-pad">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="font-grotesk font-700 text-3xl tracking-tight">YDG</span>
          </Link>
          <p className="text-[#8C8C8C] mt-2">Skep jou kliënteportaal-rekening</p>
        </div>

        <div className="border border-[#E2E2E2] p-8">
          <h1 className="font-grotesk font-600 text-xl mb-6">Registreer</h1>

          {error && (
            <div className="border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-500 mb-2">Volle Naam</label>
              <input
                required
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="ydg-input w-full"
                placeholder="Jan van der Merwe"
              />
            </div>
            <div>
              <label className="block text-sm font-500 mb-2">E-posadres</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="ydg-input w-full"
                placeholder="jan@besigheid.co.za"
              />
            </div>
            <div>
              <label className="block text-sm font-500 mb-2">Wagwoord</label>
              <input
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                className="ydg-input w-full"
                placeholder="Min. 8 karakters"
              />
            </div>
            <div>
              <label className="block text-sm font-500 mb-2">Bevestig Wagwoord</label>
              <input
                type="password"
                required
                value={form.confirm}
                onChange={e => setForm({...form, confirm: e.target.value})}
                className="ydg-input w-full"
                placeholder="Herhaal wagwoord"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-4 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Registreer...</> : 'Registreer'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#8C8C8C] mt-6">
          Het jy reeds 'n rekening?{' '}
          <Link href="/login" className="text-[#0057FF] hover:underline">Teken in</Link>
        </p>
      </div>
    </main>
  )
}
