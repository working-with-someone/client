<script lang="ts">
	import LiveSessionMediaConfig from './LiveSessionMediaConfig.svelte';
	import { accessLevel } from '../../../enums/session';
	import { LiveSessionManager } from '../../../routes/session/live/liveSessionManager.svelte';
	import { MediaController } from '../../../routes/session/live/mediaController.svelte';

	interface Props {
		liveSessionManager: LiveSessionManager;
		mediaController: MediaController;
	}

	let { liveSessionManager, mediaController }: Props = $props();

	let previewVideo: HTMLVideoElement;

	$effect(() => {
		mediaController.generateMediaStream().then((stream) => {
			previewVideo.srcObject = stream;
		});
	});
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
				<p class="value">{liveSessionManager.title}</p>
			</div>
			<div class="description">
				<p class="label">description</p>
				<p class="value">{liveSessionManager.description}</p>
			</div>
			<div class="access-level">
				<p class="label">access level</p>
				<p class="value">
					{#if liveSessionManager.access_level === accessLevel.public}
						public
					{:else if liveSessionManager.access_level === accessLevel.followersOnly}
						followers only
					{:else if liveSessionManager.access_level === accessLevel.private}
						private
					{/if}
				</p>
			</div>
		</div>
		<div class="media-config">
			<LiveSessionMediaConfig {mediaController} />
		</div>
	</div>
	<!-- this에 click event가 binding되지 않도록 -->
	<div class="footer"><button class="btn-sig" onclick = {() => {liveSessionManager.open()}}>start</button></div>
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
