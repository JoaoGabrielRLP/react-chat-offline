import type { Message } from '../types/message'

type MessageBubbleProps = {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] whitespace-pre-wrap wrap-anywhere rounded-xl px-3 py-2 text-sm text-stone-800 shadow-sm ring-1 ring-stone-200 ${
          isUser ? 'bg-white' : 'bg-stone-100'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}
