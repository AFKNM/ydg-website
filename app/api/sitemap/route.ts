import { NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdigitalguy.co.za'

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/dienste', priority: '0.9', changefreq: 'weekly' },
  { url: '/kwotasie', priority: '0.9', changefreq: 'monthly' },
  { url: '/kontak', priority: '0.8', changefreq: 'monthly' },
]

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <priority>${route.priority}</priority>
    <changefreq>${route.changefreq}</changefreq>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
