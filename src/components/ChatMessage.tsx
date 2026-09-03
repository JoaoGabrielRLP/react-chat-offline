import type { ChatMessage } from '../types/chat'

type ChatMessageProps = {
  message: ChatMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUserMessage = message.sender === 'user'

  return (
    <article className={`chat-message ${isUserMessage ? 'user' : 'bot'}`}>
      <div className="chat-bubble">{message.text}</div>
    </article>
  )
}
