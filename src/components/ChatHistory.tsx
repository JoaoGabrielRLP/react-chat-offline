import { ChatMessage } from './ChatMessage'
import type { ChatMessage as ChatMessageType } from '../types/chat'

type ChatHistoryProps = {
  messages: ChatMessageType[]
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <section className="chat-history" aria-live="polite" aria-label="Histórico de mensagens">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </section>
  )
}
