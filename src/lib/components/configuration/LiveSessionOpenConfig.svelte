<script lang="ts">
	import LiveSessionMediaConfig from './LiveSessionMediaConfig.svelte';
	import { accessLevel } from '../../../enums/session';

	let { liveSession } = $props();

	let currAudioDeviceId: string;
	let currVideoDeviceId: string;

	let previewVideo: HTMLVideoElement;

	async function generateMediaStream() {
		const constraints: MediaStreamConstraints = {
			audio: {
				deviceId: currAudioDeviceId
			},
			video: {
				deviceId: currVideoDeviceId,
				aspectRatio: 1.7777777778
			}
		};

		const stream = await navigator.mediaDevices.getUserMedia(constraints);
		previewVideo.srcObject = stream;
	}
</script>

<section id="live-session-open-config">
	<div class="header">Open Live Session</div>

	<div class="body">
		<div class="preview">
			<div class="preview-media">
				<video id="preview-video" autoplay src="" bind:this={previewVideo} controls={true}></video>
			</div>
		</div>
		<div class="info-confirm">
			<div class="title">
				<p class="label">title</p>
				<p class="value">{liveSession.title}</p>
			</div>
			<div class="description">
				<p class="label">description</p>
				<p class="value">{liveSession.description}</p>
			</div>
			<div class="access-level">
				<p class="label">access level</p>
				<p class="value">
					{#if liveSession.access_level === accessLevel.public}
						public
					{:else if liveSession.access_level === accessLevel.followersOnly}
						followers only
					{:else if liveSession.access_level === accessLevel.private}
						private
					{/if}
				</p>
			</div>
		</div>
		<div class="media-config">
			<LiveSessionMediaConfig
				{currAudioDeviceId}
				{currVideoDeviceId}
				on:generateMediaStream={generateMediaStream}
				{liveSession}
			/>
		</div>
	</div>
	<div class="footer"><button class="btn-sig">start</button></div>
</section>

<style lang="scss">
	section#live-session-open-config {
		background-color: var(--bg-sideBar);
		width: 700px;
		padding: 20px;
		min-width: 300px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		border-radius: 10px;

		.header {
		}

		.body {
			.preview {
				margin-bottom: 20px;
				aspect-ratio: 16/9;
				background-color: black;
				.preview-media {
					border-radius: 10px;
					display: flex;
					justify-content: center;
					width: 100%;

					video {
						width: 100%;
					}
				}
			}

			.info-confirm {
				.label {
					color: var(--font-light-gray);
					padding-bottom: 5px;
					font-size: 13px;
				}
				.value {
					font-size: 14px;
				}
			}
		}

		.footer {
			display: flex;
			justify-content: end;
			gap: 10px;
			align-items: end;
		}
	}
</style>
