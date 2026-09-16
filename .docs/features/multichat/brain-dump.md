## Feature: Single-chat to multi-chat

Preciso transformar o chat de conversa única para múltiplas conversas.

### Aspectos técnicos
Vamos usar a biblioteca Zustand para gerenciamento de estado.

- Store na biblioteca Zustand armazenando 2 informações
    - Histórico de cada conversa individualmente (com todas as informações do Type Message).
    - Qual chat está ativo (com um ID).

A store do Zustand deve ficar no src/stores

### Fluxo de informações
Ao abrir o site, não estará em nenhuma conversa (empty state).

### Aspectos visuais

No sidebar teremos a lista das conversas e um botão para criar uma nova conversa.

A identificação do chat do sidebar é exibido o próprio ID dele.

O sidebar ficará do lado esquerdo, sendo retrátil no celular (botão hamburger no canto superior esquerdo).

O input fica desabilitado quando não há conversas ativas (opacidade 50% e botões não funcionam).


