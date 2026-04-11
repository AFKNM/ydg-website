import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#E2E2E2] bg-[#0A0A0A] text-white">
      <div className="container-ydg py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-grotesk text-3xl font-bold tracking-[-0.05em] mb-4">
              YD<span className="text-[#0057FF]">G</span>
            </div>
            <p className="text-sm text-[#666] leading-relaxed">
              AI-aangedrewe digitale dienste vir Afrikaanse kleinsakeondernemings.
            </p>
            {/* Architectural SVG */}
            <svg width="80" height="20" className="mt-6 opacity-30" viewBox="0 0 80 20">
              <line x1="0" y1="10" x2="80" y2="10" stroke="#E2E2E2" strokeWidth="1"/>
              <line x1="16" y1="0" x2="16" y2="20" stroke="#0057FF" strokeWidth="2"/>
              <circle cx="16" cy="10" r="3" fill="#0057FF"/>
              <circle cx="48" cy="10" r="2" fill="#E2E2E2" opacity="0.5"/>
              <circle cx="72" cy="10" r="2" fill="#E2E2E2" opacity="0.5"/>
            </svg>
          </div>

          {/* Dienste */}
          <div>
            <h4 className="font-grotesk text-xs font-700 uppercase tracking-[0.15em] text-[#555] mb-4">Dienste</h4>
            <ul className="space-y-2.5">
              {[
                ['Google Ads',          '/dienste/google-ads'],
                ['SEO',                 '/dienste/seo'],
                ['META Advertensies',   '/dienste/meta-ads'],
                ['Webontwikkeling',     '/dienste/webontwikkeling'],
                ['AI Oplossings',       '/dienste/ai-oplossings'],
                ['Grafiese Ontwerp',    '/dienste/grafiese-ontwerp'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#666] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Maatskappy */}
          <div>
            <h4 className="font-grotesk text-xs font-700 uppercase tracking-[0.15em] text-[#555] mb-4">Maatskappy</h4>
            <ul className="space-y-2.5">
              {[
                ['Oor Ons',    '/oor-ons'],
                ['Blog',       '/blog'],
                ['Kontak',     '/kontak'],
                ['Kwotasie',   '/kwotasie'],
                ['Teken In',   '/teken-in'],
                ['Registreer', '/registreer'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#666] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-grotesk text-xs font-700 uppercase tracking-[0.15em] text-[#555] mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hallo@yourdigitalguy.co.za" className="text-sm text-[#666] hover:text-white transition-colors">
                  hallo@yourdigitalguy.co.za
                </a>
              </li>
              <li>
                <a href="https://yourdigitalguy.co.za" className="text-sm text-[#666] hover:text-white transition-colors">
                  yourdigitalguy.co.za
                </a>
              </li>
              <li className="pt-2">
                <Link href="/kwotasie" className="btn btn-blue text-xs py-2 px-4">
                  Kry 'n Kwotasie
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-16 pt-8 border-t border-[#1A1A1A]">
          <p className="text-xs text-[#444]">
            © {year} Your Digital Guy. Alle regte voorbehou.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {[
              ['Privaatheidsbeleid', '/privaatheid'],
              ['Gebruiksvoorwaardes', '/voorwaardes'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-xs text-[#444] hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
