export interface ChatManager {
  chat(msg: string): void;
  listenBroadCast(): void;
}