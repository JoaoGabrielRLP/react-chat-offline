import { useMemo, useState } from 'react'
import { ChatHistory } from './components/ChatHistory'
import { MessageComposer } from './components/MessageComposer'
import type { ChatMessage, Sender } from './types/chat'

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    text: 'O que vamos fazer hoje?',
    sender: 'bot',
  },
]

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const [role, setRole] = useState<Sender>('user')

  const canSubmit = useMemo(() => draft.trim().length > 0, [draft])

  const handleSubmit = () => {
    if (!canSubmit) {
      return
    }

    const nextMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text: draft,
      sender: role,
    }

    setMessages((currentMessages) => [...currentMessages, nextMessage])
    setDraft('')
  }

  return (
    <main className="app-shell">
      <div className="chat-window">
        <ChatHistory messages={messages} />
        <MessageComposer
          value={draft}
          role={role}
          onChange={setDraft}
          onRoleChange={setRole}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  )
}