import { error } from '@sveltejs/kit';
import wwsfetch from '$lib/utils/wwsfetch';
import { access_level, live_session_status } from '@prisma/client';

import { Prisma } from '@prisma/client';

export class LiveSession
	implements
		Prisma.live_sessionGetPayload<{
			include: {
				break_time: true;
			};
		}>
{
	id: string;
	title: string;
	description: string | null;
	thumbnail_uri: string;
	category: string;
	status = $state<string>() as live_session_status;
	stream_key: string;
	access_level: access_level;
	created_at: Date;
	updated_at: Date;
	started_at: Date | null;
	organizer_id: number;
	break_time: { session_id: string; interval: number; duration: number } | null;

	constructor(
		liveSession: Prisma.live_sessionGetPayload<true>,
		breakTime: Prisma.live_session_break_timeGetPayload<true> | null
	) {
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

		this.break_time = breakTime;
	}

	get isReady() {
		return this.status === live_session_status.READY;
	}

	get isOpened() {
		return this.status === live_session_status.OPENED;
	}

	get isBreaked() {
		return this.status === live_session_status.BREAKED;
	}

	get isClosed() {
		return this.status === live_session_status.CLOSED;
	}

	get breakTimeEnabled() {
		return this.break_time ? true : false;
	}

	async fetch() {
		const res = await wwsfetch(`/sessions/live/${this.id}`, {});

		if (res.status != 200) {
			error(res.status);
		}

		const body = await res.json();
		const liveSession = body.data;

		Object.assign(this, liveSession);
	}
}

export class UpdatableLiveSession extends LiveSession {
	constructor(
		liveSession: Prisma.live_sessionGetPayload<true>,
		breakTime: Prisma.live_session_break_timeGetPayload<true> | null
	) {
		super(liveSession, breakTime);
	}

	async changeStatus(status: live_session_status) {
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
