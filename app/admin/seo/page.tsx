import { requireAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { SEOPanelClient } from '@/components/admin/SEOPanelClient'

export const dynamic = 'force-dynamic'

export default async function AdminSEOPage() {
  await requireAdmin()

  const seoSettings = await db.seoSetting.findMany({
    orderBy: { route: 'asc' },
  })

  const redirects = await db.redirect.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return <SEOPanelClient initialSettings={seoSettings} initialRedirects={redirects} />
}
