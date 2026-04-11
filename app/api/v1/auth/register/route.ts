import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password } = schema.parse(body)

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'E-posadres is reeds geregistreer.' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'CLIENT',
        language: 'AF',
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ongeldige invoerdata.' }, { status: 400 })
    }
    console.error('[REGISTER]', err)
    return NextResponse.json({ error: 'Registrasie het misluk.' }, { status: 500 })
  }
}
