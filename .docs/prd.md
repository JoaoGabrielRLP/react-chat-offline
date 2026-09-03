# PRD: Chat offline

## 1. Visão geral

Construir uma janela única de chat offline em React, na qual a pessoa possa enviar mensagens de texto em dois papéis: usuário ou robô. O papel selecionado será definido por um toggle no card de envio e determinará o lado em que a mensagem aparece no histórico.

O projeto será executado inteiramente no navegador, sem backend, autenticação ou persistência de dados.

## 2. Objetivo do MVP

Permitir que a pessoa:

- visualize uma mensagem inicial de boas-vindas;
- escreva uma mensagem de texto;
- alterne entre os modos usuário e robô;
- envie a mensagem no papel selecionado;
- identifique visualmente o papel pelo lado da mensagem no histórico;
- continue usando o chat em telas pequenas e grandes.

## 3. Decisões confirmadas

- O modo inicial do toggle é **usuário**.
- As mensagens contêm apenas texto.
- O papel da mensagem será indicado somente pelo lado no histórico.
- O estado vazio do histórico não será utilizado: o chat começa com a mensagem `O que vamos fazer hoje?`.
- O campo de texto usa o placeholder `Pergunte qualquer coisa`.
- O histórico existe apenas em estado React e não será persistido.
- O escopo é somente o MVP.
- O projeto já possui Vite, React, TypeScript e Tailwind configurados.

## 4. Escopo funcional

### 4.1 Histórico de mensagens

- Exibir a mensagem inicial `O que vamos fazer hoje?` no lado esquerdo, representando o robô.
- Exibir novas mensagens do usuário no lado direito.
- Exibir novas mensagens do robô no lado esquerdo.
- Manter as mensagens na ordem em que foram enviadas.
- Permitir rolagem quando o conteúdo exceder a altura disponível da janela.
- Não recuperar mensagens após recarregar a página.

### 4.2 Composição e envio

- Exibir um campo de texto para digitação.
- Usar `Pergunte qualquer coisa` como placeholder.
- Permitir que o campo ocupe mais de uma linha quando o texto crescer.
- Exibir um botão de enviar no lado direito do card.
- Manter o botão desabilitado quando o texto estiver vazio ou contiver apenas espaços.
- Ao enviar, remover espaços desnecessários apenas da validação; preservar o texto digitado que será exibido.
- Limpar o campo após um envio válido.
- Enviar pelo botão e pela tecla `Enter`, desde que o comportamento não impeça a digitação de múltiplas linhas. A combinação `Shift + Enter` deve inserir uma quebra de linha.

### 4.3 Seleção de papel

- Exibir um toggle no lado esquerdo do card de composição.
- No estado inicial, o toggle representa o usuário.
- Quando ativado, o toggle representa o robô.
- Aplicar uma borda roxa ao card enquanto o modo robô estiver selecionado.
- O toggle deve possuir texto ou rótulo acessível que permita compreender o papel ativo, mesmo quando a indicação visual estiver disponível.
- A troca de modo deve afetar somente as próximas mensagens; mensagens já enviadas não mudam de lado.

## 5. Escopo visual e responsivo

- Usar fundo marrom claro em toda a tela.
- Centralizar o conteúdo em telas maiores.
- Limitar a largura do chat a `max-width: 2xl`.
- Manter histórico e card de composição dentro da mesma largura máxima.
- Fixar o card de composição visualmente na região inferior da janela durante o uso.
- Usar fundo branco no card de composição.
- Permitir que a altura do card acompanhe o crescimento do campo de texto.
- Usar espaçamento suficiente para que mensagens, controles e bordas não se sobreponham em telas estreitas.
- Diferenciar visualmente mensagens dos dois papéis também por alinhamento, sem depender somente de cor.
- Garantir estados visíveis de foco, hover, desabilitado e interação do toggle.

## 6. Requisitos não funcionais

- Implementar com React e TypeScript.
- Usar componentes em `src/components`.
- Usar `type` em vez de `interface` para os tipos criados.
- Manter os tipos em `src/types`.
- Controlar o histórico com state React, sem `localStorage`, banco ou API.
- Evitar dependências adicionais, pois o stack necessário já está configurado.
- O layout deve funcionar em dispositivos móveis e desktop.
- Controles devem ser operáveis por teclado e ter nomes acessíveis.
- A implementação deve passar por TypeScript/build e lint do projeto.

## 7. Modelo de dados sugerido

Criar um tipo de mensagem em `src/types`, por exemplo:

```ts
type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};
```

O estado inicial do histórico deve conter uma mensagem com texto `O que vamos fazer hoje?` e `sender: 'bot'`. O identificador pode ser gerado no momento da criação da mensagem, sem necessidade de persistência.

## 8. Componentes sugeridos

A divisão abaixo é uma orientação de implementação, mantendo cada componente com uma responsabilidade clara:

- `ChatApp` ou `App`: coordena o estado do histórico, o papel ativo e o texto do campo.
- `ChatHistory`: renderiza a lista de mensagens e controla a área rolável.
- `ChatMessage`: renderiza uma mensagem e aplica alinhamento conforme o remetente.
- `MessageComposer`: renderiza o campo, o toggle e o botão de envio.
- `RoleToggle`: encapsula o controle de seleção entre usuário e robô.

Os nomes podem ser ajustados caso a estrutura existente use outra convenção, mas a separação entre histórico, mensagem e composição deve ser preservada.

## 9. Fluxos principais

### Fluxo A: enviar como usuário

1. A aplicação inicia com o modo usuário selecionado.
2. A pessoa digita uma mensagem.
3. O botão de enviar fica habilitado quando houver conteúdo válido.
4. A pessoa envia pelo botão ou por `Enter`.
5. Uma mensagem com `sender: 'user'` é adicionada ao final do histórico e aparece à direita.
6. O campo é limpo e permanece pronto para uma nova mensagem.

### Fluxo B: enviar como robô

1. A pessoa ativa o toggle do robô.
2. O card de composição recebe a borda roxa.
3. A pessoa digita e envia uma mensagem.
4. Uma mensagem com `sender: 'bot'` é adicionada ao final do histórico e aparece à esquerda.
5. O campo é limpo; o modo selecionado permanece ativo até nova troca.

### Fluxo C: mensagem inválida

1. A pessoa deixa o campo vazio ou digita apenas espaços.
2. O botão permanece desabilitado.
3. Uma tentativa de envio não adiciona item ao histórico.

## 10. Critérios de aceite

- Ao abrir a aplicação, o fundo marrom claro e a janela de chat centralizada são exibidos.
- O histórico mostra `O que vamos fazer hoje?` alinhado à esquerda.
- O card branco de composição permanece na parte inferior da janela.
- O placeholder do campo é exatamente `Pergunte qualquer coisa`.
- O modo inicial é usuário e uma mensagem enviada nesse modo aparece à direita.
- Ao ativar o modo robô, o card recebe borda roxa e a mensagem enviada aparece à esquerda.
- O botão de enviar não pode ser acionado com campo vazio ou somente com espaços.
- O envio limpa o campo e preserva a mensagem no histórico até a página ser recarregada.
- `Enter` envia e `Shift + Enter` cria uma quebra de linha.
- Mensagens acumuladas podem ser roladas sem esconder os controles de composição.
- O layout não apresenta sobreposição ou overflow horizontal em viewport móvel.
- A aplicação passa em `npm run build` e `npm run lint`.

## 11. Fora do escopo do MVP

- Persistência em `localStorage`, IndexedDB ou servidor.
- Respostas automáticas do robô.
- Integração com inteligência artificial ou qualquer API externa.
- Login, múltiplos usuários ou salas de conversa.
- Data, horário, avatar ou metadados nas mensagens.
- Edição, exclusão, reação ou resposta a mensagens.
- Anexos, imagens, áudio e markdown.
- Tema escuro e personalização visual.

## 12. Tarefas de implementação em ordem progressiva

### 1. Confirmar a base do projeto [x]

- Inspecionar `src/App.tsx`, `src/App.css` e `src/index.css`.
- Confirmar o ponto de entrada atual e preservar a configuração existente do Vite/Tailwind.
- Remover ou substituir o conteúdo demonstrativo do template somente nos arquivos necessários.

**Concluído quando:** a aplicação ainda inicia com `npm run dev` e a base está pronta para receber a tela de chat.

Status: concluído.

### 2. Criar os tipos do domínio [x]

- Criar `src/types` caso ainda não exista.
- Adicionar o tipo `ChatMessage` com `id`, `text` e `sender`.
- Usar a união literal `'user' | 'bot'` para representar o papel.

**Concluído quando:** o domínio das mensagens está tipado e pode ser importado pelos componentes.

### 3. Montar a estrutura visual principal [x]

- Criar a área de página com fundo marrom claro.
- Criar o container central com largura máxima `2xl` e altura adequada à viewport.
- Reservar uma área rolável para o histórico e uma área inferior para o compositor.

**Concluído quando:** a tela tem a composição espacial do chat, ainda que sem comportamento completo.

### 4. Implementar a mensagem e o histórico [x]

- Criar `ChatMessage` para alinhar mensagens do robô à esquerda e do usuário à direita.
- Criar `ChatHistory` para renderizar uma lista de mensagens.
- Inicializar o state com `O que vamos fazer hoje?` como mensagem do robô.
- Adicionar rolagem ao histórico quando necessário.

**Concluído quando:** a mensagem inicial aparece corretamente e a lista consegue renderizar mensagens de ambos os papéis.

### 5. Implementar o toggle de papel [x]

- Criar `RoleToggle` como controle acessível e controlado pelo componente pai.
- Iniciar o papel ativo como usuário.
- Permitir alternância entre usuário e robô.
- Expor claramente o papel ativo para teclado e tecnologias assistivas.

**Concluído quando:** o papel ativo pode ser alterado sem modificar mensagens existentes.

### 6. Implementar o compositor de mensagens [x]

- Criar `MessageComposer` com campo controlado, toggle e botão de enviar.
- Usar o placeholder definido.
- Desabilitar o envio sem texto válido.
- Aplicar a borda roxa ao card no modo robô.
- Fazer o campo crescer conforme o conteúdo, respeitando limites razoáveis de altura.

**Concluído quando:** todos os controles estão visíveis, acessíveis e refletem o estado atual.

### 7. Conectar o envio ao estado do chat [x]

- Implementar a função de envio no componente coordenador.
- Validar texto vazio ou composto somente por espaços.
- Criar e adicionar a mensagem ao final do histórico com o papel ativo.
- Limpar o campo após envio válido.
- Implementar `Enter` para enviar e `Shift + Enter` para quebra de linha.

**Concluído quando:** os fluxos de usuário e robô funcionam pelo botão e pelo teclado.

### 8. Refinar responsividade e estados de interação [x]

- Ajustar espaçamentos, largura, rolagem e altura em telas móveis.
- Revisar foco, hover e estado desabilitado do botão.
- Garantir que o texto longo não provoque overflow horizontal.
- Confirmar que o card continua acessível na parte inferior durante a rolagem do histórico.

**Concluído quando:** a interface permanece utilizável em desktop e mobile sem sobreposição.

### 9. Validar o MVP [x]

- Executar `npm run lint`.
- Executar `npm run build`.
- Testar manualmente os fluxos de envio como usuário e robô.
- Testar campo vazio, espaços, `Enter`, `Shift + Enter`, mensagem longa e histórico extenso.
- Corrigir apenas problemas relacionados aos critérios de aceite do MVP.

**Concluído quando:** os critérios de aceite são verificáveis e os comandos de validação passam.

## 13. Entrega esperada

Uma única tela funcional de chat offline, responsiva, sem backend e sem persistência, com histórico em memória, mensagem inicial, alternância entre usuário e robô e envio de mensagens de texto pelos controles definidos.
