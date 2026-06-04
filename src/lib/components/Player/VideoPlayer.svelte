<script lang="ts">
	import videojs from 'video.js';
	import 'video.js/dist/video-js.css';
	import { onMount } from 'svelte';

	interface Props {
		videoSrc: string;
		thumbnailSrc?: string;
	}

	const { videoSrc, thumbnailSrc }: Props = $props();

	let videoElement: HTMLVideoElement | undefined = $state();

	onMount(() => {
		if (!videoElement) return;

		const player = videojs(videoElement, {
			controls: true,
			autoplay: true,
			preload: 'auto',
			posters: thumbnailSrc,
			sources: [
				{
					src: videoSrc,
					type: 'video/mp4'
				}
			],
			fill: true
		});
	});
</script>

<div class="video-wrapper">
	<video bind:this={videoElement} class="video-js vjs-big-play-centered"></video>
</div>

<style lang="scss">
	.video-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #000;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
