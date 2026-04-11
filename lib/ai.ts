/**
 * YDG Multi-Model AI Orchestrator
 * ─────────────────────────────────────────────────────────────────────────────
 * Architecture: Claude (primary) → GPT-4o (verify/fallback) → Gemini (fallback)
 *
 * Flow:
 *  1. Send prompt to Claude Sonnet (primary)
 *  2. Simultaneously send to GPT-4o and Gemini for verification
 *  3. If Claude responds successfully → use it, log verification scores
 *  4. If Claude fails → use GPT-4o response
 *  5. If GPT-4o fails → use Gemini response
 *  6. All server-side: no API keys exposed to client
 */

import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

// ─── Clients ──────────────────────────────────────────────────────────────────

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// ─── Types ────────────────────────────────────────────────────────────────────

export type AIMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export type AIModel = 'claude' | 'gpt4o' | 'gemini'

export type AIResponse = {
  content: string
  model: AIModel
  verified: boolean
  verificationScore?: number // 0-1, agreement between models
  tokensUsed?: number
  language: 'AF' | 'EN'
}

export type ChatOptions = {
  messages: AIMessage[]
  language?: 'AF' | 'EN'
  stream?: boolean
  maxTokens?: number
  systemPromptExtra?: string
}

// ─── YDG System Prompt ────────────────────────────────────────────────────────

function getSystemPrompt(language: 'AF' | 'EN', extra?: string): string {
  const base = language === 'AF'
    ? `Jy is 'n digitale oplossingsadviseur by Your Digital Guy (YDG) — 'n professionele digitale diensteonderneming wat Afrikaanse kleinsakeondernemings bedien.

Jou rol:
- Help besoekers om die regte digitale diens of oplossing te identifiseer
- Vra duidelike, vriendelike kwalifiserende vrae om hul behoeftes te verstaan
- Genereer persoonlike diensaanbevelings gebaseer op hul antwoorde
- Bied aan om 'n kwotasie te skep of 'n konsultasie te bespreek
- Wees professioneel maar warm — hierdie is Afrikaanse sakemense

YDG se dienste sluit in:
• Google Ads bestuur
• SEO (soekenjin-optimering)
• Google My Business bestuur
• META-advertensies (Facebook & Instagram)
• WhatsApp sakekommunikasie-oplossings
• Besigheidsinteligensie-verslagdoening
• API-ontwikkeling
• AI-oplossings
• Webtuiste-ontwikkeling en -ontwerp
• Webtoepassing-ontwikkeling
• Grafiese ontwerp
• Handelsmerkverskaffing (hemde, pette, penne, ens.)
• Blogs en inhoudskep

Antwoordstyl:
- Gebruik Afrikaans primêr, maar wissel na Engels as die gebruiker Engels praat
- Wees bondig — maksimum 3-4 sinne per antwoord
- Sluit 'n duidelike volgende stap in aan die einde van elke antwoord
- Gebruik nooit tegnies jargon sonder verduideliking`
    : `You are a digital solutions advisor at Your Digital Guy (YDG) — a professional digital services company serving Afrikaans small businesses in South Africa.

Your role:
- Help visitors identify the right digital service or solution
- Ask clear, friendly qualifying questions to understand their needs
- Generate personalised service recommendations based on their answers
- Offer to create a quote or book a consultation
- Be professional but warm and approachable

YDG's services include:
• Google Ads management
• SEO (search engine optimisation)
• Google My Business management
• META advertising (Facebook & Instagram)
• WhatsApp business communication solutions
• Business Intelligence reporting
• API development
• AI solutions
• Website development and design
• Web application development
• Graphic design
• Branding supplies (shirts, caps, pens, etc.)
• Blog writing and content creation

Response style:
- Keep responses concise — max 3-4 sentences
- Always include a clear next step at the end
- Avoid technical jargon unless explained
- Use both Afrikaans and English naturally as appropriate`

  return extra ? `${base}\n\n${extra}` : base
}

// ─── Claude (Primary) ─────────────────────────────────────────────────────────

async function callClaude(
  messages: AIMessage[],
  systemPrompt: string,
  maxTokens = 800,
): Promise<string> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: messages.filter(m => m.role !== 'system').map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  })

  const block = response.content[0]
  if (block.type !== 'text') throw new Error('Unexpected Claude response type')
  return block.text
}

// ─── GPT-4o (Verify + Fallback 1) ────────────────────────────────────────────

async function callGPT4o(
  messages: AIMessage[],
  systemPrompt: string,
  maxTokens = 800,
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: maxTokens,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({ role: m.role as 'user' | 'assistant' | 'system', content: m.content })),
    ],
  })

  return response.choices[0]?.message?.content ?? ''
}

// ─── Gemini Pro (Verify + Fallback 2) ────────────────────────────────────────

async function callGemini(
  messages: AIMessage[],
  systemPrompt: string,
): Promise<string> {
  const model = gemini.getGenerativeModel({
    model: 'gemini-1.5-pro',
    systemInstruction: systemPrompt,
  })

  // Convert to Gemini format
  const history = messages.slice(0, -1).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const lastMessage = messages[messages.length - 1]
  const chat = model.startChat({ history })
  const result = await chat.sendMessage(lastMessage?.content ?? '')
  return result.response.text()
}

// ─── Consensus Verifier ───────────────────────────────────────────────────────

function computeConsensusScore(primary: string, secondary: string): number {
  // Simple semantic similarity via word overlap (production: use embedding cosine similarity)
  const wordsA = new Set(primary.toLowerCase().split(/\s+/).filter(w => w.length > 4))
  const wordsB = new Set(secondary.toLowerCase().split(/\s+/).filter(w => w.length > 4))
  const intersection = [...wordsA].filter(w => wordsB.has(w)).length
  const union = new Set([...wordsA, ...wordsB]).size
  return union === 0 ? 0 : intersection / union
}

// ─── Main Chat Function ───────────────────────────────────────────────────────

export async function chat(options: ChatOptions): Promise<AIResponse> {
  const {
    messages,
    language = 'AF',
    maxTokens = 800,
    systemPromptExtra,
  } = options

  const systemPrompt = getSystemPrompt(language, systemPromptExtra)
  let primaryResponse: string | null = null
  let usedModel: AIModel = 'claude'
  let verified = false
  let verificationScore = 0

  // Step 1: Call Claude (primary) + verification models in parallel
  const [claudeResult, gpt4oResult, geminiResult] = await Promise.allSettled([
    callClaude(messages, systemPrompt, maxTokens),
    callGPT4o(messages, systemPrompt, maxTokens),
    callGemini(messages, systemPrompt),
  ])

  // Step 2: Determine primary response with fallback chain
  if (claudeResult.status === 'fulfilled' && claudeResult.value) {
    primaryResponse = claudeResult.value
    usedModel = 'claude'

    // Verify against secondary models
    const verifiers: string[] = []
    if (gpt4oResult.status === 'fulfilled')   verifiers.push(gpt4oResult.value)
    if (geminiResult.status === 'fulfilled') verifiers.push(geminiResult.value)

    if (verifiers.length > 0) {
      verificationScore = verifiers
        .map(v => computeConsensusScore(primaryResponse!, v))
        .reduce((a, b) => a + b, 0) / verifiers.length
      verified = verificationScore > 0.15 // threshold for meaningful agreement
    }

  } else if (gpt4oResult.status === 'fulfilled' && gpt4oResult.value) {
    console.warn('[YDG AI] Claude failed — falling back to GPT-4o')
    primaryResponse = gpt4oResult.value
    usedModel = 'gpt4o'
    if (geminiResult.status === 'fulfilled') {
      verificationScore = computeConsensusScore(primaryResponse, geminiResult.value)
      verified = verificationScore > 0.15
    }

  } else if (geminiResult.status === 'fulfilled' && geminiResult.value) {
    console.warn('[YDG AI] Claude + GPT-4o failed — falling back to Gemini')
    primaryResponse = geminiResult.value
    usedModel = 'gemini'
    verified = false

  } else {
    throw new Error('All AI models failed. Please try again.')
  }

  return {
    content: primaryResponse,
    model: usedModel,
    verified,
    verificationScore,
    language,
  }
}

// ─── Streaming Chat (SSE) ─────────────────────────────────────────────────────

export async function* chatStream(options: ChatOptions): AsyncGenerator<string> {
  const { messages, language = 'AF', maxTokens = 800, systemPromptExtra } = options
  const systemPrompt = getSystemPrompt(language, systemPromptExtra)

  // Stream Claude; if it fails, fall back to GPT-4o stream
  try {
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        yield chunk.delta.text
      }
    }
  } catch (err) {
    console.warn('[YDG AI] Claude stream failed — falling back to GPT-4o stream')

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: maxTokens,
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({
          role: m.role as 'user' | 'assistant' | 'system',
          content: m.content,
        })),
      ],
    })

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content
      if (text) yield text
    }
  }
}

// ─── Quote Generator ──────────────────────────────────────────────────────────

export async function generateQuote(
  conversationSummary: string,
  language: 'AF' | 'EN' = 'AF',
): Promise<{ quote: string; services: string[]; estimatedTotal: string }> {
  const prompt = `
Based on this conversation summary, generate a structured service quote for YDG:

CONVERSATION:
${conversationSummary}

Return a JSON object with:
{
  "quote": "Professional quote summary (2-3 sentences)",
  "services": ["Service 1", "Service 2"],
  "estimatedTotal": "R X,XXX - R XX,XXX per month" or "R XX,XXX once-off"
}

Language: ${language === 'AF' ? 'Afrikaans' : 'English'}
`

  const response = await callClaude(
    [{ role: 'user', content: prompt }],
    'You are a professional quote generator for Your Digital Guy digital services company.',
    400,
  )

  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) return JSON.parse(jsonMatch[0])
  } catch {}

  return {
    quote: response,
    services: [],
    estimatedTotal: 'Persoonlike kwotasie / Custom quote',
  }
}

// ─── SEO Content Suggestion ───────────────────────────────────────────────────

export async function suggestSeoContent(
  route: string,
  currentContent: string,
  targetKeywords: string[],
): Promise<{ title: string; description: string; suggestions: string[] }> {
  const prompt = `
Generate optimised SEO content for the page: ${route}

Current content preview: ${currentContent.slice(0, 500)}
Target keywords: ${targetKeywords.join(', ')}

Return JSON:
{
  "title": "SEO title (50-60 chars)",
  "description": "Meta description (150-160 chars)",
  "suggestions": ["3-5 content improvement suggestions"]
}
`

  const response = await callClaude(
    [{ role: 'user', content: prompt }],
    'You are an SEO expert for Your Digital Guy, a South African digital services company.',
    400,
  )

  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) return JSON.parse(jsonMatch[0])
  } catch {}

  return { title: '', description: '', suggestions: [response] }
}
