import { type NextRequest, NextResponse } from 'next/server'
import { chatStream } from '@/lib/ai'
import { db } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  messages:  z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string() })),
  language:  z.enum(['AF', 'EN']).default('AF'),
  sessionId: z.string().optional(),
})

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { messages, language, sessionId } = parsed.data

    // Build encoder for SSE streaming
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        let fullText = ''
        let usedModel = 'claude'

        try {
          const gen = chatStream({
            messages: messages as any,
            language,
            maxTokens: 600,
          })

          for await (const chunk of gen) {
            fullText += chunk
            const sseData = JSON.stringify({ text: chunk, model: usedModel })
            controller.enqueue(encoder.encode(`data: ${sseData}\n\n`))
          }
        } catch (err) {
          console.error('[AI Chat] Stream error:', err)
          const errMsg = language === 'AF'
            ? "Verskoon my, 'n fout het voorgekom. Probeer asseblief weer."
            : 'Sorry, an error occurred. Please try again.'
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: errMsg, model: 'error' })}\n\n`))
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()

        // Persist conversation asynchronously
        if (sessionId && fullText) {
          db.aIConversation.upsert({
            where:  { id: sessionId },
            update: { messages: [...messages, { role: 'assistant', content: fullText, timestamp: new Date() }] as any, updatedAt: new Date() },
            create: {
              id:        sessionId,
              sessionId,
              messages:  [...messages, { role: 'assistant', content: fullText, timestamp: new Date() }] as any,
              model:     usedModel,
              language:  language as 'AF' | 'EN',
            },
          }).catch(console.error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type':  'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection':    'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (err) {
    console.error('[AI Chat] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
