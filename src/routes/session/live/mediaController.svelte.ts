export class MediaController {
	currVideoInputDeviceId: string = $state('');
	currAudioInputDeviceId: string = $state('');
	videoInputDevices: MediaDeviceInfo[] = $state([]);
	audioInputDevices: MediaDeviceInfo[] = $state([]);
	private mediaStreamConstraints: MediaStreamConstraints = $state({});
	// initialization 과정에서 async하지만 assertion이 가능하다.
	mediaStream: MediaStream = $state() as MediaStream;
	initialized: boolean = $state(false);

	constructor() {}

	async init() {
		await this.loadDevices();

		// set default input device
		this.currVideoInputDeviceId = this.videoInputDevices[0].deviceId;
		this.currAudioInputDeviceId = this.audioInputDevices[0].deviceId;

		// set media stream constraint
		this.mediaStreamConstraints = {
			video: {
				deviceId: this.currVideoInputDeviceId,
				// 16:9
				aspectRatio: 1.7777777778
			},
			audio: {
				deviceId: this.currAudioInputDeviceId
			}
		};

		this.mediaStream = await navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints);

		this.initialized = true;
	}

	async setVideoTrackConstraints(videoTrackConstraints: MediaTrackConstraints) {
		this.mediaStreamConstraints.video = {
			...(this.mediaStreamConstraints.video as MediaTrackConstraints),
			...videoTrackConstraints
		};

		this.updateMediaStream();
	}

	async setAudioTrackConstraints(audioTrackConstraints: MediaTrackConstraints) {
		this.mediaStreamConstraints.audio = {
			...(this.mediaStreamConstraints.audio as MediaTrackConstraints),
			...audioTrackConstraints
		};

		this.updateMediaStream();
	}

	async getConnectedAudioInputDevices() {
		const devices = await navigator.mediaDevices.enumerateDevices();

		return devices.filter((device) => device.kind == 'audioinput');
	}

	async getConnectedVideoInputDevices() {
		const devices = await navigator.mediaDevices.enumerateDevices();

		return devices.filter((device) => device.kind == 'videoinput');
	}

	// video, audio input device를 load하고, default device의 id를 지정한다.
	private async loadDevices() {
		this.videoInputDevices = await this.getConnectedVideoInputDevices();
		this.audioInputDevices = await this.getConnectedAudioInputDevices();
	}

	private async updateMediaStream() {
		this.mediaStream = await navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints);
	}

	async getMediaStream() {
		if (this.mediaStream) {
			return this.mediaStream;
		}

		return await navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints);
	}
}
