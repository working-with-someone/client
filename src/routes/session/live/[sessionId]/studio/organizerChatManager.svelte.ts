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
		this.socket.emit(WS_CHANNELS.chat, msg);
	}

	listenBroadCast() {
		if (this.socket.hasListeners(WS_CHANNELS.broadcast)) {
			this.socket.removeListener(WS_CHANNELS.broadcast);
		}

		this.socket.on(WS_CHANNELS.broadcast, (data) => {
			this.chatLogs.push(data);
		});
	}
}
