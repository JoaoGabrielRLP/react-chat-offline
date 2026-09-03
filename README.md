# Chat Offline

> Aplicação de chat em uma única tela, desenvolvida com React, TypeScript e Vite.

O projeto permite enviar mensagens alternando entre dois remetentes: usuário e robô. O histórico é mantido apenas no estado do React, portanto as mensagens são apagadas ao recarregar a página.

## Funcionalidades

- Histórico de mensagens em ordem cronológica.
- Mensagens do usuário alinhadas à direita e mensagens do robô à esquerda.
- Alternância de remetente por botão com ícone.
- Destaque visual com borda roxa quando o robô está selecionado.
- Estado vazio para um histórico sem mensagens.
- Rolagem automática para a mensagem mais recente.
- Campo de texto multilinha com ajuste automático de altura.
- `Enter` envia a mensagem e `Shift + Enter` insere uma quebra de linha.
- Botão de envio desabilitado quando não há texto válido.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Oxlint

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Para validar o projeto:

```bash
npm run lint
npm run build
```

## Estrutura principal

```text
src/
├── components/
│   ├── Chat.tsx             # Estado principal e composição do layout
│   ├── ChatInput.tsx        # Campo de mensagem e botão de envio
│   ├── MessageBubble.tsx    # Bolha individual de mensagem
│   ├── MessageList.tsx      # Histórico e rolagem automática
│   └── SenderToggle.tsx     # Alternância entre usuário e robô
├── types/
│   └── message.ts           # Tipos Sender e Message
├── App.tsx
├── App.css
└── index.css
```

## Modelo de mensagem

Cada mensagem possui um identificador, o texto e o remetente:

```ts
type Message = {
  id: string
  text: string
  sender: 'user' | 'robot'
}
```

Não há persistência, autenticação, backend, anexos ou formatação rica. O objetivo é manter uma experiência de chat local simples e responsiva.
