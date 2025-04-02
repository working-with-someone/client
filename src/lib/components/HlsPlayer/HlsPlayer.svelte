<script lang="ts">
	import Hls from 'hls.js';
	import { onMount } from 'svelte';
	import { PUBLIC_RTMP_SERVER_DOMAIN } from '$env/static/public';
	import LiveSessionOverlayForParticipant from '../overlay/LiveSessionOverlayForParticipant.svelte';
	import type { Participant } from '../../../routes/session/live/[sessionId]/Participant.svelte';

	interface Props {
		participant: Participant;
	}

	const { participant }: Props = $props();

	let video: HTMLVideoElement;

	onMount(() => {
		const videoSrc = `${PUBLIC_RTMP_SERVER_DOMAIN}/hls/${participant.liveSession.id}/index.m3u8`;

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

	<LiveSessionOverlayForParticipant {participant}></LiveSessionOverlayForParticipant>
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
