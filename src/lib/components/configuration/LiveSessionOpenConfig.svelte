<script lang="ts">
	import LiveSessionMediaConfig from './LiveSessionMediaConfig.svelte';
	import { access_level } from '@prisma/client';
	import { MediaController } from '../../../routes/session/live/[sessionId]/studio/mediaController.svelte';
	import { onMount } from 'svelte';
	import { Studio } from '../../../routes/session/live/[sessionId]/studio/studio.svelte';

	interface Props {
		studio: Studio;
		mediaController: MediaController;
	}

	let { studio, mediaController }: Props = $props();

	let previewVideo: HTMLVideoElement;

	onMount(() => {
		previewVideo.srcObject = mediaController.mediaStream;
	});
</script>

<section id="live-session-open-config">
	<div class="header">Open Live Session</div>

	<div class="body">
		<div class="preview">
			<div class="preview-media">
				<video id="preview-video" autoplay bind:this={previewVideo} controls={true}></video>
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
			<LiveSessionMediaConfig {mediaController} />
		</div>
	</div>
	<!-- this에 click event가 binding되지 않도록 -->
	<div class="footer">
		<button
			class="btn-sig"
			onclick={() => {
				studio.open();
			}}>start</button
		>
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
