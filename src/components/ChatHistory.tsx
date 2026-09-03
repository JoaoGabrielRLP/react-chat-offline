import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import type { ChatMessage as ChatMessageType } from '../types/chat'

type ChatHistoryProps = {
  messages: ChatMessageType[]
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    container.scrollTop = container.scrollHeight
  }, [messages])

  return (
    <section
      ref={containerRef}
      className="chat-history"
      aria-live="polite"
      aria-label="Histórico de mensagens"
    >
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </section>
  )
}
