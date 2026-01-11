import { ClientChatManager } from '../../../routes/session/live/[sessionId]/clientChatManager.svelte';
import { io, type Socket } from 'socket.io-client';
import { PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN } from '$env/static/public';
import WS_CHANNELS from '$lib/constants/channels';
import { LiveSession } from '../../../routes/session/live/[sessionId]/LiveSession.svelte';
import { Role } from '../../../enums/session';
import { live_session_status } from '@prisma/client';
import { timeDifference } from '$lib/utils/time';

export class Viewer {
	liveSession: LiveSession;
	chatManager: ClientChatManager;
	private socket: Socket;

	constructor(liveSession: LiveSession) {
		this.liveSession = liveSession;

		this.socket = io(
			PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN + `/livesession/` + this.liveSession.id,
			{
				query: {
					role: Role.participant
				},
				withCredentials: true
			}
		);

		this.chatManager = new ClientChatManager(this.socket);

		this.socket.on(WS_CHANNELS.transition.broadCast.break, () => {
			this.liveSession.fetch();
		});

		this.socket.on(WS_CHANNELS.transition.broadCast.open, () => {
			this.liveSession.fetch();
		});
	}
}
