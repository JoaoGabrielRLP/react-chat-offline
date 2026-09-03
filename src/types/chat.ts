export type Sender = 'user' | 'bot'

export type ChatMessage = {
  id: string
  text: string
  sender: Sender
}
