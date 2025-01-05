<script lang="ts">
	import { getContext } from 'svelte';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { LiveSession } from '../../../routes/session/live/liveSession.svelte.js';

	interface Props {
		liveSession: LiveSession;
	}

	let { liveSession }: Props = $props();

	const dispatch = createEventDispatcher();

	let videoDevices: MediaDeviceInfo[] = $state([]);
	let audioDevices: MediaDeviceInfo[] = $state([]);

	onMount(() => {
		loadDevices();
		dispatch('generateMediaStream');
	});

	async function loadDevices() {
		const devices = await navigator.mediaDevices.enumerateDevices();

		for (const device of devices)
			switch (device.kind) {
				case 'videoinput':
					if (!videoDevices.length) liveSession.mediaController.currVideoDeviceId = device.deviceId;
					videoDevices = [...videoDevices, device];
					break;
				case 'audioinput':
					if (!audioDevices.length) liveSession.audioDeviceId = device.deviceId;
					audioDevices = [...audioDevices, device];
					break;
			}
	}
</script>

<section id="live-session-media-config">
	<div class="body">
		<div class="config">
			<div class="devices">
				<div class="device-selection video-device">
					<p class="label">video device</p>
					<select
						name="video-device"
						id=""
						class="video-device-select"
						bind:value={liveSession.mediaStreamConstraints.video.deviceId}
						onchange={() => dispatch('generateMediaStream')}
					>
						{#each videoDevices as videoDevice}
							<option value={videoDevice.deviceId}>
								{videoDevice.label}
							</option>
						{/each}
					</select>
				</div>

				<div class="device-selection audio-device">
					<p class="label">audio device</p>
					<select
						name="audio-device"
						id=""
						class="audio-device-select"
						bind:value={liveSession.mediaStreamConstraints.audio.deviceId}
						onchange={() => dispatch('generateMediaStream')}
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
			.config {
				.devices {
					display: flex;
					flex-direction: column;
					gap: 10px;
					.device-selection {
						.label {
							color: var(--font-light-gray);
							padding-bottom: 5px;
							font-size: 13px;
						}
						select {
							padding: 10px;
						}
					}
				}
			}
		}
	}
</style>
