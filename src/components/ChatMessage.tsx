import type { ChatMessage } from '../types/chat'

type ChatMessageProps = {
  message: ChatMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user'

  return (
    <article className={`chat-message ${isUser ? 'user' : 'bot'}`}>
      <div className="chat-bubble">{message.text}</div>
    </article>
  )
}
