<script lang="ts">
	import Hls, { type BufferAppendedData } from 'hls.js';
	import { onMount } from 'svelte';

	interface Props {
		sessionId: string;
	}

	const { sessionId }: Props = $props();

	let video: HTMLVideoElement;

	onMount(() => {
		const videoSrc = `http://localhost:8004/hls/${sessionId}/index.m3u8`;

		if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = videoSrc;
		} else if (Hls.isSupported()) {
			const hls = new Hls();

			hls.loadSource(videoSrc);
			hls.attachMedia(video);
		}

		video.play();
	});
</script>

<div id="hls-player">
	<script type="module" src="https://cdn.jsdelivr.net/npm/media-chrome@4/+esm"></script>

	<!-- <media-controller> -->
	<video id="video" bind:this={video}></video>
	<!-- <media-control-bar>
			<media-play-button></media-play-button>
			<media-mute-button></media-mute-button>
			<media-volume-range></media-volume-range>
			<media-time-range></media-time-range>
			<media-pip-button></media-pip-button>
			<media-fullscreen-button></media-fullscreen-button>
		</media-control-bar>
	</media-controller> -->
</div>

<style lang="scss">
	#hls-player {
		flex: 1;
		background-color: black;
		position: relative;

		video {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 100%;
			height: 100%;
			object-fit: contain;
			transform: translate(-50%, -50%);
		}
	}
</style>
