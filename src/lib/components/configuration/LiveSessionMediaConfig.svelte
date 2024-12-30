<script lang="ts">
	import { getContext } from 'svelte';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const user: any = getContext('user');

	export let liveSession;

	export let currAudioDeviceId:string;
	export let currVideoDeviceId:string;

	const dispatch = createEventDispatcher();

	let videoDevices: MediaDeviceInfo[] = [];
	let audioDevices: MediaDeviceInfo[] = [];

	onMount(() => {
		loadDevices()
		dispatch("generateMediaStream")
	});

	async function loadDevices() {
		const devices = await navigator.mediaDevices.enumerateDevices();

		for (const device of devices)
			switch (device.kind) {
				case 'videoinput':
					if (!videoDevices.length) currVideoDeviceId = device.deviceId;
					videoDevices = [...videoDevices, device];
					break;
				case 'audioinput':
					if (!audioDevices.length) currAudioDeviceId = device.deviceId;
					audioDevices = [...audioDevices, device];
					break;
			}
	}
</script>

<section id="live-session-media-config">
	<div class="header">Live Session Media Configuration</div>

	<div class="body">

		<div class="config">
			<div class="devices">
				<div class="device-selection video-device">
					<p>video device</p>
					<select
						name="video-device"
						id=""
						class="video-device-select"
						bind:value={currVideoDeviceId}
						on:change={() => dispatch("generateMediaStream")}
					>
						{#each videoDevices as videoDevice}
							<option value={videoDevice.deviceId}>
								{videoDevice.label}
							</option>
						{/each}
					</select>
				</div>

				<div class="device-selection audio-device">
					<p>audio device</p>
					<select
						name="audio-device"
						id=""
						class="audio-device-select"
						bind:value={currAudioDeviceId}
						on:change={() => dispatch("generateMediaStream")}
					>
						{#each audioDevices as audioDevice}
							<option value={audioDevice.deviceId}>
								{audioDevice.label}
							</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	section#live-session-media-config {
		.body {
			.config{
				.devices{
					display: flex;
					flex-direction: column;
					gap : 10px;
					.device-selection {
						p {
							color : var(--font-light-gray);
							padding-bottom : 5px;
						}
            select {
						
              padding: 15px;
            }
          }
				}
			}
		}
	}
</style>
