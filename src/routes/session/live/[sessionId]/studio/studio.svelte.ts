import { UpdatableLiveSession } from '../LiveSession.svelte';
import { liveSessionStatus } from '../../../../../enums/session';
import { timeDifference } from '$lib/utils/time';
import { io, type Socket } from 'socket.io-client';
import { PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN } from '$env/static/public';
import { OrganizerChatManager } from './organizerChatManager.svelte';
import WS_CHANNELS from '$lib/constants/channels';
import { BreakTimeSchedular } from './BreakTimeSchedular.svelte';

export class Studio {
	liveSession: UpdatableLiveSession;
	chatManager: OrganizerChatManager;
	breakTimeSchedular?: BreakTimeSchedular;
	private mediaRecorder?: MediaRecorder;
	private socket: Socket;

	constructor(liveSession: UpdatableLiveSession) {
		this.liveSession = liveSession;

		this.socket = io(
			PUBLIC_LIVE_SESSION_HUB_SERVER_DOMAIN + `/livesession/` + this.liveSession.id,
			{
				withCredentials: true
			}
		);

		this.chatManager = new OrganizerChatManager(this.socket);

		if (this.liveSession.break_time) {
			this.breakTimeSchedular = new BreakTimeSchedular({
				interval: this.liveSession.break_time.interval,
				duration: this.liveSession.break_time.duration
			});
		}
	}

	async open() {
		await this.liveSession.changeStatus(liveSessionStatus.opened);

		this.socket.emit(WS_CHANNELS.transition.open, () => { });
	}

	async break() {
		await this.liveSession.changeStatus(liveSessionStatus.breaked);

		this.socket.emit(WS_CHANNELS.transition.break, () => { });
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

		// break time이 설정되어있다면, break time schedule
		if (this.breakTimeSchedular)
			this.breakTimeSchedular.start(
				() => this.open(),
				() => this.break()
			);
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