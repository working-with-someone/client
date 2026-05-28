<script lang="ts">
	import type { PageData } from './$types';
	import { to } from '../../../../config/path.config.svelte';

	const { data }: { data: PageData } = $props();
	const videoSession = data.videoSession;
</script>

<section id="video-session">
	<div class="left">
		<div class="video-wrapper">
			<video src={new URL(videoSession.video_id, to.mediaServer.staticServer.video).href} controls
			></video>
		</div>

		<div class="video-info">
			<h2>{videoSession.title}</h2>
			<p>{videoSession.description}</p>
		</div>
	</div>
	<div class="right">
		<div class="body"></div>
	</div>
</section>

<style lang="scss">
	section#video-session {
		$chat-width: 350px;

		background-color: var(--bg-sideBar);
		width: 100%;
		height: 100%;
		border-radius: 10px;
		display: grid;
		grid-template-areas: 'left right';
		grid-template-columns: auto $chat-width;
		padding: 20px;
		gap: 10px;

		.left {
			grid: left;
			display: flex;
			flex-direction: column;
			video {
				width: 100%;
			}
		}
		.right {
			grid: right;
			display: flex;
			flex-direction: column;
		}
	}
</style>
