import { NextResponse } from 'next/server'
import { getAssistantReply } from '@/lib/services/assistant'
import type { ChatMessage } from '@/lib/types'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const messages: ChatMessage[] = Array.isArray(body?.messages)
    ? body.messages
        .filter((m: ChatMessage) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .slice(-20)
        .map((m: ChatMessage) => ({ ...m, content: m.content.slice(0, 2000) }))
    : []

  if (messages.length === 0) {
    return NextResponse.json({ error: 'No message provided.' }, { status: 400 })
  }

  const reply = await getAssistantReply(messages)
  return NextResponse.json({ reply })
}
