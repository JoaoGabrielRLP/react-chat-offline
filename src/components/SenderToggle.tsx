import type { Sender } from '../types/message'

type SenderToggleProps = {
  sender: Sender
  onToggle: () => void
}

export function SenderToggle({ sender, onToggle }: SenderToggleProps) {
  const isUser = sender === 'user'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Alternar remetente para ${isUser ? 'robô' : 'usuário'}`}
      className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-3 py-2 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-200"
    >
      <span aria-hidden="true">{isUser ? '👤' : '🤖'}</span>
      <span>{isUser ? 'Usuário' : 'Robô'}</span>
    </button>
  )
}
