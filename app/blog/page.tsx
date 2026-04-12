import Link from 'next/link'
import type { Metadata } from 'next'
import { ContextualAIChat } from '@/components/sections/ContextualAIChat'

export const metadata: Metadata = {
  title: 'Blog | YDG — Digitale Insigte',
  description: 'Praktiese digitale bemarkingstips, AI nuus, en SA besigheidsadvies van die YDG-span.',
}

const posts = [
  { slug: 'google-ads-vir-kleinsake', category: 'Google Ads', title: 'Google Ads vir Kleinsake: 5 Foute wat Jou Geld Mors', excerpt: 'Baie kleinsake-eienaars gooi geld weg op Google Ads sonder om te weet hoekom. Hier is die 5 grootste foute — en hoe om dit reg te stel.', date: '2025-03-15', readTime: '6 min', featured: true },
  { slug: 'seo-in-2025-wat-werk', category: 'SEO', title: 'SEO in 2025: Wat Werk Nog, Wat Nie Meer Nie', excerpt: "Google se algoritme verander vinnig. Hier is wat jy moet weet om jou webwerf te rangeer in 2025.", date: '2025-02-28', readTime: '8 min', featured: true },
  { slug: 'ai-chatbots-vir-besigheid', category: 'AI Oplossings', title: "Hoe AI Chatbots Jou Besigheid 10+ Ure per Week kan Bespaar", excerpt: 'Pasgemaakte AI-chatbots doen meer as antwoorde gee. Hier is hoe slimmer outomatisering jou span bevry.', date: '2025-02-10', readTime: '5 min', featured: false },
  { slug: 'meta-advertensies-cape-town', category: 'META Advertensies', title: "META Advertensies vir SA Besighede: 'n Praktiese Gids", excerpt: "Facebook en Instagram advertensies vir die Suid-Afrikaanse mark het sy eie reëls.", date: '2025-01-22', readTime: '7 min', featured: false },
  { slug: 'website-spoed-sake', category: 'Webontwikkeling', title: "Hoekom Jou Website se Spoed Direk Jou Verkope Beïnvloed", excerpt: "Elke sekonde vertraging kos jou omskakelings. Hier is die data, en hoe jy jou webwerf vinniger maak.", date: '2025-01-08', readTime: '5 min', featured: false },
  { slug: 'google-my-business-optimisering', category: 'Google My Business', title: 'GMB Optimisering: Laat Plaaslike Klante Jou Vind', excerpt: "Jou Google My Business-profiel is jou gratis advertensie. Hier is hoe jy dit optimiseer.", date: '2024-12-18', readTime: '6 min', featured: false },
]

const categories = ['Alles', 'Google Ads', 'SEO', 'AI Oplossings', 'META Advertensies', 'Webontwikkeling', 'Google My Business']

export default function BlogPage() {
  const featured = posts.filter(p => p.featured)
  const regular = posts.filter(p => !p.featured)

  return (
    <main className="section-pad pt-24">
      <div className="container-ydg">
        <div className="mb-16">
          <p className="section-label mb-4">Blog</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="section-title">
              Digitale Insigte<br />
              <span className="text-[#0057FF]">wat Work.</span>
            </h1>
            <p className="text-[#8C8C8C] max-w-sm text-sm leading-relaxed">
              Praktiese tips, strategieë, en SA-spesifieke advies van die YDG-span.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12 border-b border-[#E2E2E2] pb-6">
          {categories.map(cat => (
            <button key={cat} className={`text-xs font-600 px-4 py-2 border transition-colors ${
              cat === 'Alles' ? 'border-[#0057FF] bg-[#0057FF] text-white' : 'border-[#E2E2E2] text-[#8C8C8C] hover:border-[#0057FF] hover:text-[#0057FF]'
            }`}>{cat}</button>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#E2E2E2] mb-8">
            {featured.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className={`group p-8 hover:bg-[#F4F4F4] transition-colors ${i === 0 ? 'md:border-r border-b md:border-b-0 border-[#E2E2E2]' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-700 uppercase tracking-[0.15em] text-[#0057FF]">{post.category}</span>
                  <span className="text-xs text-[#8C8C8C]">{post.readTime} lees</span>
                  <div className="ml-auto border border-[#0057FF] px-2 py-0.5 text-xs text-[#0057FF] font-600">Gewild</div>
                </div>
                <h2 className="font-grotesk text-xl font-700 mb-3 group-hover:text-[#0057FF] transition-colors leading-tight">{post.title}</h2>
                <p className="text-[#8C8C8C] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-[#0057FF] font-600">
                  Lees Artikel <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#E2E2E2] mb-12">
          {regular.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className={`group p-6 hover:bg-[#F4F4F4] transition-colors border-[#E2E2E2]
                ${i % 3 !== 2 ? 'md:border-r' : ''}
                ${i < regular.length - 3 ? 'border-b' : ''}
              `}>
              <span className="text-xs font-700 uppercase tracking-[0.15em] text-[#0057FF] block mb-3">{post.category}</span>
              <h3 className="font-grotesk text-base font-700 mb-2 group-hover:text-[#0057FF] transition-colors leading-tight">{post.title}</h3>
              <p className="text-[#8C8C8C] text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-[#8C8C8C]">
                <span>{post.readTime} lees</span>
                <span className="text-[#0057FF] font-600 group-hover:translate-x-0.5 transition-transform inline-block">→</span>
              </div>
            </Link>
          ))}
        </div>

        <ContextualAIChat
          variant="banner"
          heading="Wil jy meer oor 'n onderwerp weet?"
          label="Mini YDG · Blog Assistent"
          suggestions={['Verduidelik Google Ads vir my', 'Hoe verbeter ek my SEO?', 'Is AI goed vir my besigheid?']}
          placeholder="Vra oor enige digitale bemarkingsonderwerp..."
        />
      </div>
    </main>
  )
}
