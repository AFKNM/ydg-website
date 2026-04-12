'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, ArrowRight, Loader2 } from 'lucide-react'

interface Message { role: 'user' | 'assistant'; content: string }

interface ContextualAIChatProps {
  suggestions?: string[]
  heading?: string
  label?: string
  placeholder?: string
  variant?: 'inline' | 'banner'
}

export function ContextualAIChat({
  suggestions = ['Watter diens pas vir my?', 'Hoe lank neem dit?', 'Wat kos dit?'],
  heading = 'Vra Mini YDG',
  label = 'AI ASSISTENT',
  placeholder = 'Tik jou vraag hier...',
  variant = 'inline',
}: ContextualAIChatProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: 'Howzit! Ek is Mini YDG — vra my enigiets oor ons dienste. 🚀' }])
    }
  }, [open, messages.length])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  useEffect(() => { if (open) inputRef.current?.focus() }, [open])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', content: text.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history: updated.slice(-6) }),
      })
      if (!res.ok) throw new Error('Stream error')
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let aiText = ''
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])
      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            const token = parsed?.text?.text ?? parsed?.text ?? ''
            if (token) {
              aiText += token
              setMessages(prev => { const c = [...prev]; c[c.length-1] = { role: 'assistant', content: aiText }; return c })
            }
          } catch { /* skip */ }
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Eish, iets het fout gegaan. Probeer weer!" }])
    } finally { setLoading(false) }
  }

  if (variant === 'banner' && !open) {
    return (
      <div className="border border-[#E2E2E2] bg-[#F4F4F4] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#0057FF] flex items-center justify-center shrink-0">
            <MessageCircle size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-700 uppercase tracking-[0.15em] text-[#0057FF] mb-0.5">{label}</p>
            <p className="font-grotesk font-600 text-sm">{heading}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {suggestions.slice(0, 2).map(s => (
            <button key={s} onClick={() => { setOpen(true); setTimeout(() => send(s), 200) }}
              className="text-xs border border-[#E2E2E2] bg-white px-3 py-1.5 hover:border-[#0057FF] hover:text-[#0057FF] transition-colors">{s}</button>
          ))}
          <button onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 text-xs bg-[#0057FF] text-white px-4 py-1.5 hover:bg-[#0040CC] transition-colors">
            Vra iets <ArrowRight size={12} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${variant === 'inline' ? 'border border-[#E2E2E2]' : ''}`}>
      {!open && variant === 'inline' && (
        <button onClick={() => setOpen(true)} className="w-full p-4 flex items-center justify-between hover:bg-[#F4F4F4] transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0057FF] flex items-center justify-center">
              <MessageCircle size={14} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs font-700 uppercase tracking-[0.15em] text-[#0057FF]">{label}</p>
              <p className="text-sm font-600">{heading}</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-[#0057FF] group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
      {open && (
        <div className="bg-white">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E2E2] bg-[#0A0A0A]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0057FF]" />
              <span className="text-xs font-700 uppercase tracking-[0.15em] text-white">Mini YDG</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-[#666] hover:text-white transition-colors"><X size={14} /></button>
          </div>
          <div className="h-56 overflow-y-auto p-4 space-y-3 bg-[#F9F9F9]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#0057FF] text-white' : 'bg-white border border-[#E2E2E2] text-[#0A0A0A]'}`}>
                  {m.content || (loading && m.role === 'assistant' ? <Loader2 size={14} className="animate-spin text-[#8C8C8C]" /> : '')}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {messages.length <= 1 && (
            <div className="px-4 py-2 flex flex-wrap gap-2 border-b border-[#E2E2E2]">
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)}
                  className="text-xs border border-[#E2E2E2] px-2.5 py-1 hover:border-[#0057FF] hover:text-[#0057FF] transition-colors bg-white">{s}</button>
              ))}
            </div>
          )}
          <div className="flex border-t border-[#E2E2E2]">
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)} placeholder={placeholder}
              className="flex-1 px-4 py-3 text-sm outline-none bg-white placeholder:text-[#8C8C8C]" />
            <button onClick={() => send(input)} disabled={loading || !input.trim()}
              className="px-4 py-3 bg-[#0057FF] text-white hover:bg-[#0040CC] disabled:opacity-40 transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContextualAIChat
