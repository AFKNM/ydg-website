import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="section-pad border-t border-[#E2E2E2]">
      <div className="container-ydg">
        <div className="border border-[#E2E2E2] p-12 md:p-20 relative overflow-hidden">
          {/* Grid bg */}
          <div className="absolute inset-0 ydg-grid-bg opacity-30" />

          {/* SVG accent */}
          <svg className="absolute top-8 right-8 opacity-20" width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="59" fill="none" stroke="#0057FF" strokeWidth="1" />
            <line x1="60" y1="0" x2="60" y2="120" stroke="#0057FF" strokeWidth="0.5" />
            <line x1="0" y1="60" x2="120" y2="60" stroke="#0057FF" strokeWidth="0.5" />
            <circle cx="60" cy="60" r="4" fill="#0057FF" />
          </svg>

          <div className="relative z-10 max-w-2xl">
            <p className="section-label mb-4">Klaar om te Begin?</p>
            <h2 className="section-title mb-6">
              Laat Ons Jou<br />
              Besigheid<br />
              <span className="text-[#0057FF]">Digitaal Maak.</span>
            </h2>
            <p className="text-[#8C8C8C] text-lg leading-relaxed mb-10 max-w-lg">
              Kry 'n gratis kwotasie binne 24 uur. Geen verbintenis nie — net 'n
              eerlike gesprek oor wat jou besigheid werklik nodig het.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/kwotasie" className="btn btn-primary px-8 py-4">
                Kry Gratis Kwotasie
                <ArrowRight size={16} />
              </Link>
              <Link href="/kontak" className="btn btn-outline px-8 py-4">
                Kontak Ons
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
