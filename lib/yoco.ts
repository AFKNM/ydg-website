/**
 * YDG — YOCO Payment Integration
 * Docs: https://developer.yoco.com/online/
 */

const YOCO_API_URL = 'https://payments.yoco.com/api'
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY!

export type YocoCheckoutPayload = {
  amount: number        // in cents (e.g. 10000 = R100.00)
  currency?: string     // default: ZAR
  orderId: string
  cancelUrl: string
  successUrl: string
  failureUrl: string
  metadata?: Record<string, string>
}

export type YocoCheckoutResponse = {
  id: string
  redirectUrl: string
  status: string
}

// ─── Create Checkout Session ──────────────────────────────────────────────────

export async function createYocoCheckout(
  payload: YocoCheckoutPayload,
): Promise<YocoCheckoutResponse> {
  const res = await fetch(`${YOCO_API_URL}/checkouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${YOCO_SECRET_KEY}`,
    },
    body: JSON.stringify({
      amount:      payload.amount,
      currency:    payload.currency ?? 'ZAR',
      cancelUrl:   payload.cancelUrl,
      successUrl:  payload.successUrl,
      failureUrl:  payload.failureUrl,
      metadata: {
        orderId: payload.orderId,
        ...payload.metadata,
      },
    }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(`YOCO checkout failed: ${JSON.stringify(error)}`)
  }

  return res.json()
}

// ─── Verify Webhook Signature ─────────────────────────────────────────────────

export function verifyYocoWebhook(
  rawBody: string,
  signature: string,
  secret: string = process.env.YOCO_WEBHOOK_SECRET!,
): boolean {
  const crypto = require('crypto')
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected),
  )
}

// ─── Refund ───────────────────────────────────────────────────────────────────

export async function refundYocoPayment(
  paymentId: string,
  amount?: number,
): Promise<{ success: boolean; id: string }> {
  const res = await fetch(`${YOCO_API_URL}/refunds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${YOCO_SECRET_KEY}`,
    },
    body: JSON.stringify({
      paymentId,
      ...(amount ? { amount } : {}),
    }),
  })

  if (!res.ok) throw new Error('YOCO refund failed')
  const data = await res.json()
  return { success: true, id: data.id }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const toYocoCents = (rands: number) => Math.round(rands * 100)
export const fromYocoCents = (cents: number) => (cents / 100).toFixed(2)
