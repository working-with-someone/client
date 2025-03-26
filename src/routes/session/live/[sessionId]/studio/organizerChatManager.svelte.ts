import type { ChatLog } from '../../../../../@types/chat';
import { Socket } from 'socket.io-client';
import WS_CHANNELS from '$lib/constants/channels';
import type { ChatManager } from '../chatManager';

export class OrganizerChatManager implements ChatManager {
	chatLogs = $state<Array<ChatLog>>([]);
	socket: Socket;
	constructor(socket: Socket) {
		this.socket = socket;

		this.listenBroadCast();
	}

	chat(msg: string) {
		this.socket.emit(WS_CHANNELS.chat.broadCastSend, msg, (resp) => {
			console.log(resp);
		});
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
