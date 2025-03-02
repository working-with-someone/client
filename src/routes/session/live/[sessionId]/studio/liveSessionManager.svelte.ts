import { PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN } from '$env/static/public';
import wwsfetch from '$lib/utils/wwsfetch';
import { liveSessionStatus, type accessLevel } from '../../../../../enums/session';
import io, { Socket } from 'socket.io-client';
import httpStatusCodes from 'http-status-codes';
import { timeDifference } from '$lib/utils/time';
import { error } from '@sveltejs/kit';

export class SessionManager {
	id: string;
	title: string = $state('');
	description: string = $state('');
	thumbnail_url: string = $state('');
	created_at: Date;
	updated_at: Date = $state(new Date());
	access_level?: accessLevel = $state<accessLevel>();
	category: string = $state('');

	constructor(session) {
		this.id = session.id;
		this.title = session.title;
		this.description = session.description;
		this.thumbnail_url = session.thumbnail_url;

		this.created_at = new Date(session.created_at);
		this.updated_at = new Date(session.updated_at);

		this.access_level = session.access_level;
		this.category = session.category;
	}
}

export class LiveSessionManager extends SessionManager {
	private status?: liveSessionStatus = $state<liveSessionStatus>();
	private started_at;
	private socket: Socket;
	private mediaRecorder?: MediaRecorder;

	constructor(liveSession) {
		super(liveSession);
		this.status = liveSession.status;
		this.started_at = new Date(liveSession.started_at);
		this.socket = io(PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN + `/livesession/` + this.id, {
			withCredentials: true
		});
	}

	async sync() {
		const res = await wwsfetch(`/sessions/live/${this.id}`, {});

		if (res.status != 200) {
			error(res.status);
		}

		const session = await res.json();

		this.status = session.status;
		this.started_at = session.started_at;
	}

	async fetch() {}

	// ready, break 상태에서만 open이 가능하다.
	async open() {
		if (this.isClosed || this.isOpened) throw new Error('can not open session');

		await this.changeStatus(liveSessionStatus.opened);
	}

	async break() {
		// open 상태에서만 break가 가능하다.
		if (!this.isOpened) throw new Error('session does not opened');
		await this.changeStatus(liveSessionStatus.opened);
	}

	async close() {
		// ready, open, break 상태에서만 close가 가능하다.
		if (this.isClosed) throw new Error('can not exit session');

		await this.changeStatus(liveSessionStatus.closed);

		this.unpublish();
	}

	unpublish() {
		if (this.mediaRecorder?.state === 'recording') {
			this.mediaRecorder.stop();
		}
	}

	publish(mediaStream: MediaStream) {
		// open 상태가 아니라면 publish가 불가능하다.
		if (!this.isOpened) {
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

					this.socket.emit('stream:push', buffer, (resp) => {
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

	private async changeStatus(status: liveSessionStatus) {
		const res = await wwsfetch(`/sessions/live/${this.id}/status`, {
			method: 'PUT',
			body: new URLSearchParams({
				status: status.toString()
			})
		});

		// failed
		if (res.status !== httpStatusCodes.OK) {
			throw new Error('can not change status of session');
		}

		this.sync();
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

	get elapsedTime() {
		const { hours, minutes, seconds } = timeDifference(Date.now(), new Date(this.started_at));

		return { hours, minutes, seconds };
	}
}
