'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Bot, RefreshCw } from 'lucide-react'

type Message = {
  id:      string
  role:    'user' | 'assistant'
  content: string
  model?:  string
}

const GREETING_AF = `Hallo! Ek is jou YDG digitale adviseur. 🤖

Vertel my: **Wat is die grootste digitale uitdaging in jou besigheid op die oomblik?**

Byvoorbeeld:
- "Ek kry nie genoeg aanlynverkeer nie"
- "Ek weet nie hoe om sosiale media te gebruik nie"
- "Ek het 'n nuwe webtuiste nodig"`

export function AIChatWidget() {
  const [isOpen,    setIsOpen]    = useState(false)
  const [messages,  setMessages]  = useState<Message[]>([
    { id: '0', role: 'assistant', content: GREETING_AF, model: 'claude' },
  ])
  const [input,     setInput]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [language,  setLanguage]  = useState<'AF' | 'EN'>('AF')
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID())
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const toggleLanguage = () => {
    const next = language === 'AF' ? 'EN' : 'AF'
    setLanguage(next)
    const greeting = next === 'AF' ? GREETING_AF : `Hello! I'm your YDG digital advisor. 🤖\n\n**What is your biggest digital business challenge right now?**\n\nFor example:\n- "I'm not getting enough website traffic"\n- "I don't know how to use social media"\n- "I need a new website"`
    setMessages([{ id: crypto.randomUUID(), role: 'assistant', content: greeting, model: 'claude' }])
    setSessionId(crypto.randomUUID())
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg: Message = {
      id:      crypto.randomUUID(),
      role:    'user',
      content: input.trim(),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/v1/ai/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          messages:  [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          language,
          sessionId,
        }),
      })

      if (!res.ok) throw new Error('API error')

      // Stream response
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      const assistantId = crypto.randomUUID()

      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          // Parse SSE
          const lines = chunk.split('\n')
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') break
              try {
                const parsed = JSON.parse(data)
                fullText += parsed.text ?? ''
                setMessages(prev =>
                  prev.map(m => m.id === assistantId ? { ...m, content: fullText, model: parsed.model } : m)
                )
              } catch {}
            }
          }
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        id:      crypto.randomUUID(),
        role:    'assistant',
        content: language === 'AF'
          ? "Verskoon my, ek ondervind 'n tegniese probleem. Probeer asseblief weer."
          : 'Sorry, I\'m experiencing a technical issue. Please try again.',
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    setMessages([{ id: crypto.randomUUID(), role: 'assistant', content: GREETING_AF, model: 'claude' }])
    setSessionId(crypto.randomUUID())
  }

  // Render markdown-ish content
  const renderContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
      .replace(/- /g, '• ')
  }

  return (
    <div className="ai-chat-widget">

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E2E2] bg-[#0A0A0A]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0057FF] animate-pulse-blue" />
              <span className="font-grotesk text-sm font-600 text-white">YDG AI Adviseur</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="text-[10px] font-bold tracking-wider text-[#666] hover:text-white transition-colors px-2 py-1 border border-[#333]"
                title="Toggle language"
              >
                {language}
              </button>
              <button onClick={resetChat} className="text-[#666] hover:text-white transition-colors">
                <RefreshCw size={14} />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-[#666] hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#0057FF] text-white'
                      : 'bg-[#F4F4F4] text-[#0A0A0A] border-l-2 border-[#0057FF]'
                  }`}
                  dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                />
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#F4F4F4] px-3 py-2.5 border-l-2 border-[#0057FF]">
                  <Loader2 size={14} className="animate-spin text-[#0057FF]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Model Indicator */}
          {messages.length > 1 && (
            <div className="px-4 py-1 border-t border-[#F4F4F4] flex items-center gap-1.5">
              <Bot size={10} className="text-[#8C8C8C]" />
              <span className="text-[10px] text-[#8C8C8C] uppercase tracking-wider">
                Claude · GPT-4o · Gemini
              </span>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-[#E2E2E2] p-3 flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'AF' ? 'Tik jou boodskap...' : 'Type your message...'}
              rows={1}
              className="flex-1 resize-none ydg-input py-2 text-sm"
              style={{ minHeight: '36px', maxHeight: '120px' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="btn btn-primary px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed self-end"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ai-chat-bubble"
        aria-label="Open AI chat"
      >
        {isOpen
          ? <X size={22} className="text-white" />
          : <MessageCircle size={22} className="text-white" />
        }
      </button>
    </div>
  )
}
