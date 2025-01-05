import wwsfetch from '$lib/utils/wwsfetch';
import { liveSessionStatus, type accessLevel } from '../../../enums/session';

export class Session {
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

export class LiveSession extends Session {
	status?: liveSessionStatus = $state<liveSessionStatus>();
	started_at: Date;
	mediaController: MediaController;

	constructor(liveSession) {
		super(liveSession);
		this.status = liveSession.session_live.status;
		this.started_at = new Date(liveSession.session_live.started_at);
		this.mediaController = new MediaController();
	}

	open() {
		wwsfetch(`/sessions/live/${this.id}/status`, {
			method: 'PUT',
			body: new URLSearchParams({ status: liveSessionStatus.opened.toString() })
		}).then((res) => {
			if (res.status === 200) {
				this.status = liveSessionStatus.opened;
			}
		});
	}

	isReady() {
		return this.status === liveSessionStatus.ready;
	}

	isOpened() {
		return this.status === liveSessionStatus.opened;
	}

	isPaused() {
		return this.status === liveSessionStatus.paused;
	}

	isClosed() {
		return this.status === liveSessionStatus.closed;
	}
}

export class MediaController {
	currVideoDeviceId: string = $bindable();
	currAudioDeviceId: string = $bindable();
	videoDevices: MediaDeviceInfo[] = $state([]);
	audioDevices: MediaDeviceInfo[] = $state([]);
	constructor() {}

	async getConnectedAudioInputDevices() {
		const devices = await navigator.mediaDevices.enumerateDevices();

		return devices.filter((device) => device.kind == 'audioinput');
	}

	async getConnectedVideoinputDevices() {
		const devices = await navigator.mediaDevices.enumerateDevices();

		return devices.filter((device) => device.kind == 'videoinput');
	}

	generateMediaStream(width: number, height: number) {
		const mediaStreamConstraints: MediaStreamConstraints = {
			video: {
				deviceId: this.currVideoDeviceId,
				width,
				height
			},
			audio: {
				deviceId: this.currAudioDeviceId
			}
		};

		return navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
	}
}
