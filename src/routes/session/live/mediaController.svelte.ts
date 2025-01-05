
interface MediaStreamConfig {
	width? : number;
	height : number;
}

export class MediaController {
	currVideoDeviceId?: string = $state();
	currAudioInputDeviceId?: string = $state();
	videoDevices: MediaDeviceInfo[] = $state([]);
	audioInputDevices: MediaDeviceInfo[] = $state([]);

	constructor() {
		
	}

	async getConnectedAudioInputDevices() {
		const devices = await navigator.mediaDevices.enumerateDevices();

		return devices.filter((device) => device.kind == 'audioinput');
	}

	async getConnectedVideoInputDevices() {
		const devices = await navigator.mediaDevices.enumerateDevices();

		return devices.filter((device) => device.kind == 'videoinput');
	}


	async loadDevices(){
		this.videoDevices = await this.getConnectedVideoInputDevices();
		this.audioInputDevices = await this.getConnectedAudioInputDevices();

		if(!this.currVideoDeviceId) this.currVideoDeviceId = this.videoDevices[0].deviceId;
		if(!this.currAudioInputDeviceId) this.currAudioInputDeviceId = this.audioInputDevices[0].deviceId;
	}

	async generateMediaStream(config? : MediaStreamConfig) {
		const mediaStreamConstraints: MediaStreamConstraints = {
			video: {
				deviceId: this.currVideoDeviceId,
				width : config?.width,
				height : config?.height
			},
			audio: {
				deviceId: this.currAudioInputDeviceId,
			}
		};

		const mediaStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);

		return mediaStream;
	}
}