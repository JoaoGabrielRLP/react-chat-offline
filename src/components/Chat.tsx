import { useState } from 'react'
import type { Sender } from '../types/message'
import { useChatStore } from '../stores/chatStore'
import { Sidebar } from './Sidebar'
import { ChatInput } from './ChatInput'
import { MessageList } from './MessageList'

export function Chat() {
  // Controla se o drawer da sidebar está aberto no mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Estado local do remetente (usuário ou robô) e do rascunho da mensagem
  const [sender, setSender] = useState<Sender>('user')
  const [draft, setDraft] = useState('')

  // Obtém da store o ID da conversa ativa e a ação de adicionar mensagem
  const activeChatId = useChatStore((state) => state.activeChatId)
  const addMessage = useChatStore((state) => state.addMessage)

  // Envia a mensagem para a conversa ativa na store
  const handleSend = () => {
    if (draft.trim() === '') return
    addMessage(draft, sender)
    setDraft('')
  }

  return (
    /*
      Layout raiz: ocupa a tela inteira e organiza sidebar + área principal
      lado a lado no desktop (lg:flex). No mobile, o Chat ocupa tudo e a
      sidebar aparece como drawer sobreposto.
    */
    <div className="flex h-screen bg-stone-200">

      {/* Sidebar: recebe controle de abertura/fechamento do drawer mobile */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/*
        Área principal: cresce para ocupar o espaço restante ao lado da sidebar
        no desktop. No mobile ocupa a tela inteira.
      */}
      <main className="relative flex flex-1 flex-col overflow-hidden">

        {/*
          Botão hambúrguer — visível apenas no mobile (lg:hidden).
          Abre o drawer da sidebar ao ser clicado.
        */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Abrir menu de conversas"
          className="fixed left-4 top-4 z-30 rounded-lg bg-white p-2 text-stone-700 shadow-md lg:hidden"
        >
          ☰
        </button>

        {/* Container centralizado com largura máxima, igual ao layout original */}
        <div className="mx-auto flex h-full w-full max-w-2xl flex-col px-4 py-6 sm:px-6">
          {/* Lista de mensagens da conversa ativa (ou empty state) */}
          <MessageList />

          {/*
            Input de envio: desabilitado quando não há conversa ativa.
            Passa o remetente e o rascunho como props.
          */}
          <ChatInput
            value={draft}
            onChange={setDraft}
            onSend={handleSend}
            sender={sender}
            onToggleSender={() =>
              setSender((current) => (current === 'user' ? 'robot' : 'user'))
            }
            disabled={activeChatId === null}
          />
        </div>
      </main>
    </div>
  )
}
