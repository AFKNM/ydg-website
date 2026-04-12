'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ContextualAIChat } from './ContextualAIChat'

const services = [
  { id: '01', icon: '↗', title: 'Google Ads & PPC', subtitle: 'Betaal vir resultate, nie klikke.', description: "Data-gedrewe advertensieveldtogte wat jou besigheid voor mense plaas wat aktief soek. Elke sent verantwoord.", features: ['Sleutelwoordnavorsing', 'A/B-toetsing', 'Omskakelingsopsporing', 'Maandelikse verslae'], href: '/dienste/google-ads' },
  { id: '02', icon: '◎', title: 'SEO Optimisering', subtitle: 'Rang hoër, kry meer klante.', description: 'Organiese soekgroei wat oor tyd saamgroei. Tegniese SEO, inhoudstrategie, en skakelbou — gesorteer.', features: ['Tegniese oudit', 'On-page SEO', 'Inhoudstrategie', 'Plaaslike SEO'], href: '/dienste/seo' },
  { id: '03', icon: '⬡', title: 'META Advertensies', subtitle: 'Stories wat connect.', description: 'Instagram, Facebook & LinkedIn advertensies wat mense bereik op die regte tyd, met die regte boodskap.', features: ['Gehoor-segmentering', 'Kreatiewe ontwerp', 'Retargeting', 'Pixel-opstelling'], href: '/dienste/meta-ads' },
  { id: '04', icon: '⬝', title: 'Webontwikkeling', subtitle: 'Van idee tot live site.', description: 'Pasgemaakte Next.js webwerwe wat vinnig laai, goed rangeer, en besoekers in klante omskakel.', features: ['Pasgemaakte ontwerp', 'Mobiel-eerste', 'SEO-gereed', 'Vinnige lewering'], href: '/dienste/webontwikkeling' },
  { id: '05', icon: '◈', title: 'AI Oplossings', subtitle: 'Slimmer werk, elke dag.', description: 'Pasgemaakte chatbots, geoutomatiseerde werkvloeie, en AI-integrasies wat jou span ure elke week bespaar.', features: ['Pasgemaakte chatbots', 'Werkstroom-outomatisering', 'API-integrasies', 'Multi-model AI'], href: '/dienste/ai-oplossings' },
  { id: '06', icon: '▦', title: 'BI Verslagdoening', subtitle: 'Data wat sin maak.', description: 'Live-dashboards en besigheidsinsig-panele wat jou help om beter besluite vinniger te neem.', features: ['Live dashboards', 'Google Looker', 'Power BI', 'Pasgemaakte metriese'], href: '/dienste/bi-verslagdoening' },
  { id: '07', icon: '⊞', title: 'Google My Business', subtitle: 'Plaaslike soeke, echte klante.', description: 'Optimaliseer jou GMB-profiel sodat plaaslike klante jou vind — nie jou mededinger nie.', features: ['Profiel-optimalisering', 'Resensie-bestuur', 'Foto-bestuur', 'Insig-analise'], href: '/dienste/google-my-business' },
  { id: '08', icon: '◫', title: 'Grafiese Ontwerp', subtitle: 'Visuele identiteit wat bly.', description: 'Handelsmerk, logo-ontwerp, en drukwerk — jou besigheid lyk professioneel van die begin af.', features: ['Logo-ontwerp', 'Handelsmerk-identiteit', 'Sosiale media-grafika', 'Drukontwerp'], href: '/dienste/grafiese-ontwerp' },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.service-card')
    if (!cards) return
    const observer = new IntersectionObserver(
      entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('service-visible'); observer.unobserve(entry.target) } }) },
      { threshold: 0.1 }
    )
    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="section-pad border-t border-[#E2E2E2]" ref={sectionRef}>
      <div className="container-ydg">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <p className="section-label mb-4">Ons Dienste</p>
            <h2 className="section-title">Alles wat jy<br />nodig het om<br /><span className="text-[#0057FF]">aanlyn te wen.</span></h2>
          </div>
          <div className="max-w-xs">
            <p className="text-[#8C8C8C] text-sm leading-relaxed">Agt dienste. Een span. Geen langtermyn kontrak nodig. Kies wat jy nou nodig het — skaleer wanneer jy gereed is.</p>
            <Link href="/dienste" className="inline-flex items-center gap-2 text-sm text-[#0057FF] font-600 mt-4 hover:gap-3 transition-all">Sien alle dienste →</Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#E2E2E2]">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              className={`service-card relative border-[#E2E2E2] p-6 group cursor-pointer opacity-0 translate-y-4 ${i % 4 !== 3 ? 'lg:border-r' : ''} ${i % 2 === 0 ? 'md:border-r' : ''} ${i < 4 ? 'border-b' : ''} ${i < 6 ? 'md:border-b' : ''}`}
              style={{ transitionProperty: 'opacity, transform', transitionDuration: `${300 + i * 60}ms` }}
              onMouseEnter={() => setHoveredId(svc.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-[#0057FF] transition-transform duration-300 origin-left ${hoveredId === svc.id ? 'scale-x-100' : 'scale-x-0'}`} />
              <span className="text-xs font-700 text-[#0057FF] tracking-[0.2em] block mb-4">{svc.id}</span>
              <div className="font-grotesk text-3xl text-[#E2E2E2] group-hover:text-[#0057FF] transition-colors duration-200 mb-4 leading-none">{svc.icon}</div>
              <h3 className="font-grotesk text-base font-700 mb-1 group-hover:text-[#0057FF] transition-colors">{svc.title}</h3>
              <p className="text-xs text-[#8C8C8C] italic mb-3">{svc.subtitle}</p>
              <div className="h-px bg-[#E2E2E2] mb-3" />
              <div className={`overflow-hidden transition-all duration-300 ${hoveredId === svc.id ? 'max-h-48' : 'max-h-0'}`}>
                <p className="text-xs text-[#8C8C8C] leading-relaxed mb-3">{svc.description}</p>
                <ul className="space-y-1 mb-3">{svc.features.map(f => (<li key={f} className="flex items-center gap-2 text-xs text-[#8C8C8C]"><div className="w-1 h-1 rounded-full bg-[#0057FF] shrink-0" />{f}</li>))}</ul>
              </div>
              <Link href={svc.href} className="inline-flex items-center gap-1.5 text-xs text-[#0057FF] font-600 hover:gap-2.5 transition-all mt-2">Meer inligting →</Link>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <ContextualAIChat variant="banner" heading="Nie seker watter diens jy nodig het nie?" label="Mini YDG · AI Assistent" suggestions={['Watter diens pas vir my?', 'Hoeveel kos Google Ads?', 'Verduidelik AI Oplossings']} />
        </div>
      </div>
      <style>{`.service-visible { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </section>
  )
}

export default ServicesSection
