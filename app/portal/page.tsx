import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
import { FolderOpen, ShoppingBag, FileText, ArrowRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

export default async function PortalPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/teken-in')

  const [projects, orders, invoices] = await Promise.all([
    db.project.findMany({
      where:   { clientId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      take:    5,
      include: { milestones: true },
    }),
    db.order.findMany({
      where:   { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take:    5,
    }),
    db.invoice.findMany({
      where:   { order: { userId: session.user.id } },
      orderBy: { issuedAt: 'desc' },
      take:    5,
      include: { order: true },
    }),
  ])

  const statusConfig = {
    BRIEFING: { label: 'Briefing',    color: '#8C8C8C', icon: Clock },
    ACTIVE:   { label: 'Aktief',      color: '#0057FF', icon: AlertCircle },
    REVIEW:   { label: 'Hersien',     color: '#F59E0B', icon: AlertCircle },
    DONE:     { label: 'Voltooi',     color: '#10B981', icon: CheckCircle2 },
    ON_HOLD:  { label: 'Gepauses',    color: '#EF4444', icon: Clock },
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] pt-20">
      <div className="container-ydg py-10">

        {/* Welcome */}
        <div className="mb-10">
          <p className="section-label mb-2">Welkom Terug</p>
          <h1 className="font-grotesk text-4xl font-700 tracking-tight">
            {session.user.name?.split(' ')[0]}
            <span className="text-[#0057FF]">.</span>
          </h1>
          <p className="text-[#8C8C8C] mt-1 text-sm">
            Hier is 'n oorsig van jou aktiewe projekte en bestellings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Aktiewe Projekte', value: projects.filter(p => p.status === 'ACTIVE').length, icon: FolderOpen, href: '/portaal/projekte' },
            { label: 'Bestellings',      value: orders.length,                                      icon: ShoppingBag, href: '/portaal/bestellings' },
            { label: 'Fakture',          value: invoices.length,                                    icon: FileText,    href: '/portaal/fakture' },
          ].map(stat => {
            const Icon = stat.icon
            return (
              <Link key={stat.label} href={stat.href} className="ydg-card group">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-[#8C8C8C] uppercase tracking-wider mb-2">{stat.label}</p>
                    <p className="font-grotesk text-4xl font-700 tracking-tight">{stat.value}</p>
                  </div>
                  <Icon size={20} className="text-[#E2E2E2] group-hover:text-[#0057FF] transition-colors" />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Projects */}
          <div className="bg-white border border-[#E2E2E2] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-grotesk text-lg font-600">Projekte</h2>
              <Link href="/portaal/projekte" className="text-xs text-[#0057FF] flex items-center gap-1 hover:underline">
                Almal <ArrowRight size={12} />
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen size={32} className="text-[#E2E2E2] mx-auto mb-3" />
                <p className="text-sm text-[#8C8C8C]">Geen aktiewe projekte nie</p>
                <Link href="/dienste" className="btn btn-outline text-xs mt-4">
                  Verken Dienste
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map(project => {
                  const config  = statusConfig[project.status]
                  const Icon    = config.icon
                  const done    = project.milestones.filter(m => m.status === 'DONE').length
                  const total   = project.milestones.length
                  const percent = total > 0 ? Math.round((done / total) * 100) : 0

                  return (
                    <Link
                      key={project.id}
                      href={`/portaal/projekte/${project.id}`}
                      className="flex items-center gap-4 p-4 border border-[#F4F4F4] hover:border-[#E2E2E2] transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-grotesk text-sm font-600 truncate">{project.name}</p>
                        {total > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-1 bg-[#F4F4F4]">
                              <div
                                className="h-full bg-[#0057FF] transition-all duration-500"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <span className="text-xs text-[#8C8C8C] shrink-0">{percent}%</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Icon size={12} style={{ color: config.color }} />
                        <span className="text-xs" style={{ color: config.color }}>{config.label}</span>
                      </div>
                      <ArrowRight size={14} className="text-[#E2E2E2] group-hover:text-[#0A0A0A] transition-colors shrink-0" />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Recent Orders */}
          <div className="bg-white border border-[#E2E2E2] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-grotesk text-lg font-600">Bestellings</h2>
              <Link href="/portaal/bestellings" className="text-xs text-[#0057FF] flex items-center gap-1 hover:underline">
                Almal <ArrowRight size={12} />
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={32} className="text-[#E2E2E2] mx-auto mb-3" />
                <p className="text-sm text-[#8C8C8C]">Geen bestellings nie</p>
                <Link href="/dienste" className="btn btn-primary text-xs mt-4">
                  Bestel nou
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-[#F4F4F4]">
                    <div>
                      <p className="font-grotesk text-xs font-600 text-[#8C8C8C] uppercase tracking-wider">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-sm font-medium mt-0.5">
                        R{Number(order.total).toLocaleString('af-ZA', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <span className={`ydg-tag ${
                      order.status === 'PAID'   ? 'ydg-tag-blue' :
                      order.status === 'ACTIVE' ? 'ydg-tag-blue' : ''
                    }`}>
                      {order.status === 'PAID' ? 'Betaal' :
                       order.status === 'PENDING' ? 'Hangende' :
                       order.status === 'ACTIVE'  ? 'Aktief'   :
                       order.status === 'CANCELLED' ? 'Gekanselleer' : order.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
