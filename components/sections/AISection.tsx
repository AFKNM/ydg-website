'use client'

import { Bot, Zap, CheckCircle2 } from 'lucide-react'

export function AISection() {
  return (
    <section className="section-pad bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#E2E2E2 1px, transparent 1px), linear-gradient(90deg, #E2E2E2 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-ydg relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Bot size={16} className="text-[#0057FF]" />
              <span className="section-label">AI Adviseur</span>
            </div>
            <h2 className="section-title text-white mb-6">
              Chat Met Ons AI —<br />
              Kry Dadelik die<br />
              <span className="text-[#0057FF]">Regte Oplossing.</span>
            </h2>
            <p className="text-[#666] leading-relaxed mb-8">
              Ons AI-adviseur gebruik drie modelle saam om presies te verstaan
              wat jou besigheid nodig het. Jy kry 'n persoonlike aanbeveling,
              'n kwotasie, en 'n konsultasie-besprekings — alles in Afrikaans.
            </p>

            <div className="space-y-3">
              {[
                'Afrikaans én Engels ondersteun',
                'Drie AI-modelle kontroleer mekaar',
                'Outomaatiese kwotasie-generering',
                'Konsultasie-besprekings direk in die chat',
              ].map(point => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-[#0057FF] shrink-0" />
                  <span className="text-sm text-[#999]">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chat Preview */}
          <div className="border border-[#1A1A1A] bg-[#111]">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1A1A1A]">
              <div className="w-2 h-2 rounded-full bg-[#0057FF] animate-pulse" />
              <span className="font-grotesk text-sm font-600">YDG AI Adviseur</span>
              <span className="ml-auto text-[10px] text-[#444] border border-[#222] px-2 py-0.5">AF</span>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3">
              <div className="max-w-[80%] bg-[#1A1A1A] border-l-2 border-[#0057FF] px-3 py-2.5 text-sm text-[#ccc] leading-relaxed">
                Hallo! 👋 Vertel my: wat is jou grootste digitale uitdaging?
              </div>
              <div className="max-w-[80%] ml-auto bg-[#0057FF] px-3 py-2.5 text-sm text-white">
                Ek kry nie genoeg kliënte via Google nie.
              </div>
              <div className="max-w-[85%] bg-[#1A1A1A] border-l-2 border-[#0057FF] px-3 py-2.5 text-sm text-[#ccc] leading-relaxed">
                Verstaan! Jy het twee opsies: <strong className="text-white">Google Ads</strong> vir onmiddellike resultate, of <strong className="text-white">SEO</strong> vir langtermyn-groei. Wil jy hê ek stel 'n kwotasie op vir albei?
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-[#1A1A1A] p-3 flex gap-2">
              <input
                readOnly
                value="Ja, asseblief — beide opsies..."
                className="flex-1 bg-[#0A0A0A] border border-[#1A1A1A] px-3 py-2 text-sm text-[#666] outline-none"
              />
              <button className="bg-[#0057FF] px-3 py-2">
                <Zap size={14} className="text-white" />
              </button>
            </div>

            {/* Model indicator */}
            <div className="px-4 py-2 border-t border-[#0D0D0D] flex items-center gap-1.5">
              <Bot size={10} className="text-[#333]" />
              <span className="text-[10px] text-[#333] uppercase tracking-wider">Claude · GPT-4o · Gemini</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
