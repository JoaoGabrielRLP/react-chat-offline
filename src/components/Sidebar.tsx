import { useChatStore } from '../stores/chatStore'

// Props que o componente pai (Chat) passa para controlar o drawer no mobile
type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Lê o estado e as ações da store global
  const chats = useChatStore((state) => state.chats)
  const chatOrder = useChatStore((state) => state.chatOrder)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const createChat = useChatStore((state) => state.createChat)
  const selectChat = useChatStore((state) => state.selectChat)

  // Cria uma nova conversa e fecha o drawer no mobile automaticamente
  const handleCreateChat = () => {
    createChat()
    onClose()
  }

  // Seleciona uma conversa e fecha o drawer no mobile automaticamente
  const handleSelectChat = (id: string) => {
    selectChat(id)
    onClose()
  }

  return (
    <>
      {/*
        Backdrop (fundo escurecido) — aparece apenas no mobile quando o drawer
        está aberto. Clicar nele fecha a sidebar.
      */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/*
        Sidebar em si.
        - No desktop (lg+): posição estática, sempre visível, parte do fluxo normal.
        - No mobile: posição fixa, desliza para dentro/fora com transição CSS.
          O translate-x controla se está visível (-translate-x-full = fora da tela).
      */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-stone-100
          border-r border-stone-300 shadow-2xl transition-transform duration-300
          lg:static lg:translate-x-0 lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Cabeçalho da sidebar com botão de nova conversa */}
        <div className="p-4">
          <button
            type="button"
            onClick={handleCreateChat}
            className="w-full rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            + Nova conversa
          </button>
        </div>

        {/* Lista de conversas existentes */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {chatOrder.length === 0 ? (
            // Mensagem exibida quando ainda não há conversas criadas
            <p className="px-2 py-4 text-center text-xs text-stone-400">
              Nenhuma conversa ainda.
            </p>
          ) : (
            <ul className="space-y-1">
              {chatOrder.map((id) => {
                const chat = chats[id]
                if (!chat) return null

                const isActive = id === activeChatId

                // Exibe os primeiros 8 caracteres do UUID precedidos por '#'
                const shortId = `#${id.slice(0, 8)}`

                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => handleSelectChat(id)}
                      className={`
                        w-full rounded-lg px-3 py-2 text-left text-sm font-mono transition-colors
                        ${
                          isActive
                            ? // Estilo do item ativo: fundo branco, borda e sombra sutil
                              'border border-stone-200 bg-white font-semibold text-stone-950 shadow-sm'
                            : // Estilo padrão: fundo transparente com hover suave
                              'text-stone-700 hover:bg-stone-200'
                        }
                      `}
                    >
                      {shortId}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </nav>
      </aside>
    </>
  )
}

