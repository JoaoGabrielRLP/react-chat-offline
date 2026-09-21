import type { Message, Sender as MessageSender } from './message'

/**
 * Identificador único de uma conversa (UUID).
 */
export type ChatId = string

/**
 * Representa uma sessão de chat individual com seu histórico e data de criação.
 */
export type ChatSession = {
  id: ChatId
  messages: Message[]
  createdAt: number
}

/**
 * Estado básico gerenciado pela store de conversas.
 */
export type ChatState = {
  // Dicionário de sessões indexadas pelo id para acesso rápido O(1)
  chats: Record<ChatId, ChatSession>
  // Lista ordenada de IDs das conversas (da mais recente para a mais antiga)
  chatOrder: ChatId[]
  // ID da conversa atualmente aberta, ou null quando nenhuma está selecionada
  activeChatId: ChatId | null
}

/**
 * Ações disponíveis para manipular o estado das conversas.
 */
export type ChatActions = {
  // Cria uma nova conversa, adiciona na lista e a define como ativa, retornando seu ID
  createChat: () => string
  // Seleciona uma conversa pelo ID para ser a conversa ativa
  selectChat: (id: ChatId) => void
  // Adiciona uma mensagem ao histórico da conversa atualmente ativa
  addMessage: (text: string, sender: MessageSender) => void
  // Exclui uma conversa pelo ID
  deleteChat: (id: ChatId) => void
}

/**
 * Tipo consolidado da Store Zustand (Estado + Ações).
 */
export type ChatStore = ChatState & ChatActions

// Tipos utilitários para manter compatibilidade com arquivos legados
export type Sender = MessageSender | 'bot'
export type ChatMessage = {
  id: string
  text: string
  sender: Sender
}
