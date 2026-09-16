import { useEffect, useRef } from 'react'
import { useChatStore } from '../stores/chatStore'
import { MessageBubble } from './MessageBubble'

export function MessageList() {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Lê da store o ID ativo e o dicionário de chats
  const activeChatId = useChatStore((state) => state.activeChatId)
  const chats = useChatStore((state) => state.chats)

  // Obtém as mensagens da conversa ativa (ou array vazio se não houver chat ativo)
  const messages = activeChatId ? (chats[activeChatId]?.messages ?? []) : []

  // Rola automaticamente para o final sempre que a quantidade de mensagens ou
  // o chat ativo mudar. Usamos messages.length para evitar re-render desnecessário
  // causado pela referência de array sendo recriada a cada render.
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    container.scrollTop = container.scrollHeight
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, activeChatId])

  return (
    <section
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-3 pb-24 pt-3"
      aria-live="polite"
      aria-label="Histórico de mensagens"
    >
      {/* Nenhuma conversa selecionada: orienta o usuário a criar ou selecionar uma */}
      {activeChatId === null && (
        <div className="flex h-full items-center justify-center text-center text-sm text-stone-500">
          Nenhuma conversa selecionada. Crie uma nova conversa ou selecione
          uma na barra lateral para começar.
        </div>
      )}

      {/* Conversa ativa mas sem mensagens ainda */}
      {activeChatId !== null && messages.length === 0 && (
        <div className="flex h-full items-center justify-center text-center text-sm text-stone-600">
          Nenhuma mensagem ainda. Envie a primeira!
        </div>
      )}

      {/* Lista de mensagens quando há conteúdo */}
      {messages.length > 0 && (
        <div className="space-y-3">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      )}
    </section>
  )
}
