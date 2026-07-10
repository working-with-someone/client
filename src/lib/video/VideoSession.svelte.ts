import { access_level, Prisma } from '@prisma/client';
import { to } from '../../config/path.config.svelte';
import type { PublicVideoSession } from '../../types/contracts/video-session';

export class VideoSessionForm {
	id = $state<string>('');
	title = $state<string>('');
	description = $state<string>('');
	thumbnailFile = $state<File | null>(null);
	category_label = $state<string>('');
	access_level = $state<access_level>(access_level.PUBLIC);
	video_id?: string;
	video_uploaded = $state<boolean>(false);

	constructor() {}
}

export class VideoSession
	implements
		Prisma.video_sessionGetPayload<{
			include: {
				break_time: true;
				category: true;
				organizer: {
					include: {
						pfp: true;
					};
				};
			};
		}>
{
	id: string;
	title: string;
	description: string | null;
	category_label: string | null;
	access_level: access_level;
	video_id: string;
	break_time: Prisma.video_session_break_timeGetPayload<true> | null;
	category: Prisma.categoryGetPayload<true> | null;
	organizer: Prisma.userGetPayload<{
		include: {
			pfp: true;
		};
	}>;
	created_at: Date;
	duration: string;
	comment_enabled: boolean;
	comment_count: number;
	like_count: number;
	thumbnail_uri: string;
	updated_at: Date;
	organizer_id: number;

	constructor(videoSession: PublicVideoSession) {
		this.id = videoSession.id;
		this.title = videoSession.title;
		this.description = videoSession.description;
		this.category_label = videoSession.category_label;
		this.access_level = videoSession.access_level;
		this.video_id = videoSession.video_id;
		this.break_time = videoSession.break_time;
		this.category = videoSession.category;
		this.organizer = videoSession.organizer;
		this.created_at = videoSession.created_at;
		this.duration = videoSession.duration;
		this.comment_enabled = videoSession.comment_enabled;
		this.comment_count = videoSession.comment_count;
		this.like_count = videoSession.like_count;
		this.thumbnail_uri = videoSession.thumbnail_uri;
		this.updated_at = videoSession.updated_at;
		this.organizer_id = videoSession.organizer_id;
	}

	get videoURL() {
		const videoURL = new URL(this.video_id, to.mediaServer.staticServer.video).href;

		return videoURL;
	}
}
