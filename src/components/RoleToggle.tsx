import type { Sender } from '../types/chat'

type RoleToggleProps = {
  value: Sender
  onChange: (role: Sender) => void
}

const roles: { label: string; value: Sender }[] = [
  { label: 'Usuário', value: 'user' },
  { label: 'Robô', value: 'bot' },
]

export function RoleToggle({ value, onChange }: RoleToggleProps) {
  return (
    <div className="role-toggle" role="radiogroup" aria-label="Selecionar papel da mensagem">
      {roles.map((role) => {
        const isActive = value === role.value

        return (
          <button
            key={role.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`role-option ${isActive ? 'active' : ''}`}
            aria-label={`Selecionar ${role.label}`}
            onClick={() => onChange(role.value)}
          >
            {role.label}
          </button>
        )
      })}
    </div>
  )
}
