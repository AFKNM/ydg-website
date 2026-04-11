import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { createYocoCheckout, toYocoCents } from '@/lib/yoco'
import { z } from 'zod'

const schema = z.object({
  items: z.array(z.object({
    id:       z.string(),
    type:     z.enum(['service', 'product']),
    name:     z.string(),
    quantity: z.number().int().positive().default(1),
    price:    z.number().positive(),
    options:  z.any().optional(),
  })),
  notes: z.string().optional(),
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://yourdigitalguy.co.za'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Nie gemagtig' }, { status: 401 })
    }

    const body   = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Ongeldige versoek', details: parsed.error.flatten() }, { status: 400 })
    }

    const { items, notes } = parsed.data

    // Calculate total
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Create order in DB
    const order = await db.order.create({
      data: {
        userId:   session.user.id,
        status:   'PENDING',
        total,
        currency: 'ZAR',
        notes,
        items: {
          create: items.map(item => ({
            serviceId: item.type === 'service' ? item.id : undefined,
            productId: item.type === 'product' ? item.id : undefined,
            name:      item.name,
            quantity:  item.quantity,
            unitPrice: item.price,
            options:   item.options,
          })),
        },
      },
    })

    // Create YOCO checkout
    const checkout = await createYocoCheckout({
      amount:     toYocoCents(total),
      orderId:    order.id,
      successUrl: `${BASE_URL}/betaling/sukses?orderId=${order.id}`,
      failureUrl: `${BASE_URL}/betaling/misluk?orderId=${order.id}`,
      cancelUrl:  `${BASE_URL}/betaling/gekanselleer?orderId=${order.id}`,
      metadata: {
        userId:    session.user.id,
        orderNumber: order.id,
      },
    })

    // Update order with YOCO checkout ID
    await db.order.update({
      where: { id: order.id },
      data:  { yocoCheckoutId: checkout.id },
    })

    return NextResponse.json({
      orderId:     order.id,
      checkoutId:  checkout.id,
      redirectUrl: checkout.redirectUrl,
    })
  } catch (err: any) {
    console.error('[YOCO Initiate]', err)
    return NextResponse.json({ error: err.message ?? 'Betalingsfout' }, { status: 500 })
  }
}
