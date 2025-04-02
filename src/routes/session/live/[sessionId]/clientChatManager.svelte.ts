import type { ChatLog } from '../../../../types/chat';
import type { Socket } from 'socket.io-client';
import WS_CHANNELS from '$lib/constants/channels';
import type { ChatManager } from './chatManager';

export class ClientChatManager implements ChatManager {
	chatLogs = $state<Array<ChatLog>>([]);
	socket: Socket;

	constructor(socket: Socket) {
		this.socket = socket;

		this.listenBroadCast();
	}

	chat(msg: string) {
		this.socket.emit(WS_CHANNELS.chat.broadCastSend, msg, () => { });
	}

	listenBroadCast() {
		if (this.socket.hasListeners(WS_CHANNELS.chat.broadCastRecive)) {
			this.socket.removeListener(WS_CHANNELS.chat.broadCastRecive);
		}

		this.socket.on(WS_CHANNELS.chat.broadCastRecive, (data) => {
			this.chatLogs.push(data);
		});
	}
}
