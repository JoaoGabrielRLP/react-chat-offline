import { useEffect, useRef, type KeyboardEvent } from 'react'
import type { Sender } from '../types/message'
import { SenderToggle } from './SenderToggle'

type ChatInputProps = {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  sender: Sender
  onToggleSender: () => void
  // Quando true, o card fica com 50% de opacidade e os controles são desabilitados
  disabled?: boolean
}

export function ChatInput({ value, onChange, onSend, sender, onToggleSender, disabled = false }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const canSend = !disabled && value.trim().length > 0
  const isUser = sender === 'user'

  // Reseta a altura do textarea quando o valor é limpo (após envio)
  useEffect(() => {
    if (value === '' && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [value])

  const handleChange = (nextValue: string) => {
    onChange(nextValue)

    // Ajusta a altura do textarea dinamicamente conforme o conteúdo cresce
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }

  // Enter envia; Shift+Enter insere quebra de linha
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (canSend) onSend()
    }
  }

  return (
    /*
      Card fixo no rodapé.
      Quando disabled: opacidade 50% e pointer-events-none bloqueiam toda interação.
      A borda fica roxa quando o remetente é 'robot' (modo robô).
    */
    <div
      className={`
        fixed bottom-8 left-1/2 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2
        rounded-xl border bg-white p-3 shadow-lg transition-colors
        ${disabled ? 'pointer-events-none opacity-50' : ''}
        ${isUser ? 'border-stone-200' : 'border-2 border-purple-500'}
      `}
    >
      <div className="flex items-end gap-3">
        {/* Toggle usuário / robô */}
        <SenderToggle sender={sender} onToggle={onToggleSender} />

        {/* Campo de texto com auto-resize e placeholder contextual */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            disabled
              ? 'Selecione ou crie uma conversa para digitar...'
              : 'Digite uma mensagem...'
          }
          className="max-h-24 min-h-11 min-w-0 flex-1 resize-none overflow-y-auto rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-800 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 disabled:cursor-not-allowed"
        />

        {/* Botão de envio — desabilitado sem texto ou quando o input está bloqueado */}
        <button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </div>
  )
}