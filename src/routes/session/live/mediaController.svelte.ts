interface MediaStreamConfig {
	width?: number;
	height: number;
}

export class MediaController {
	currVideoDeviceId?: string = $state();
	currAudioInputDeviceId?: string = $state();
	videoDevices: MediaDeviceInfo[] = $state([]);
	audioInputDevices: MediaDeviceInfo[] = $state([]);
	mediaStream?: MediaStream = $state();

	constructor() {}

	async getConnectedAudioInputDevices() {
		const devices = await navigator.mediaDevices.enumerateDevices();

		return devices.filter((device) => device.kind == 'audioinput');
	}

	async getConnectedVideoInputDevices() {
		const devices = await navigator.mediaDevices.enumerateDevices();

		return devices.filter((device) => device.kind == 'videoinput');
	}

	async loadDevices() {
		this.videoDevices = await this.getConnectedVideoInputDevices();
		this.audioInputDevices = await this.getConnectedAudioInputDevices();

		if (!this.currVideoDeviceId) this.currVideoDeviceId = this.videoDevices[0].deviceId;
		if (!this.currAudioInputDeviceId)
			this.currAudioInputDeviceId = this.audioInputDevices[0].deviceId;
	}

	async getOrGenerateMediaStream(config?: MediaStreamConfig) {
		if (this.mediaStream) {
			return this.mediaStream;
		}

		const mediaStreamConstraints: MediaStreamConstraints = {
			video: {
				deviceId: this.currVideoDeviceId,
				width: config?.width,
				height: config?.height,
				// 16:9
				aspectRatio: 1.7777777778
			},
			audio: {
				deviceId: this.currAudioInputDeviceId
			}
		};

		const mediaStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);

		this.mediaStream = mediaStream;

		return mediaStream;
	}
}
