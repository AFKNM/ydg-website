'use client'

import { useEffect, useRef } from 'react'

const pillars = [
  {
    num: '01',
    title: 'Drie AI-Modelle',
    subtitle: "Slimmer, vinniger, meer akkuraat.",
    body: 'Claude, GPT-4o, en Gemini Pro werk saam — hulle kontroleer mekaar se werk vir die beste kwaliteit. Jy kry altyd die beste antwoord, nie net die eerste een nie.',
    accent: 'Konsensus-telling: 94%',
  },
  {
    num: '02',
    title: 'Live Projek-Portaal',
    subtitle: 'Jy sien presies waar jou projek is.',
    body: 'Kanban-bord, mylpale, regstreekse boodskappe — geen raaiskote nie. Jy is altyd in beheer van wat aangaan.',
    accent: 'Kanban · Milestone · Chat',
  },
  {
    num: '03',
    title: 'Slim SEO-Paneel',
    subtitle: 'Beheer jou digitale voetspoor.',
    body: "Meta-tags, sitekaarte, omleidings — alles met AI-hulp, sonder 'n ontwikkelaar. Jy ry, ons gee die GPS.",
    accent: 'Real-time · AI-aangedrewe',
  },
  {
    num: '04',
    title: 'Lokale Kennis',
    subtitle: 'Ons verstaan SA besigheid, sersies.',
    body: "Cape Town-gebaseer. YOCO-betalings. ZAR pryse. Ons praat jou taal — in meer as een sin van die woord.",
    accent: 'YOCO · ZAR · Afrikaans',
  },
]

export function WhyYDGSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.pillar-card')
    if (!cards) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('pillar-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-pad border-t border-[#E2E2E2]" ref={sectionRef}>
      <div className="container-ydg">

        {/* Section label + heading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <p className="section-label mb-4">Hoekom YDG?</p>
            <h2 className="section-title">
              Meer as net<br />
              'n Digitale<br />
              <span className="text-[#0057FF]">Agentskap.</span>
            </h2>
          </div>
          <div>
            <p className="text-[#8C8C8C] leading-relaxed max-w-sm">
              Ons is jou langtermyn digitale vennoot. Elke besluit word
              deur data gedryf, elke resultaat gemeet. Lekker saamwerk.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="h-px bg-[#0057FF] w-8" />
              <span className="text-xs font-700 uppercase tracking-[0.2em] text-[#0057FF]">Cape Town · SA</span>
            </div>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#E2E2E2]">
          {pillars.map((p, i) => (
            <div
              key={p.num}
              className={`pillar-card border-[#E2E2E2] p-8 group hover:bg-[#F4F4F4] transition-colors duration-200 opacity-0 translate-y-4
                ${i % 2 === 0 ? 'md:border-r' : ''}
                ${i < 2 ? 'border-b' : ''}
              `}
              style={{ transitionProperty: 'opacity, transform, background-color', transitionDuration: `${300 + i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-grotesk text-xs font-700 text-[#0057FF] tracking-[0.2em]">{p.num}</span>
                <div className="h-px flex-1 bg-[#E2E2E2] group-hover:bg-[#0057FF] transition-colors duration-300" />
              </div>
              <h3 className="font-grotesk text-xl font-700 mb-1">{p.title}</h3>
              <p className="text-xs text-[#0057FF] font-600 italic mb-4">{p.subtitle}</p>
              <p className="text-[#8C8C8C] text-sm leading-relaxed mb-6">{p.body}</p>
              <div className="inline-flex items-center gap-2 border border-[#E2E2E2] bg-white px-3 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0057FF]" />
                <span className="text-xs text-[#8C8C8C] font-600">{p.accent}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#E2E2E2] p-6 bg-[#0A0A0A]">
          <div>
            <p className="font-grotesk font-700 text-white text-lg">Reg om te begin? Lekker.</p>
            <p className="text-[#555] text-sm mt-1">Geen langtermyn kontrakte. Geen verrassings.</p>
          </div>
          <div className="flex gap-3">
            <a href="/kwotasie" className="btn btn-blue text-sm px-6 py-3">Kry 'n Kwotasie</a>
            <a href="/kontak" className="btn btn-outline-white text-sm px-6 py-3">Kontak Ons</a>
          </div>
        </div>
      </div>
      <style>{`.pillar-visible { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </section>
  )
}

export default WhyYDGSection
