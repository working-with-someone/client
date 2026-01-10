import { error } from '@sveltejs/kit';
import wwsfetch from '$lib/utils/wwsfetch';
import { access_level, live_session_status } from '@prisma/client';

import type { LiveSessionWithAll } from '../../../../types/session';

export class LiveSession implements LiveSessionWithAll {
	id: string;
	title: string;
	description: string | null;
	thumbnail_uri: string;
	category_label: string;
	status = $state<string>() as live_session_status;
	stream_key: string;
	access_level: access_level;
	created_at: Date;
	updated_at: Date;
	started_at: Date | null;
	organizer_id: number;
	break_time: { session_id: string; interval: number; duration: number } | null;
	allow: { user_id: number; live_session_id: string }[];
	live_session_transition_log: {
		id: number;
		live_session_id: string;
		from_state: live_session_status;
		to_state: live_session_status;
		transitioned_at: Date;
	}[];
	category: { label: string };

	constructor(liveSession: LiveSession) {
		this.id = liveSession.id;
		this.title = liveSession.title;
		this.description = liveSession.description;
		this.thumbnail_uri = liveSession.thumbnail_uri;
		this.category_label = liveSession.category_label;
		this.status = liveSession.status;
		this.stream_key = liveSession.stream_key;
		this.access_level = liveSession.access_level;
		this.created_at = new Date(liveSession.created_at);
		this.updated_at = new Date(liveSession.updated_at);

		this.started_at = liveSession.started_at ? new Date(liveSession.started_at) : null;

		this.organizer_id = liveSession.organizer_id;
		this.break_time = liveSession.break_time;
		this.allow = liveSession.allow;
		this.live_session_transition_log = liveSession.live_session_transition_log;
		this.category = liveSession.category;

		console.log(liveSession);
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
