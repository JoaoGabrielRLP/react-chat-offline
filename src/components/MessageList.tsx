import { useEffect, useRef } from 'react'
import type { Message } from '../types/message'
import { MessageBubble } from './MessageBubble'

type MessageListProps = {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = scrollRef.current

    if (!container) {
      return
    }

    container.scrollTop = container.scrollHeight
  }, [messages])

  return (
    <section
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-3 pb-24 pt-3"
      aria-live="polite"
      aria-label="Histórico de mensagens"
    >
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-center text-sm text-stone-600">
          Nenhuma mensagem ainda. Envie a primeira!
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      )}
    </section>
  )
}
