'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { ContextualAIChat } from '@/components/sections/ContextualAIChat'

const services = [
  'Google Ads',
  'SEO Optimisering',
  'Google My Business',
  'META Advertensies',
  'WhatsApp Oplossings',
  'BI Verslagdoening',
  'API Integrasie',
  'AI Oplossings',
  'Webontwikkeling',
  'Web Applikasies',
  'Grafiese Ontwerp',
  'Handelsmerk & Branding',
]

const schema = z.object({
  name: z.string().min(2, 'Naam is verplig'),
  email: z.string().email('Ongeldige e-posadres'),
  phone: z.string().min(10, 'Telefoonnommer is verplig'),
  business: z.string().min(2, 'Besigheidsnaam is verplig'),
  services: z.array(z.string()).min(1, 'Kies ten minste een diens'),
  budget: z.string().min(1, 'Begroting is verplig'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function KwotasiePage() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [] },
  })

  const toggleService = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter(s => s !== service)
      : [...selectedServices, service]
    setSelectedServices(updated)
    setValue('services', updated)
  }

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/v1/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      console.error('Quote submission failed')
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center section-pad">
        <div className="text-center max-w-md">
          <CheckCircle2 size={48} className="text-[#0057FF] mx-auto mb-6" />
          <h1 className="text-3xl font-grotesk font-700 mb-4">Kwotasie Ontvang!</h1>
          <p className="text-[#8C8C8C] mb-8">
            Ons sal jou kwotasie binne 24 uur per e-pos stuur.
            Kyk gerus na jou spamboks as jy dit nie ontvang nie.
          </p>
          <a href="/" className="btn btn-primary px-8 py-4">
            Terug na Tuis
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="section-pad">
      <div className="container-ydg max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <p className="section-label mb-4">Gratis Kwotasie</p>
          <h1 className="text-4xl md:text-5xl font-grotesk font-700 leading-tight mb-4">
            Kry Jou Persoonlike<br />
            <span className="text-[#0057FF]">Kwotasie Vandag.</span>
          </h1>
          <p className="text-[#8C8C8C] text-lg">
            Geen verbintenis nie — net ‘n eerlike gesprek oor wat jy nodig het.
          </p>
        </div>

        {/* Mini YDG helper before form */}
        <div className="mb-8">
          <ContextualAIChat
            variant="banner"
            heading="Nie seker wat om te kies nie? Vra vir Mini YDG"
            label="Mini YDG · Jou Kwotasie-Assistent"
            suggestions={["Wat beveel jy aan vir ‘n nuwe besigheid?", "Wat kos ‘n website?", "Verduidelik Google Ads vs SEO"]}
            placeholder="Vra oor enige diens of begroting..."
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Contact Info */}
          <div className="border border-[#E2E2E2] p-8">
            <h2 className="font-grotesk font-600 text-lg mb-6">Jou Besonderhede</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-500 mb-2">Naam</label>
                <input {...register('name')} className="ydg-input w-full" placeholder="Jan van der Merwe" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-500 mb-2">E-posadres</label>
                <input {...register('email')} className="ydg-input w-full" placeholder="jan@besigheid.co.za" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-500 mb-2">Telefoonnommer</label>
                <input {...register('phone')} className="ydg-input w-full" placeholder="082 000 0000" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-500 mb-2">Besigheidsnaam</label>
                <input {...register('business')} className="ydg-input w-full" placeholder="Jou Besigheid" />
                {errors.business && <p className="text-red-500 text-xs mt-1">{errors.business.message}</p>}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="border border-[#E2E2E2] p-8">
            <h2 className="font-grotesk font-600 text-lg mb-2">Watter Dienste Benodig Jy?</h2>
            <p className="text-[#8C8C8C] text-sm mb-6">Kies alles wat van toepassing is.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {services.map(service => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`border px-4 py-3 text-sm text-left transition-all ${
                    selectedServices.includes(service)
                      ? 'border-[#0057FF] bg-[#0057FF]/5 text-[#0057FF]'
                      : 'border-[#E2E2E2] text-[#0A0A0A] hover:border-[#0057FF]'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
            {errors.services && <p className="text-red-500 text-xs mt-2">{errors.services.message}</p>}
          </div>

          {/* Budget */}
          <div className="border border-[#E2E2E2] p-8">
            <h2 className="font-grotesk font-600 text-lg mb-6">Maandelikse Begroting</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['R1k–R3k', 'R3k–R7k', 'R7k–R15k', 'R15k+'].map(b => (
                <label key={b} className="cursor-pointer">
                  <input {...register('budget')} type="radio" value={b} className="sr-only" />
                  <span className={`block border px-4 py-3 text-sm text-center transition-all border-[#E2E2E2] hover:border-[#0057FF]`}>
                    {b}
                  </span>
                </label>
              ))}
            </div>
            {errors.budget && <p className="text-red-500 text-xs mt-2">{errors.budget.message}</p>}
          </div>

          {/* Message */}
          <div className="border border-[#E2E2E2] p-8">
            <h2 className="font-grotesk font-600 text-lg mb-6">Ekstra Inligting (opsioneel)</h2>
            <textarea
              {...register('message')}
              className="ydg-input w-full h-32 resize-none"
              placeholder="Vertel ons meer oor jou besigheid en doelwitte..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full py-5 text-base flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <><Loader2 size={16} className="animate-spin" /> Versend...</>
            ) : (
              <>Stuur Kwotasie-Versoek <ArrowRight size={16} /></>
            )}
          </button>
        </form>
      </div>
    </main>
  )
            }
