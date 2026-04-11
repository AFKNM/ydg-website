export function WhyYDGSection() {
  return (
    <section className="section-pad border-t border-[#E2E2E2]">
      <div className="container-ydg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            <p className="section-label mb-4">Hoekom YDG?</p>
            <h2 className="section-title mb-8">
              Meer as net<br />
              'n Digitale<br />
              <span className="text-[#0057FF]">Agentskap.</span>
            </h2>
            <p className="text-[#8C8C8C] leading-relaxed mb-8 max-w-md">
              Ons is jou langtermyn digitale vennoot. Elke projek word deur ons
              multi-model AI-stelsel ondersteun — Claude, GPT-4o, en Gemini werk
              saam om die beste resultate te lewer.
            </p>

            <div className="space-y-4">
              {[
                { num: '01', title: 'Drie AI-modelle',  desc: 'Claude, GPT-4o, en Gemini kontroleer mekaar vir akkuraatheid en kwaliteit.' },
                { num: '02', title: 'Live Projek-portaal', desc: 'Kliënte sien presies waar hul projek is — Kanban, mylpale, en regstreekse boodskappe.' },
                { num: '03', title: 'Slim SEO-paneel', desc: 'Bestuur meta-tags, sitekaarte, en omleidings met AI-hulp — sonder 'n ontwikkelaar.' },
                { num: '04', title: 'YOCO-betalings', desc: 'Veilige, Suid-Afrikaanse betalingsverwerking ingebou vir dienste en produkte.' },
              ].map(item => (
                <div key={item.num} className="flex gap-4 items-start">
                  <span className="font-grotesk text-[10px] font-700 text-[#0057FF] tracking-[0.2em] pt-1 shrink-0">{item.num}</span>
                  <div>
                    <h4 className="font-grotesk text-sm font-700 mb-1">{item.title}</h4>
                    <p className="text-sm text-[#8C8C8C] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Architectural Visual */}
          <div className="relative">
            <div className="ydg-grid-bg-sm absolute inset-0 opacity-30" />
            <div className="relative p-8 space-y-4">
              {/* Model cards */}
              {[
                { name: 'Claude Sonnet', role: 'Primêre model', color: '#0057FF', primary: true },
                { name: 'GPT-4o',        role: 'Verifieerder · Terugval 1', color: '#8C8C8C', primary: false },
                { name: 'Gemini Pro',    role: 'Verifieerder · Terugval 2', color: '#8C8C8C', primary: false },
              ].map((model, i) => (
                <div
                  key={model.name}
                  className={`border p-4 flex items-center justify-between ${
                    model.primary
                      ? 'border-[#0057FF] bg-[#E8F0FF]'
                      : 'border-[#E2E2E2] bg-white'
                  }`}
                  style={{ marginLeft: `${i * 16}px` }}
                >
                  <div>
                    <p className="font-grotesk text-sm font-700">{model.name}</p>
                    <p className="text-xs text-[#8C8C8C] mt-0.5">{model.role}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{ background: model.color }} />
                </div>
              ))}

              {/* Connector line */}
              <svg className="absolute left-12 top-[72px]" width="4" height="100" viewBox="0 0 4 100">
                <line x1="2" y1="0" x2="2" y2="100" stroke="#E2E2E2" strokeWidth="1" strokeDasharray="4 4" />
              </svg>

              {/* Score box */}
              <div className="border border-[#0A0A0A] bg-[#0A0A0A] text-white p-4 mt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#666] mb-1">Konsensus-telling</p>
                    <p className="font-grotesk text-2xl font-700 text-[#0057FF]">94%</p>
                  </div>
                  <p className="text-xs text-[#444] max-w-24 text-right">Ooreenstemming tussen modelle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
