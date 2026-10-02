'use client'

import { Leaf, Loader2, SendHorizontal, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { SUGGESTED_QUESTIONS } from '@/lib/services/assistant'
import type { ChatMessage } from '@/lib/types'
import { cn } from '@/lib/utils'

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Namaste! I'm your farming assistant. Ask me about pests, fertilizer, irrigation, soil, weather or market prices.",
}

export function FarmingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading])

  async function send(text: string) {
    const content = text.trim()
    if (!content || loading) return

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', content }
    const history = [...messages, userMessage]
    setMessages(history)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.filter((m) => m.id !== 'welcome') }),
      })
      const data = await response.json()
      const reply = response.ok ? data.reply : (data.error ?? 'Sorry, something went wrong.')
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: 'Sorry, I could not connect. Please check your internet and try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[calc(100dvh-16rem)] min-h-[28rem] flex-col overflow-hidden rounded-2xl border bg-card">
      <div className="flex-1 overflow-y-auto p-4 md:p-6" role="log" aria-live="polite" aria-label="Conversation">
        <ul className="mx-auto flex max-w-3xl flex-col gap-4">
          {messages.map((message) => (
            <li key={message.id} className={cn('flex gap-3', message.role === 'user' && 'flex-row-reverse')}>
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full',
                  message.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground',
                )}
              >
                {message.role === 'user' ? <User className="size-4" aria-hidden="true" /> : <Leaf className="size-4" aria-hidden="true" />}
                <span className="sr-only">{message.role === 'user' ? 'You' : 'Assistant'}</span>
              </span>
              <p
                className={cn(
                  'max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-base leading-relaxed',
                  message.role === 'user' ? 'rounded-tr-sm bg-primary text-primary-foreground' : 'rounded-tl-sm bg-muted',
                )}
              >
                {message.content}
              </p>
            </li>
          ))}
          {loading && (
            <li className="flex gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Leaf className="size-4" aria-hidden="true" />
              </span>
              <p className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-muted-foreground">
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Thinking…
              </p>
            </li>
          )}
        </ul>
        <div ref={endRef} />
      </div>

      <div className="border-t bg-background/50 p-3 md:p-4">
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {messages.length === 1 && (
            <ul className="flex gap-2 overflow-x-auto pb-1" aria-label="Suggested questions">
              {SUGGESTED_QUESTIONS.map((question) => (
                <li key={question} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => send(question)}
                    className="rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-secondary/50"
                  >
                    {question}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-end gap-2"
          >
            <label htmlFor="chat-input" className="sr-only">
              Ask a farming question
            </label>
            <Textarea
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  if (e.nativeEvent.isComposing || e.keyCode === 229) return
                  e.preventDefault()
                  send(input)
                }
              }}
              placeholder="Ask a farming question…"
              rows={1}
              maxLength={2000}
              className="max-h-32 min-h-12 resize-none text-base"
            />
            <Button type="submit" size="icon-lg" className="size-12 shrink-0 rounded-xl" disabled={!input.trim() || loading} aria-label="Send message">
              <SendHorizontal className="size-5" aria-hidden="true" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
