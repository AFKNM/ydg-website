import { NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdigitalguy.co.za'

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /portal/
Disallow: /admin/

Sitemap: ${BASE_URL}/sitemap.xml`

  return new NextResponse(robots, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
