import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

/**
 * YOCO Webhook Handler — /api/v1/webhooks/yoco
 * Events: payment.succeeded, payment.failed, payment.refunded, refund.succeeded, refund.failed
 */

function verifyYocoSignature(payload: string, signature: string, secret: string): boolean {
  try {
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(payload)
    const expected = hmac.digest('hex')
    return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const rawBody   = await req.text()
  const signature = req.headers.get('x-yoco-signature') ?? ''
  const secret    = process.env.YOCO_WEBHOOK_SECRET ?? ''

  if (secret && secret !== 'placeholder' && secret !== '') {
    if (!verifyYocoSignature(rawBody, signature, secret)) {
      console.warn('[YOCO webhook] Signature mismatch — rejected')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  } else {
    console.warn('[YOCO webhook] YOCO_WEBHOOK_SECRET not set — skipping signature check')
  }

  let event: { type?: string; id?: string; payload?: Record<string, unknown> }
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const eventType = event.type ?? 'unknown'
  const payload   = event.payload ?? {}
  const meta      = (payload.metadata ?? {}) as Record<string, string>
  const orderId   = meta.orderId

  console.log(`[YOCO webhook] ${eventType}`, { id: event.id, orderId })

  try {
    switch (eventType) {
      case 'payment.succeeded': {
        if (orderId) {
          await prisma.order.update({
            where: { id: orderId },
            data: { status: 'PAID', yocoCheckoutId: (payload.id as string) ?? (payload.checkoutId as string) },
          }).catch(err => console.error('[YOCO webhook] Order update error:', err.message))
        }
        break
      }
      case 'payment.failed': {
        if (orderId) await prisma.order.update({ where: { id: orderId }, data: { status: 'CANCELLED' } }).catch(() => {})
        break
      }
      case 'payment.refunded':
      case 'refund.succeeded': {
        if (orderId) await prisma.order.update({ where: { id: orderId }, data: { status: 'REFUNDED' } }).catch(() => {})
        break
      }
      case 'refund.failed': {
        console.warn('[YOCO webhook] Refund FAILED for order:', orderId)
        break
      }
      default:
        console.log('[YOCO webhook] Unhandled event:', eventType)
    }
  } catch (err) {
    console.error('[YOCO webhook] Unexpected error:', err)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}

export async function GET() {
  return NextResponse.json({ status: 'active', endpoint: '/api/v1/webhooks/yoco' })
}
