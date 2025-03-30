import type { ChatLog } from '../../../../types/chat';
import { io, Socket } from 'socket.io-client';
import { PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN } from '$env/static/public';
import WS_CHANNELS from '$lib/constants/channels';
import type { ChatManager } from './chatManager';

export class ClientChatManager implements ChatManager {
	chatLogs = $state<Array<ChatLog>>([]);
	socket: Socket;

	constructor(liveSessionId: string) {
		this.socket = io(PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN + `/livesession/` + liveSessionId, {
			withCredentials: true
		});

		this.listenBroadCast();
	}

	chat(msg: string) {
		this.socket.emit(WS_CHANNELS.chat.broadCastSend, msg);
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
