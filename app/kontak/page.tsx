'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function KontakPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/v1/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) setSent(true)
  }

  return (
    <main className="section-pad">
      <div className="container-ydg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="section-label mb-4">Kontak</p>
            <h1 className="section-title mb-6">
              Praat Met<br />
              <span className="text-[#0057FF]">Ons Span.</span>
            </h1>
            <p className="text-[#8C8C8C] text-lg mb-12">
              Ons is beskikbaar Maandag tot Vrydag. Stuur ons 'n boodskap en
              ons sal binne een besigheidsdag reageer.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#E2E2E2] flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[#0057FF]" />
                </div>
                <div>
                  <p className="font-500 mb-1">E-pos</p>
                  <a href="mailto:hallo@yourdigitalguy.co.za" className="text-[#8C8C8C] hover:text-[#0057FF] transition-colors">
                    hallo@yourdigitalguy.co.za
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#E2E2E2] flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-[#0057FF]" />
                </div>
                <div>
                  <p className="font-500 mb-1">WhatsApp / Foon</p>
                  <a href="https://wa.me/27000000000" className="text-[#8C8C8C] hover:text-[#0057FF] transition-colors">
                    +27 00 000 0000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#E2E2E2] flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[#0057FF]" />
                </div>
                <div>
                  <p className="font-500 mb-1">Ligging</p>
                  <p className="text-[#8C8C8C]">Suid-Afrika<br />Bedien kliënte landwyd</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#E2E2E2] flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[#0057FF]" />
                </div>
                <div>
                  <p className="font-500 mb-1">Kantoorure</p>
                  <p className="text-[#8C8C8C]">Ma–Vr: 08:00–17:00<br />Naweek: Noodgevalle slegs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="border border-[#E2E2E2] p-8 md:p-12">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#0057FF]/10 flex items-center justify-center mx-auto mb-6">
                  <Mail size={24} className="text-[#0057FF]" />
                </div>
                <h2 className="font-grotesk font-700 text-2xl mb-3">Boodskap Gestuur!</h2>
                <p className="text-[#8C8C8C]">Ons sal binne een besigheidsdag reageer.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-grotesk font-600 text-xl mb-6">Stuur 'n Boodskap</h2>
                <div>
                  <label className="block text-sm font-500 mb-2">Jou Naam</label>
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
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="ydg-input w-full"
                    placeholder="jan@besigheid.co.za"
                  />
                </div>
                <div>
                  <label className="block text-sm font-500 mb-2">Telefoonnommer (opsioneel)</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    className="ydg-input w-full"
                    placeholder="082 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-500 mb-2">Boodskap</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="ydg-input w-full h-32 resize-none"
                    placeholder="Hoe kan ons jou help?"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full py-4">
                  Stuur Boodskap
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
