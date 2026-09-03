import { useState } from 'react'
import type { Message, Sender } from '../types/message'
import { ChatInput } from './ChatInput'
import { MessageList } from './MessageList'

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [sender, setSender] = useState<Sender>('user')

  const handleSend = () => {
    if (draft.trim() === '') {
      return
    }

    const nextMessage: Message = {
      id: crypto.randomUUID(),
      text: draft,
      sender,
    }

    setMessages((currentMessages) => [...currentMessages, nextMessage])
    setDraft('')
  }

  return (
    <main className="min-h-screen bg-stone-200 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-[calc(100vh-2rem)] max-w-2xl flex-col rounded-2xl bg-transparent">
        <MessageList messages={messages} />

        <ChatInput
          value={draft}
          onChange={setDraft}
          onSend={handleSend}
          sender={sender}
          onToggleSender={() => setSender((current) => (current === 'user' ? 'robot' : 'user'))}
        />
      </div>
    </main>
  )
}
