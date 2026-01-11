<script lang="ts">
	import LiveSessionMediaConfig from './LiveSessionMediaConfig.svelte';
	import { access_level } from '@prisma/client';
	import { Studio } from '../../live/studio';

	interface Props {
		studio: Studio;
		closeLiveSessionConfigModal: () => void;
	}

	let { studio, closeLiveSessionConfigModal }: Props = $props();

	let previewVideo: HTMLVideoElement;

	$effect(() => {
		previewVideo.srcObject = studio.mediaController.mediaStream;
	});
</script>

<section id="live-session-open-config" class="much-rounded">
	<div class="header">live session configuration</div>

	<div class="body">
		<div class="preview">
			<div class="preview-media">
				<video id="preview-video" autoplay bind:this={previewVideo} controls={false}></video>
			</div>
		</div>
		<div class="info-confirm">
			<div class="title">
				<p class="label">title</p>
				<p class="value">{studio.liveSession.title}</p>
			</div>
			<div class="description">
				<p class="label">description</p>
				<p class="value">{studio.liveSession.description}</p>
			</div>
			<div class="access-level">
				<p class="label">access level</p>
				<p class="value">
					{#if studio.liveSession.access_level === access_level.PUBLIC}
						public
					{:else if studio.liveSession.access_level === access_level.FOLLOWER_ONLY}
						followers only
					{:else if studio.liveSession.access_level === access_level.PRIVATE}
						private
					{/if}
				</p>
			</div>
		</div>
		<div class="media-config">
			<LiveSessionMediaConfig mediaController={studio.mediaController} />
		</div>
	</div>
	<!-- this에 click event가 binding되지 않도록 -->
	<div class="footer">
		{#if studio.liveSession.isReady}
			<button
				class="btn-sig"
				onclick={() => {
					studio
						.open()
						.then(() => {
							closeLiveSessionConfigModal();
						})
						.catch((err) => {
							console.error(err);
						});
				}}>start</button
			>
		{:else if studio.liveSession.isOpened}
			<button
				class="btn-sig"
				onclick={() => {
					studio.mediaController.reloadMediaStream();
					closeLiveSessionConfigModal();
				}}>save</button
			>
		{/if}
	</div>
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

		padding: 20px;

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
