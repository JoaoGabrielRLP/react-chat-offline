import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatSession, ChatStore } from '../types/chat'
import type { Message, Sender } from '../types/message'

/**
 * Store global para gerenciar múltiplas conversas com Zustand.
 *
 * Principais responsabilidades:
 * 1. Armazenar o dicionário de conversas (chats) e a lista ordenada de seus IDs (chatOrder).
 * 2. Guardar o ID da conversa atualmente aberta (activeChatId).
 * 3. Persistir o histórico de conversas no localStorage através do middleware 'persist'.
 * 4. Prover as ações createChat, selectChat e addMessage de forma simples e previsível.
 */
export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // Estado inicial padrão
      chats: {},
      chatOrder: [],
      activeChatId: null,

      /**
       * Cria uma nova sessão de conversa.
       * - Gera um identificador único (UUID);
       * - Registra a sessão vazia com data de criação;
       * - Verifica se o ID já existe na lista de conversas antes de adicionar;
       * - Coloca o ID no início da lista (ordem cronológica da mais recente para a mais antiga);
       * - Define a conversa criada imediatamente como a conversa ativa;
       * - Retorna o ID gerado para possíveis usos imediatos.
       */
      createChat: () => {
        const id = crypto.randomUUID()

        const newSession: ChatSession = {
          id,
          messages: [],
          createdAt: Date.now(),
        }

        set((state) => {
          // Verifica se o ID já existe na lista de conversas (chatOrder) antes de adicionar
          const idExists = state.chatOrder.includes(id)

          return {
            chats: {
              ...state.chats,
              [id]: newSession,
            },
            // Adiciona o ID no início da lista apenas se ele não existir previamente
            chatOrder: idExists ? state.chatOrder : [id, ...state.chatOrder],
            // Ativa automaticamente o novo chat criado
            activeChatId: id,
          }
        })

        return id
      },

      /**
       * Seleciona uma conversa pelo seu ID para ser a conversa ativa.
       * Verifica se o ID existe na lista antes de ativá-lo.
       * @param id Identificador da conversa
       */
      selectChat: (id) => {
        const { chatOrder, chats } = get()

        // Verifica se o ID existe na lista de conversas antes de atualizar o chat ativo
        if (!chatOrder.includes(id) && !chats[id]) {
          return
        }

        set({ activeChatId: id })
      },

      /**
       * Adiciona uma mensagem ao histórico da conversa atualmente ativa.
       * Caso nenhuma conversa esteja ativa, a ação não realiza nenhuma alteração.
       * @param text Conteúdo textual da mensagem
       * @param sender Quem enviou a mensagem ('user' ou 'robot')
       */
      addMessage: (text, sender: Sender) => {
        const { activeChatId, chats } = get()

        // Validação de segurança: apenas insere se houver chat ativo existente
        if (!activeChatId || !chats[activeChatId]) {
          return
        }

        const newMessage: Message = {
          id: crypto.randomUUID(),
          text,
          sender,
        }

        set((state) => {
          const currentChat = state.chats[activeChatId]
          if (!currentChat) {
            return state
          }

          return {
            chats: {
              ...state.chats,
              [activeChatId]: {
                ...currentChat,
                messages: [...currentChat.messages, newMessage],
              },
            },
          }
        })
      },
    }),
    {
      // Chave utilizada para persistência no localStorage do navegador
      name: 'chat-storage',

      // Define quais propriedades são salvas no armazenamento local.
      // Conforme os requisitos RF-03 e RF-05, salvamos apenas 'chats' e 'chatOrder'.
      // 'activeChatId' NÃO é salvo, garantindo que ao atualizar a página (F5)
      // a aplicação sempre inicialize em empty state (activeChatId: null).
      partialize: (state) => ({
        chats: state.chats,
        chatOrder: state.chatOrder,
      }),
    }
  )
)

