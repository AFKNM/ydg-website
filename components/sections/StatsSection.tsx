export function StatsSection() {
  const stats = [
    { value: '3',    label: 'AI Modelle Aktief',        sub: 'Claude · GPT-4o · Gemini' },
    { value: '12+',  label: 'Digitale Dienste',          sub: 'Alles onder een dak' },
    { value: '100%', label: 'Suid-Afrikaans',            sub: 'YOCO betalings · ZAR pryse' },
    { value: '24/7', label: 'AI Ondersteuning',          sub: 'Altyd beskikbaar vir kliënte' },
  ]

  return (
    <section className="border-t border-b border-[#E2E2E2]">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E2E2E2]">
        {stats.map((stat, i) => (
          <div key={i} className="p-8 text-center">
            <p className="font-grotesk text-4xl font-700 tracking-tightest text-[#0A0A0A] mb-1">
              {stat.value}
            </p>
            <p className="text-xs font-700 uppercase tracking-wider text-[#0057FF] mb-1">
              {stat.label}
            </p>
            <p className="text-xs text-[#8C8C8C]">{stat.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
