<script lang="ts">
	import { MediaController } from "../../../routes/session/live/mediaController.svelte";

	interface Props {
		mediaController: MediaController;
	}

	let { mediaController }: Props = $props();
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
						bind:value={mediaController.currVideoDeviceId}
					>
						{#each mediaController.videoDevices as videoDevice}
							<option value={videoDevice.deviceId}>
								{videoDevice.label}
							</option>
						{/each}
					</select>
				</div>

				<div class="device-selection audio-device">
					<p class="label">audio input</p>
					<select
						name="audio-device"
						id=""
						class="audio-device-select"
						bind:value={mediaController.currAudioInputDeviceId}
					>
						{#each mediaController.audioInputDevices as audioDevice}
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
