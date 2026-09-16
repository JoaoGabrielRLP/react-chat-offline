import type { Sender } from '../types/message'

type SenderToggleProps = {
  sender: Sender
  onToggle: () => void
  // Quando true, o botão fica desabilitado (sem conversa ativa)
  disabled?: boolean
}

export function SenderToggle({ sender, onToggle, disabled = false }: SenderToggleProps) {
  const isUser = sender === 'user'

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-label={`Alternar remetente para ${isUser ? 'robô' : 'usuário'}`}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-stone-700 transition-colors hover:bg-stone-200 disabled:cursor-not-allowed"
    >
      <span aria-hidden="true">{isUser ? '👤' : '🤖'}</span>
    </button>
  )
}
