import { PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN } from '$env/static/public';
import wwsfetch from '$lib/utils/wwsfetch';
import { liveSessionStatus, type accessLevel } from '../../../enums/session';
import io, { Socket } from 'socket.io-client';
import httpStatusCodes from 'http-status-codes';

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
	started_at: Date;
	socket: Socket;

	constructor(liveSession) {
		super(liveSession);
		this.status = liveSession.session_live.status;
		this.started_at = new Date(liveSession.session_live.started_at);
		this.socket = io(PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN + `/livesession/` + this.id, {
			withCredentials: true
		});
	}

	async open() {
		// closed, opened 상태에서는 open할 수 없다.
		if (this.isClosed || this.isOpened) {
			throw new Error('can not open session');
		}

		await this.changeStatus(liveSessionStatus.opened);
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

		const _status = await res.json();

		this.status = _status;

		return _status;
	}

	get isReady() {
		return this.status === liveSessionStatus.ready;
	}

	get isOpened() {
		return this.status === liveSessionStatus.opened;
	}

	get isPaused() {
		return this.status === liveSessionStatus.paused;
	}

	get isClosed() {
		return this.status === liveSessionStatus.closed;
	}
}
