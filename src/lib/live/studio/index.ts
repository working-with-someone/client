import { LiveSession } from '../../../routes/session/live/[sessionId]/LiveSession.svelte';
import { timeDifference } from '$lib/utils/time';
import { io, type Socket } from 'socket.io-client';
import { PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN } from '$env/static/public';
import { OrganizerChatManager } from '../../../routes/session/live/[sessionId]/studio/organizerChatManager.svelte';
import WS_CHANNELS from '$lib/constants/channels';
import { Role } from '../../../enums/session';
import httpStatusCodes from 'http-status-codes';
import { wwsError } from '$lib/error/wwsError';
import type { ResponseCb, SocketResponse } from '../../../types/response';
import { live_session_status } from '@prisma/client';
import { MediaController } from '../../../routes/session/live/[sessionId]/studio/mediaController.svelte';

export class Studio {
	liveSession: LiveSession;
	chatManager: OrganizerChatManager;
	private mediaRecorder?: MediaRecorder;
	private socket: Socket;
	mediaController: MediaController;

	constructor(liveSession: LiveSession) {
		this.liveSession = liveSession;
		this.mediaController = new MediaController();
		this.socket = io(
			PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN + `/livesession/` + this.liveSession.id,
			{
				query: {
					role: Role.organizer
				},
				withCredentials: true
			}
		);

		this.socket.on(WS_CHANNELS.transition.broadCast.break, () => {
			this.liveSession.status = live_session_status.BREAKED;
		});

		this.socket.on(WS_CHANNELS.transition.broadCast.close, () => {
			this.liveSession.status = live_session_status.CLOSED;
		});

		this.socket.on(WS_CHANNELS.transition.broadCast.open, () => {
			this.liveSession.status = live_session_status.OPENED;
		});

		this.chatManager = new OrganizerChatManager(this.socket);
	}

	async open() {
		this.socket.emit(WS_CHANNELS.transition.open, (res: SocketResponse) => {
			if (res.status != httpStatusCodes.OK) {
				throw new wwsError(res.status, res.message!);
			}
		});
	}

	async break() {
		this.socket.emit(WS_CHANNELS.transition.break, (res: SocketResponse) => {
			if (res.status != httpStatusCodes.OK) {
				throw new wwsError(res.status, res.message!);
			}
		});
	}

	async close() {
		this.socket.emit(WS_CHANNELS.transition.close, (res: SocketResponse) => {
			if (res.status != httpStatusCodes.OK) {
				throw new wwsError(res.status, res.message!);
			}
		});
	}

	get isReady() {
		return this.liveSession.status === live_session_status.READY;
	}

	get isOpened() {
		return this.liveSession.status === live_session_status.OPENED;
	}

	get isBreaked() {
		return this.liveSession.status === live_session_status.BREAKED;
	}

	get isClosed() {
		return this.liveSession.status === live_session_status.CLOSED;
	}

	publish() {
		console.log(this.mediaController.mediaStream);
		if (!this.mediaController.mediaStream) {
			throw new Error('Media stream is not available');
		}

		this.mediaRecorder = new MediaRecorder(this.mediaController.mediaStream, {
			mimeType: 'video/webm; codecs=vp8,opus'
		});

		// event의 data attribute에 recorded media data가 Blob으로 제공된다.
		this.mediaRecorder.addEventListener('dataavailable', (e) => {
			if (!this.socket.connected) {
				return;
			}

			if (e.data.size > 0) {
				// file이나 raw data buffer
				const reader = new FileReader();

				// file이 성공적으로 read되었을 때 emit되는 load event의 handler
				reader.onload = () => {
					const buffer = reader.result;

					this.socket.emit(WS_CHANNELS.stream.push, buffer, (resp: ResponseCb) => {
						console.log(resp);
					});
				};

				// Blob으로부터 file을 읽는다, 완료되면 reader의 result attribute가 file data의 Array buffer를 포함하게된다.
				reader.readAsArrayBuffer(e.data);
			}
		});

		// 300ms timeslice를 specify해 300ms마다 seperate chunk를 capture한다.
		this.mediaRecorder.start(500);
	}

	unpublish() {
		if (this.mediaRecorder?.state === 'recording') {
			this.mediaRecorder.stop();
		}
	}

	get elapsedTime() {
		const { hours, minutes, seconds } = timeDifference(Date.now(), this.liveSession.started_at!);

		return { hours, minutes, seconds };
	}
}
