'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

export function HeroSection() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const lines = svgRef.current?.querySelectorAll('.draw-line')
    lines?.forEach((line, i) => {
      const el = line as SVGLineElement | SVGPathElement
      const length = (el as SVGPathElement).getTotalLength?.() ?? 400
      el.style.strokeDasharray  = `${length}`
      el.style.strokeDashoffset = `${length}`
      el.style.animation = `lineDraw 1.6s ease ${i * 0.15}s forwards`
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">

      {/* Architectural Grid Background */}
      <div
        className="absolute inset-0 ydg-grid-bg opacity-40"
        aria-hidden="true"
      />

      {/* SVG Architectural Decoration */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cross-hair top-right */}
        <line className="draw-line" x1="75%" y1="15%" x2="75%" y2="25%" stroke="#0057FF" strokeWidth="1" opacity="0.6" />
        <line className="draw-line" x1="70%" y1="20%" x2="80%" y2="20%" stroke="#0057FF" strokeWidth="1" opacity="0.6" />
        <circle cx="75%" cy="20%" r="3" fill="#0057FF" opacity="0" style={{ animation: 'fadeIn 0.3s ease 1.2s forwards' }} />

        {/* Corner bracket top-left */}
        <path className="draw-line" d="M 80 120 L 80 80 L 120 80" fill="none" stroke="#E2E2E2" strokeWidth="1" />

        {/* Horizontal accent line */}
        <line className="draw-line" x1="5%" y1="85%" x2="35%" y2="85%" stroke="#E2E2E2" strokeWidth="1" />
        <circle cx="5%" cy="85%" r="3" fill="#0057FF" opacity="0" style={{ animation: 'fadeIn 0.3s ease 1.5s forwards' }} />

        {/* Right-side vertical */}
        <line className="draw-line" x1="88%" y1="30%" x2="88%" y2="70%" stroke="#E2E2E2" strokeWidth="1" />

        {/* Measurement ticks */}
        <line className="draw-line" x1="87.5%" y1="30%" x2="88.5%" y2="30%" stroke="#E2E2E2" strokeWidth="1" />
        <line className="draw-line" x1="87.5%" y1="50%" x2="88.5%" y2="50%" stroke="#0057FF" strokeWidth="1" opacity="0.5" />
        <line className="draw-line" x1="87.5%" y1="70%" x2="88.5%" y2="70%" stroke="#E2E2E2" strokeWidth="1" />

        {/* Bottom-right bracket */}
        <path className="draw-line" d="M 92% 78% L 95% 78% L 95% 88%" fill="none" stroke="#E2E2E2" strokeWidth="1" />
      </svg>

      {/* Content */}
      <div className="container-ydg relative z-10 py-20">
        <div className="max-w-4xl">

          {/* Label */}
          <div
            className="flex items-center gap-3 mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center gap-1.5 border border-[#0057FF] bg-[#E8F0FF] px-3 py-1.5">
              <Zap size={11} className="text-[#0057FF]" />
              <span className="section-label text-[#0057FF]">AI-Aangedrewe Digitale Dienste</span>
            </div>
            <div className="h-px flex-1 max-w-24 bg-[#E2E2E2]" />
          </div>

          {/* Heading */}
          <h1
            className="font-grotesk text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.05em] mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Jou Digitale<br />
            <span className="text-[#0057FF]">Toekoms</span><br />
            Begins Hier.
          </h1>

          {/* Subtitle */}
          <p
            className="text-[#8C8C8C] text-lg leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.35s' }}
          >
            Van Google Ads tot AI-oplossings — YDG help Afrikaanse sakeondernemings
            groei in die digitale era. Professioneel, meetbaar, en op maat gemaak vir jou.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-16 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.45s' }}
          >
            <Link href="/kwotasie" className="btn btn-primary px-6 py-3.5 text-sm">
              Kry 'n Gratis Kwotasie
              <ArrowRight size={15} />
            </Link>
            <Link href="/dienste" className="btn btn-outline px-6 py-3.5 text-sm">
              Verken Dienste
            </Link>
          </div>

          {/* Stats Row */}
          <div
            className="flex flex-wrap gap-8 border-t border-[#E2E2E2] pt-8 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.55s' }}
          >
            {[
              { value: '3',   unit: 'AI Modelle',       label: 'Claude · GPT-4o · Gemini' },
              { value: '10+', unit: 'Digitale Dienste',  label: 'Alles onder een dak' },
              { value: '24h', unit: 'Reaksietyd',        label: 'Vinnige kliëntediens' },
            ].map(stat => (
              <div key={stat.value} className="flex items-start gap-3">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-grotesk text-3xl font-700 tracking-tighter">{stat.value}</span>
                    <span className="text-xs font-bold text-[#0057FF] uppercase tracking-wider">{stat.unit}</span>
                  </div>
                  <p className="text-xs text-[#8C8C8C] mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* YDG monogram — large background */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-grotesk font-bold text-[22vw] leading-none tracking-[-0.07em] select-none pointer-events-none opacity-[0.025]"
        style={{ color: '#0A0A0A' }}
        aria-hidden="true"
      >
        YDG
      </div>
    </section>
  )
}
