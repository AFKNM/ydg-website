import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ContextualAIChat } from '@/components/sections/ContextualAIChat'

const posts: Record<string, { title: string; category: string; date: string; readTime: string; excerpt: string; content: string }> = {
  'google-ads-vir-kleinsake': {
    title: 'Google Ads vir Kleinsake: 5 Foute wat Jou Geld Mors',
    category: 'Google Ads', date: '15 Maart 2025', readTime: '6 min',
    excerpt: 'Baie kleinsake-eienaars gooi geld weg op Google Ads sonder om te weet hoekom.',
    content: `Google Ads is een van die kragtigste digitale bemarkingsplatforms — maar ook een van die maklikste om geld op te mors.

## Fout #1: Breeë Sleutelwoorde Sonder Negatiewe Lyste

As jy adverteer vir "restaurant Kaapstad" sonder negatiewe sleutelwoorde soos "resepte", betaal jy vir mense wat nooit by jou sal eet nie.

## Fout #2: Alle Verkeer na die Tuisblad Stuur

Stuur advertensie-klikke na 'n spesifieke onderskepping-blad wat ooreenstem met die advertensie se boodskap.

## Fout #3: Nie Omskakeling-Opsporing Opstel Nie

Stel GA4 en Google Ads omskakeling-opsporing op — dit is gratis.

## Fout #4: Advertensies Nie Toets Nie

Skryf altyd minstens 2-3 advertensie-weergawes. Google sal outomaties die beter een meer wys.

## Fout #5: Nie Gereeld Nagaan Nie

Google Ads vereis weeklikse aandag. Kyk na jou soekterm-verslag en verfyn.

---

Wil jy hê ons moet jou Google Ads-rekening hersien? Kontak ons vir 'n gratis oudit.`.trim(),
  },
  'seo-in-2025-wat-werk': {
    title: 'SEO in 2025: Wat Werk Nog, Wat Nie Meer Nie',
    category: 'SEO', date: '28 Februarie 2025', readTime: '8 min',
    excerpt: "Google se algoritme verander vinnig. Hier is wat jy moet weet om jou webwerf te rangeer in 2025.",
    content: `SEO in 2025 is nie dieselfde as 2020 nie. Google se AI Overviews, E-E-A-T, en Core Web Vitals het alles verander.

## Wat Steeds Werk

**Kwaliteit-inhoud:** Lang, goed-navorsde artikels wat werklik antwoord op gebruikersvrae.

**Tegniese SEO:** Vinnige laaitye, mobiel-vriendelik, veilige HTTPS — die basis is steeds krities.

## Wat Nie Meer Werk Nie

**Sleutelwoord-vulling:** As jy 'n sleutelwoord 20 keer herhaal, straf Google jou.

**Backlinks van lae kwaliteit:** Koop nooit backlinks nie.

---

Ons bied gratis SEO-oudits. Kontak ons om te sien waar jou webwerf staan.`.trim(),
  },
}

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts[params.slug]
  if (!post) return { title: 'Blog Post Nie Gevind' }
  return { title: `${post.title} | YDG Blog`, description: post.excerpt }
}

export default function BlogPostPage({ params }: Props) {
  const post = posts[params.slug]
  if (!post) notFound()

  const sections = post.content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) return <h2 key={i} className="font-grotesk text-2xl font-700 mt-10 mb-4">{block.slice(3)}</h2>
    if (block === '---') return <hr key={i} className="border-[#E2E2E2] my-8" />
    if (block.startsWith('**')) {
      const parts = block.split(':**')
      return <p key={i} className="text-[#0A0A0A] leading-relaxed mb-4"><strong>{parts[0].slice(2)}</strong>:{parts[1]}</p>
    }
    return <p key={i} className="text-[#8C8C8C] leading-relaxed mb-4">{block}</p>
  })

  return (
    <main className="section-pad pt-24">
      <div className="container-ydg">
        <nav className="flex items-center gap-2 text-xs text-[#8C8C8C] mb-12">
          <Link href="/" className="hover:text-[#0057FF] transition-colors">Tuis</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#0057FF] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[#0A0A0A]">{post.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <article className="lg:col-span-2">
            <header className="mb-12 pb-8 border-b border-[#E2E2E2]">
              <span className="text-xs font-700 uppercase tracking-[0.2em] text-[#0057FF] block mb-4">{post.category}</span>
              <h1 className="font-grotesk text-4xl font-700 leading-tight mb-6">{post.title}</h1>
              <div className="flex items-center gap-4 text-xs text-[#8C8C8C]">
                <span>YDG-Span</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.readTime} lees</span>
              </div>
            </header>
            <div className="prose-ydg">{sections}</div>
            <footer className="mt-12 pt-8 border-t border-[#E2E2E2]">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <Link href="/blog" className="text-sm text-[#0057FF] font-600 flex items-center gap-1.5">← Terug na Blog</Link>
                <Link href="/kwotasie" className="btn btn-primary text-sm px-6 py-3">Kry 'n Kwotasie</Link>
              </div>
            </footer>
          </article>

          <aside className="space-y-6">
            <div className="sticky top-24">
              <p className="text-xs font-700 uppercase tracking-[0.15em] text-[#8C8C8C] mb-3">Mini YDG Assistent</p>
              <ContextualAIChat
                variant="inline"
                heading={`Vra oor ${post.category}`}
                label="Mini YDG"
                suggestions={[`Verduidelik ${post.category} vir my`, 'Hoe kan YDG my help?', 'Hoeveel kos dit?']}
                placeholder={`Vra oor ${post.category}...`}
              />
              <div className="mt-4 border border-[#E2E2E2] p-6 bg-[#0A0A0A]">
                <p className="font-grotesk font-700 text-white text-base mb-2">Gereed om te begin?</p>
                <p className="text-[#555] text-xs mb-4">Kry 'n gratis kwotasie — geen verbintenis.</p>
                <Link href="/kwotasie" className="btn btn-blue text-xs px-4 py-2.5 w-full text-center block">Kry Kwotasie</Link>
              </div>
              <div className="mt-4">
                <p className="text-xs font-700 uppercase tracking-[0.15em] text-[#8C8C8C] mb-3">Lees Ook</p>
                <div className="space-y-3">
                  {Object.entries(posts).filter(([slug]) => slug !== params.slug).slice(0, 3).map(([slug, p]) => (
                    <Link key={slug} href={`/blog/${slug}`} className="block border border-[#E2E2E2] p-3 hover:border-[#0057FF] transition-colors group">
                      <span className="text-xs font-700 text-[#0057FF] block mb-1">{p.category}</span>
                      <span className="text-xs font-600 group-hover:text-[#0057FF] transition-colors leading-snug block">{p.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
