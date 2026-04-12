'use client'

import { useState } from 'react'
import { Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { ContextualAIChat } from '@/components/sections/ContextualAIChat'

export default function KontakPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSent(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="section-pad pt-24">
      <div className="container-ydg">

        {/* Page label + heading */}
        <div className="mb-16">
          <p className="section-label mb-4">Kontak</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="section-title">
              Praat Met<br />
              <span className="text-[#0057FF]">Ons Span.</span>
            </h1>
            <p className="text-[#8C8C8C] max-w-sm leading-relaxed">
              Ons is beskikbaar Maandag tot Vrydag. Stuur ons \'n boodskap en
              ons sal binne een besigheidsdag reageer. Ja nee, ons ignoreer
              niemand nie.
            </p>
          </div>
        </div>

        {/* Mini YDG quick assistant */}
        <div className="mb-12">
          <ContextualAIChat
            variant="banner"
            heading="Vinnige vraag? Vra vir Mini YDG eers"
            label="Mini YDG · AI Assistent"
            suggestions={["Hoe werk julle pryse?", "Hoe lank neem \'n website?", "Kan julle my help met SEO?"]}
            placeholder="Vra enigiets oor ons dienste..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: Contact info */}
          <div>
            <h2 className="font-grotesk text-xl font-700 mb-8">Of kontak ons direk</h2>

            <div className="space-y-0 border border-[#E2E2E2]">

              {/* Email */}
              <div className="flex items-start gap-4 p-6 border-b border-[#E2E2E2] hover:bg-[#F4F4F4] transition-colors group">
                <div className="w-10 h-10 border border-[#E2E2E2] group-hover:border-[#0057FF] flex items-center justify-center shrink-0 transition-colors">
                  <Mail size={16} className="text-[#0057FF]" />
                </div>
                <div>
                  <p className="text-xs font-700 uppercase tracking-[0.15em] text-[#8C8C8C] mb-1">E-pos</p>
                  <a
                    href="mailto:hallo@yourdigitalguy.co.za"
                    className="text-sm font-600 hover:text-[#0057FF] transition-colors"
                  >
                    hallo@yourdigitalguy.co.za
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 p-6 border-b border-[#E2E2E2] hover:bg-[#F4F4F4] transition-colors group">
                <div className="w-10 h-10 border border-[#E2E2E2] group-hover:border-[#0057FF] flex items-center justify-center shrink-0 transition-colors">
                  <MessageCircle size={16} className="text-[#0057FF]" />
                </div>
                <div>
                  <p className="text-xs font-700 uppercase tracking-[0.15em] text-[#8C8C8C] mb-1">WhatsApp</p>
                  <a
                    href="https://wa.me/27678131033"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-600 hover:text-[#0057FF] transition-colors"
                  >
                    +27 67 813 1033
                  </a>
                  <p className="text-xs text-[#8C8C8C] mt-0.5">Vinnigste respons — ons is lekker op WhatsApp</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-6 border-b border-[#E2E2E2] hover:bg-[#F4F4F4] transition-colors group">
                <div className="w-10 h-10 border border-[#E2E2E2] group-hover:border-[#0057FF] flex items-center justify-center shrink-0 transition-colors">
                  <MapPin size={16} className="text-[#0057FF]" />
                </div>
                <div>
                  <p className="text-xs font-700 uppercase tracking-[0.15em] text-[#8C8C8C] mb-1">Ligging</p>
                  <p className="text-sm font-600">Kaapstad, Suid-Afrika</p>
                  <p className="text-xs text-[#8C8C8C] mt-0.5">Bedien klante regoor SA en verder</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-6 hover:bg-[#F4F4F4] transition-colors group">
                <div className="w-10 h-10 border border-[#E2E2E2] group-hover:border-[#0057FF] flex items-center justify-center shrink-0 transition-colors">
                  <Clock size={16} className="text-[#0057FF]" />
                </div>
                <div>
                  <p className="text-xs font-700 uppercase tracking-[0.15em] text-[#8C8C8C] mb-1">Kantoorure</p>
                  <p className="text-sm font-600">Ma–Vr: 08:00–17:00</p>
                  <p className="text-xs text-[#8C8C8C] mt-0.5">Naweek: Noodgevalle slegs</p>
                </div>
              </div>

            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/27678131033"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-3 border border-[#E2E2E2] p-4 hover:border-[#0057FF] hover:bg-[#E8F0FF] transition-colors group"
            >
              <div className="w-10 h-10 bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-700">WhatsApp Ons Direk</p>
                <p className="text-xs text-[#8C8C8C]">Gewoonlik binne \'n uur — week dae</p>
              </div>
              <span className="text-xs text-[#0057FF] font-600 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Right: Contact Form */}
          <div className="border border-[#E2E2E2]">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-16 px-8">
                <div className="w-16 h-16 bg-[#E8F0FF] flex items-center justify-center mb-6">
                  <Mail size={24} className="text-[#0057FF]" />
                </div>
                <h2 className="font-grotesk font-700 text-2xl mb-3">Boodskap Gestuur!</h2>
                <p className="text-[#8C8C8C] text-sm">
                  Lekker — ons sal jou binne een besigheidsdag kontak.
                  Kyk jou inbox, en die spamboks net voor die geval.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-xs text-[#0057FF] hover:underline"
                >
                  Stuur nog \'n boodskap
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div className="mb-6">
                  <p className="text-xs font-700 uppercase tracking-[0.15em] text-[#8C8C8C] mb-1">Kontakvorm</p>
                  <h2 className="font-grotesk font-700 text-xl">Stuur \'n Boodskap</h2>
                </div>

                <div>
                  <label className="block text-xs font-700 uppercase tracking-[0.1em] text-[#8C8C8C] mb-2">Jou Naam</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="ydg-input w-full"
                    placeholder="Jan van der Merwe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-700 uppercase tracking-[0.1em] text-[#8C8C8C] mb-2">E-posadres</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="ydg-input w-full"
                    placeholder="jan@besigheid.co.za"
                  />
                </div>

                <div>
                  <label className="block text-xs font-700 uppercase tracking-[0.1em] text-[#8C8C8C] mb-2">Telefoonnommer <span className="font-400 normal-case tracking-normal">(opsioneel)</span></label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="ydg-input w-full"
                    placeholder="082 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-700 uppercase tracking-[0.1em] text-[#8C8C8C] mb-2">Boodskap</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="ydg-input w-full h-28 resize-none"
                    placeholder="Hoe kan ons jou help?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full py-4 disabled:opacity-60"
                >
                  {submitting ? 'Besig om te stuur...' : 'Stuur Boodskap'}
                </button>

                <p className="text-xs text-[#8C8C8C] text-center">
                  Of stuur WhatsApp na{' '}
                  <a href="https://wa.me/27678131033" className="text-[#0057FF] hover:underline">
                    +27 67 813 1033
                  </a>
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  )
                                            }
