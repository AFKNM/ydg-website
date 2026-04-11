import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // In production: send via AWS SES
    console.log('[CONTACT]', data)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Kon nie boodskap stuur nie.' }, { status: 500 })
  }
}
