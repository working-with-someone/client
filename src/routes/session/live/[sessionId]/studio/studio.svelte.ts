import wwsfetch from '$lib/utils/wwsfetch';
import type { Prisma } from '@prisma/client';
import { error } from '@sveltejs/kit';
import { liveSessionStatus } from '../../../../../enums/session';
import { timeDifference } from '$lib/utils/time';
import { io, type Socket } from 'socket.io-client';
import { PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN } from '$env/static/public';
import { OrganizerChatManager } from './organizerChatManager.svelte';
import WS_CHANNELS from '$lib/constants/channels';

export class Studio {
	liveSession: LiveSession;
	chatManager: OrganizerChatManager;
	private mediaRecorder?: MediaRecorder;
	private socket: Socket;

	constructor(liveSession: Prisma.live_sessionGetPayload<true>) {
		this.liveSession = new LiveSession(liveSession);

		this.socket = io(
			PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN + `/livesession/` + this.liveSession.id,
			{
				withCredentials: true
			}
		);

		this.chatManager = new OrganizerChatManager(this.socket);
	}

	async open() {
		await this.liveSession.changeStatus(liveSessionStatus.opened);
	}

	async break() {
		await this.liveSession.changeStatus(liveSessionStatus.breaked);
	}

	async close() {
		await this.liveSession.changeStatus(liveSessionStatus.closed);
	}

	publish(mediaStream: MediaStream) {
		// open 상태가 아니라면 publish가 불가능하다.
		if (!this.liveSession.isOpened) {
			throw new Error('live session is not opened');
		}

		this.mediaRecorder = new MediaRecorder(mediaStream, {
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

					this.socket.emit(WS_CHANNELS.stream.push, buffer, (resp) => {
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

export class LiveSession implements Prisma.live_sessionGetPayload<true> {
	id: string;
	title: string;
	description: string | null;
	thumbnail_uri: string;
	category: string;
	status = $state<number>() as number;
	stream_key: string;
	access_level: number;
	created_at: Date;
	updated_at: Date;
	started_at: Date | null;
	organizer_id: number;

	constructor(liveSession: Prisma.live_sessionGetPayload<true>) {
		this.id = liveSession.id;
		this.title = liveSession.title;
		this.description = liveSession.description;
		this.thumbnail_uri = liveSession.thumbnail_uri;
		this.category = liveSession.category;
		this.status = liveSession.status;
		this.stream_key = liveSession.stream_key;
		this.access_level = liveSession.access_level;
		this.created_at = new Date(liveSession.created_at);
		this.updated_at = new Date(liveSession.updated_at);

		this.started_at = liveSession.started_at ? new Date(liveSession.started_at) : null;

		this.organizer_id = liveSession.organizer_id;
	}

	get isReady() {
		return this.status === liveSessionStatus.ready;
	}

	get isOpened() {
		return this.status === liveSessionStatus.opened;
	}

	get isBreaked() {
		return this.status === liveSessionStatus.breaked;
	}

	get isClosed() {
		return this.status === liveSessionStatus.closed;
	}

	async fetch() {
		const res = await wwsfetch(`/sessions/live/${this.id}`, {});

		if (res.status != 200) {
			error(res.status);
		}

		const liveSession = await res.json();

		Object.assign(this, liveSession);
	}

	async changeStatus(status: liveSessionStatus) {
		const res = await wwsfetch(`/sessions/live/${this.id}/status`, {
			method: 'PUT',
			body: new URLSearchParams({
				status: status.toString()
			})
		});

		// failed
		if (!res.ok) {
			throw new Error('can not change status of session');
		}

		await this.fetch();
	}
}
