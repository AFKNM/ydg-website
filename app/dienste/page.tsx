import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dienste | Your Digital Guy',
  description: 'Volledige digitale dienste: Google Ads, SEO, META, WhatsApp, BI, API, AI, webontwikkeling en meer.',
}

const services = [
  {
    category: 'Digitale Bemarking',
    items: [
      { name: 'Google Ads', desc: 'Betaalde soekadvertensies wat onmiddellike resultate lewer. Ons bestuur jou begroting strategies om die beste opbrengs te verseker.', price: 'Vanaf R1,500/mnd' },
      { name: 'SEO Optimisering', desc: 'Langtermyn organiese groei. Ons optimiseer jou webwerf sodat Google jou eerste wys vir die regte soekterme.', price: 'Vanaf R2,500/mnd' },
      { name: 'Google My Business', desc: 'Bestuur jou plaaslike teenwoordigheid op Google Maps en soekresultate. Meer oproepe, meer besoeke.', price: 'Vanaf R800/mnd' },
      { name: 'META Advertensies', desc: 'Facebook en Instagram advertensies wat jou teikenmark presies bereik. Stories, Reels, Feed en meer.', price: 'Vanaf R1,500/mnd' },
    ]
  },
  {
    category: 'Tegnologie & Outomatisering',
    items: [
      { name: 'WhatsApp Oplossings', desc: 'WhatsApp Business API integrasie, chatbots, outomatiese boodskappe en kliënt-kommunikasie-stelsels.', price: 'Vanaf R3,500' },
      { name: 'BI Verslagdoening', desc: 'Dashboards en data-analise wat jou besigheid se prestasie meetbaar en verstaanbaar maak.', price: 'Vanaf R5,000' },
      { name: 'API Integrasie', desc: 'Verbind jou stelsels. Van CRM tot rekeningkunde — ons bou die brûe wat jou besigheid outomatiseer.', price: 'Kwotasie' },
      { name: 'AI Oplossings', desc: 'Pasgemaakte AI-werktuie vir jou besigheid: chatbots, inhoudskepping, data-verwerking en prosesoutomatisering.', price: 'Kwotasie' },
    ]
  },
  {
    category: 'Webontwikkeling',
    items: [
      { name: 'Webontwikkeling', desc: 'Professionele, vinnige webwerwe gebou met moderne tegnologie. Mobiel-eerste, SEO-geoptimiseer.', price: 'Vanaf R8,000' },
      { name: 'Web Applikasies', desc: 'Pasgemaakte webapps vir jou besigheid — portale, bestuursplatforms, e-handel en meer.', price: 'Kwotasie' },
      { name: 'Grafiese Ontwerp', desc: 'Logo\'s, sosiale media grafieka, verkoopsmateriale en alles wat jou handelsmerk professioneel laat lyk.', price: 'Vanaf R800' },
      { name: 'Handelsmerk & Branding', desc: 'Volledige handelsmerkpakkette: logo, kleurpalet, lettertype, stylgids en handelsmerkstrategie.', price: 'Vanaf R3,500' },
    ]
  }
]

export default function DienstePage() {
  return (
    <main className="section-pad">
      <div className="container-ydg">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="section-label mb-4">Ons Dienste</p>
          <h1 className="section-title mb-4">
            Alles Wat Jou Besigheid<br />
            <span className="text-[#0057FF]">Digitaal Nodig Het.</span>
          </h1>
          <p className="text-[#8C8C8C] text-lg">
            Van bemarking tot tegnologie — ons dek elke aspek van jou digitale teenwoordigheid.
          </p>
        </div>

        {/* Service categories */}
        <div className="space-y-16">
          {services.map(cat => (
            <div key={cat.category}>
              <h2 className="font-grotesk font-600 text-xl mb-8 pb-4 border-b border-[#E2E2E2]">
                {cat.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.items.map(item => (
                  <div key={item.name} className="ydg-card group">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-grotesk font-600 text-lg">{item.name}</h3>
                      <span className="text-xs text-[#0057FF] border border-[#0057FF]/30 px-2 py-1 shrink-0 ml-4">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-[#8C8C8C] text-sm leading-relaxed mb-6">{item.desc}</p>
                    <Link
                      href={`/kwotasie?diens=${encodeURIComponent(item.name)}`}
                      className="flex items-center gap-2 text-sm text-[#0057FF] font-500 group-hover:gap-3 transition-all"
                    >
                      Kry Kwotasie <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 border border-[#E2E2E2] p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 ydg-grid-bg opacity-30" />
          <div className="relative z-10">
            <h2 className="font-grotesk font-700 text-3xl mb-4">
              Nie Seker Watter Diens Jy Nodig Het Nie?
            </h2>
            <p className="text-[#8C8C8C] mb-8 max-w-lg mx-auto">
              Praat met ons AI-adviseur of kontak ons direk — ons sal jou help om
              die regte strategie vir jou besigheid te kies.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/kwotasie" className="btn btn-primary px-8 py-4">
                Kry Gratis Kwotasie <ArrowRight size={16} />
              </Link>
              <Link href="/kontak" className="btn btn-outline px-8 py-4">
                Kontak Ons
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
