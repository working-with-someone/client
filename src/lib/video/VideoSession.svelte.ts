import { access_level } from '@prisma/client';
import type { VideoSessionWithAll } from '../../types/session';
import { to } from '../../config/path.config.svelte';

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

export class VideoSession implements VideoSessionWithAll {
	id: string;
	title: string;
	description: string;
	thumbnailSrc: string;
	category_label: string;
	access_level: access_level;
	video_id: string;

	constructor(videoSession: VideoSession) {
		this.id = videoSession.id;
		this.title = videoSession.title;
		this.description = videoSession.description;
		this.thumbnailSrc = videoSession.thumbnailSrc;
		this.category_label = videoSession.category_label;
		this.access_level = videoSession.access_level;
		this.video_id = videoSession.video_id;
	}

	get videoURL() {
		const videoURL = new URL(this.video_id, to.mediaServer.staticServer.video).href;

		return videoURL;
	}
}
