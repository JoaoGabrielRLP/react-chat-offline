import type { KeyboardEvent } from 'react'
import type { Sender } from '../types/chat'
import { RoleToggle } from './RoleToggle'

type MessageComposerProps = {
  value: string
  role: Sender
  onChange: (value: string) => void
  onRoleChange: (role: Sender) => void
  onSubmit: () => void
}

export function MessageComposer({ value, role, onChange, onRoleChange, onSubmit }: MessageComposerProps) {
  const isDisabled = value.trim().length === 0

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (!isDisabled) {
        onSubmit()
      }
    }
  }

  return (
    <div className={`message-composer ${role === 'bot' ? 'bot-mode' : ''}`}>
      <div className="composer-row">
        <RoleToggle value={role} onChange={onRoleChange} />

        <textarea
          aria-label="Escreva sua mensagem"
          className="message-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pergunte qualquer coisa"
          rows={1}
        />

        <button
          type="button"
          className="send-button"
          disabled={isDisabled}
          onClick={onSubmit}
          aria-label="Enviar mensagem"
        >
          Enviar
        </button>
      </div>
    </div>
  )
}
