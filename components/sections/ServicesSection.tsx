'use client'

import Link from 'next/link'
import { ArrowUpRight, Globe, Search, MessageSquare, Megaphone, BarChart3, Code2, Bot, Palette, Package, PenTool } from 'lucide-react'

const services = [
  {
    icon: Megaphone,
    name: 'Google Ads',
    nameAF: 'Google Advertensies',
    desc: 'Geteikende betaalde advertensies wat onmiddellike resultate lewer. Maksimeer jou ROI.',
    href: '/dienste/google-ads',
    pricing: 'Maandlikse retainer',
    tag: 'Bemarking',
  },
  {
    icon: Search,
    name: 'SEO',
    nameAF: 'Soekenjin-optimering',
    desc: 'Organies op bl. 1 van Google. Langtermyn-verkeer sonder deurlopende advertensie-uitgawes.',
    href: '/dienste/seo',
    pricing: 'Maandlikse retainer',
    tag: 'Bemarking',
    featured: true,
  },
  {
    icon: Globe,
    name: 'Google My Business',
    nameAF: 'Google My Business',
    desc: 'Beheer hoe jou besigheid op Google Kaarte en soekresultate lyk.',
    href: '/dienste/google-my-business',
    pricing: 'Maandlikse retainer',
    tag: 'Bemarking',
  },
  {
    icon: Megaphone,
    name: 'META Ads',
    nameAF: 'META Advertensies',
    desc: 'Facebook en Instagram advertensies wat jou teikenmark tref waar hulle is.',
    href: '/dienste/meta-ads',
    pricing: 'Maandlikse retainer',
    tag: 'Bemarking',
  },
  {
    icon: MessageSquare,
    name: 'WhatsApp Oplossings',
    nameAF: 'WhatsApp Sakekommunikasie',
    desc: 'Outomatiese WhatsApp-boodskappe, chatbotte, en besigheidsprofiele.',
    href: '/dienste/whatsapp',
    pricing: 'Maandlikse retainer',
    tag: 'Kommunikasie',
  },
  {
    icon: BarChart3,
    name: 'BI Verslagdoening',
    nameAF: 'Besigheidsinteligensie',
    desc: 'Omskep data in besluite. Dashboards en verslagdoening wat sin maak.',
    href: '/dienste/bi-verslagdoening',
    pricing: 'Persoonlike kwotasie',
    tag: 'Analiese',
  },
  {
    icon: Code2,
    name: 'Webontwikkeling',
    nameAF: 'Webtuiste Ontwikkeling',
    desc: 'Spoed-geoptimeerde, SEO-gereed webtuistes wat jou handelsmerk verteenwoordig.',
    href: '/dienste/webontwikkeling',
    pricing: 'Persoonlike kwotasie',
    tag: 'Ontwikkeling',
    featured: true,
  },
  {
    icon: Bot,
    name: 'AI Oplossings',
    nameAF: 'Kunsmatige Intelligensie',
    desc: 'Pasgemaakte AI-modelle, chatbotte, en outomatiseringsoplossings vir jou besigheid.',
    href: '/dienste/ai-oplossings',
    pricing: 'Persoonlike kwotasie',
    tag: 'Tegnologie',
  },
  {
    icon: Palette,
    name: 'Grafiese Ontwerp',
    nameAF: 'Grafiese Ontwerp',
    desc: 'Logo\'s, handelsmerkidentiteit, sosiale media-grafika, en drukmateriaal.',
    href: '/dienste/grafiese-ontwerp',
    pricing: 'Vaste prys',
    tag: 'Ontwerp',
  },
  {
    icon: Package,
    name: 'Handelsmerk Verskaffing',
    nameAF: 'Handelsmerkverskaffing',
    desc: 'Gemerkte klere, pette, penne, en meer. Jou handelsmerk op alles.',
    href: '/produkte',
    pricing: 'Vaste prys',
    tag: 'Produkte',
  },
  {
    icon: PenTool,
    name: 'Blogs & Inhoud',
    nameAF: 'Inhoudskep',
    desc: 'Professionele blog-artikels, webtuiste-teks, en sosiale media-inhoud.',
    href: '/dienste/inhoud',
    pricing: 'Per artikel / retainer',
    tag: 'Inhoud',
  },
  {
    icon: Code2,
    name: 'API Ontwikkeling',
    nameAF: 'API Integrasies',
    desc: 'Verbind jou stelsels. RESTful API\'s, webhooks, en integrerings vir enige platform.',
    href: '/dienste/api-ontwikkeling',
    pricing: 'Persoonlike kwotasie',
    tag: 'Tegnologie',
  },
]

export function ServicesSection() {
  return (
    <section className="section-pad border-t border-[#E2E2E2]">
      <div className="container-ydg">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">Wat Ons Doen</p>
            <h2 className="section-title">Alles Wat Jou<br />Besigheid Nodig Het</h2>
          </div>
          <Link href="/dienste" className="hidden md:flex items-center gap-2 text-sm font-medium text-[#8C8C8C] hover:text-[#0057FF] transition-colors">
            Alle Dienste
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#E2E2E2]">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.href}
                href={service.href}
                className={`group relative flex flex-col p-6 transition-all duration-200 ${
                  service.featured
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-white hover:bg-[#F4F4F4]'
                }`}
              >
                {/* Tag */}
                <span className={`ydg-tag mb-4 self-start ${
                  service.featured ? 'border-[#333] text-[#666]' : ''
                }`}>
                  {service.tag}
                </span>

                {/* Icon */}
                <Icon
                  size={22}
                  className={`mb-4 transition-colors ${
                    service.featured ? 'text-[#0057FF]' : 'text-[#0A0A0A] group-hover:text-[#0057FF]'
                  }`}
                />

                {/* Name */}
                <h3 className={`font-grotesk text-base font-600 mb-2 ${
                  service.featured ? 'text-white' : 'text-[#0A0A0A]'
                }`}>
                  {service.name}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed flex-1 ${
                  service.featured ? 'text-[#666]' : 'text-[#8C8C8C]'
                }`}>
                  {service.desc}
                </p>

                {/* Pricing + Arrow */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E2E2E2] border-opacity-20">
                  <span className={`text-xs font-medium ${
                    service.featured ? 'text-[#555]' : 'text-[#8C8C8C]'
                  }`}>
                    {service.pricing}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className={`transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      service.featured ? 'text-[#0057FF]' : 'text-[#E2E2E2] group-hover:text-[#0057FF]'
                    }`}
                  />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile "All services" link */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/dienste" className="btn btn-outline">
            Alle Dienste
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
