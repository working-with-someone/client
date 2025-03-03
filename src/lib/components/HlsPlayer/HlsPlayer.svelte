<script lang="ts">
	import Hls  from 'hls.js';
	import { onMount } from 'svelte';
	import { PUBLIC_RTMP_SERVER_DOMAIN } from "$env/static/public";

	interface Props {
		sessionId: string;
	}

	const { sessionId }: Props = $props();

	let video: HTMLVideoElement;

	onMount(() => {
		const videoSrc = `${PUBLIC_RTMP_SERVER_DOMAIN}/hls/${sessionId}/index.m3u8`;

		if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = videoSrc;
		} else if (Hls.isSupported()) {
			const hls = new Hls();

			hls.loadSource(videoSrc);
			hls.attachMedia(video);
		}
	});
</script>

<div id="hls-player">
	<video id="video" autoplay controls bind:this={video}></video>
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
