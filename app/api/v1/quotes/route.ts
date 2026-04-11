import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string(),
  business: z.string(),
  services: z.array(z.string()).min(1),
  budget: z.string(),
  message: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // Find or create user account
    let user = await db.user.findUnique({ where: { email: data.email } })
    if (!user) {
      user = await db.user.create({
        data: {
          name: data.name,
          email: data.email,
          role: 'CLIENT',
          language: 'AF',
          company: data.business,
          phone: data.phone,
        },
      })
    }

    // Create quote record
    await db.quote.create({
      data: {
        userId: user.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.business,
        message: data.message || `Begroting: ${data.budget}`,
        status: 'NEW',
        items: {
          create: data.services.map(svc => ({
            name: svc,
          })),
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[QUOTES]', err)
    return NextResponse.json({ error: 'Kwotasie-versoek het misluk.' }, { status: 500 })
  }
}
