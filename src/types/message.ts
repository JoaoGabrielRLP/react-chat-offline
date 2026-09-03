export type Sender = 'user' | 'robot'

export type Message = {
  id: string
  text: string
  sender: Sender
}
