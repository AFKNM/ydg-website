import { type NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyYocoWebhook } from '@/lib/yoco'

export async function POST(req: NextRequest) {
  const rawBody  = await req.text()
  const signature = req.headers.get('x-yoco-signature') ?? ''

  // Verify webhook authenticity
  if (!verifyYocoWebhook(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(rawBody)
  console.log('[YOCO Webhook]', event.type, event.id)

  switch (event.type) {
    case 'payment.succeeded': {
      const orderId = event.metadata?.orderId
      if (!orderId) break

      await db.order.update({
        where: { id: orderId },
        data:  {
          status:        'PAID',
          yocoPaymentId: event.id,
        },
      })

      // Generate invoice number
      const count = await db.invoice.count()
      const invoiceNumber = `YDG-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`

      await db.invoice.create({
        data: {
          orderId,
          number:  invoiceNumber,
          issuedAt: new Date(),
          dueAt:    new Date(),
          paidAt:   new Date(),
        },
      })

      // Auto-create project for service orders
      const order = await db.order.findUnique({
        where:   { id: orderId },
        include: { user: true, items: true },
      })

      if (order && order.items.some(i => i.serviceId)) {
        await db.project.create({
          data: {
            name:     `${order.user.name} — Projek`,
            clientId: order.userId,
            orderId:  order.id,
            status:   'BRIEFING',
          },
        })
      }

      // TODO: Send confirmation email via AWS SES
      break
    }

    case 'payment.failed': {
      const orderId = event.metadata?.orderId
      if (orderId) {
        await db.order.update({
          where: { id: orderId },
          data:  { status: 'CANCELLED' },
        })
      }
      break
    }

    case 'payment.refunded': {
      const orderId = event.metadata?.orderId
      if (orderId) {
        await db.order.update({
          where: { id: orderId },
          data:  { status: 'REFUNDED' },
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
