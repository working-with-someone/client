import wwsfetch from '$lib/utils/wwsfetch';
import { liveSessionStatus, type accessLevel } from '../../../enums/session';

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
	status?: liveSessionStatus = $state<liveSessionStatus>();
	started_at: Date;

	constructor(liveSession) {
		super(liveSession);
		this.status = liveSession.session_live.status;
		this.started_at = new Date(liveSession.session_live.started_at);
	}

	async open() {
		// closed, opened 상태에서는 open할 수 없다.
		if (this.isClosed || this.isOpened) {
			throw new Error("can not open session");
		}

		const res = await wwsfetch(`/sessions/live/${this.id}/status`, {
			method: "PUT",
			body: new URLSearchParams({
				'status': liveSessionStatus.opened.toString()
			})
		})

		if(res.status !== 200){
			throw new Error("failed to open session : " + res.body)
		}

		const status = await res.json()

		if(status == liveSessionStatus.opened){
			this.status = status
		}
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
