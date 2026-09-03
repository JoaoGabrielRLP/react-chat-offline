import { useEffect, useRef, type KeyboardEvent } from 'react'
import type { Sender } from '../types/message'
import { SenderToggle } from './SenderToggle'

type ChatInputProps = {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  sender: Sender
  onToggleSender: () => void
}

export function ChatInput({ value, onChange, onSend, sender, onToggleSender }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const canSend = value.trim().length > 0

  useEffect(() => {
    if (value === '' && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [value])

  const handleChange = (nextValue: string) => {
    onChange(nextValue)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSend()
    }
  }

  return (
    <div
      className={`fixed bottom-4 left-1/2 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 rounded-xl border bg-white p-3 shadow-lg transition-colors sm:bottom-6 ${
        sender === 'robot' ? 'border-2 border-purple-500' : 'border-stone-200'
      }`}
    >
      <div className="flex items-end gap-3">
        <SenderToggle sender={sender} onToggle={onToggleSender} />

        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma mensagem..."
          className="max-h-24 min-h-11 flex-1 resize-none overflow-y-auto rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 placeholder:text-stone-500 focus:border-stone-300 focus:outline-none"
        />

        <button
          type="button"
          onClick={onSend}
          className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!canSend}
        >
          Enviar
        </button>
      </div>
    </div>
  )
}