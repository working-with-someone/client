<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_MEDIA_SERVER_DOMAIN } from '$env/static/public';
	import LiveSessionOverlayForParticipant from '../overlay/LiveSessionOverlayForParticipant.svelte';
	import type { Viewer } from '../../live/viewer';

	export const ssr = false;
	export const csr = true;

	interface Props {
		viewer: Viewer;
	}

	const { viewer }: Props = $props();

	onMount(async () => {
		const flvJs = (await import('flv.js')).default;

		if (flvJs.isSupported()) {
			const videoEl = document.querySelector('#video');

			const videoSrc = `${PUBLIC_MEDIA_SERVER_DOMAIN}/live/${viewer.liveSession.id}.flv`;

			const flvPlayer = flvJs.createPlayer({
				type: 'flv',
				url: videoSrc
			});

			flvPlayer.attachMediaElement(videoEl as HTMLMediaElement);
			flvPlayer.muted = true;
			flvPlayer.load();
			flvPlayer.play();
		}
	});
</script>

<div id="flv-player">
	<video id="video" autoplay controls></video>

	<LiveSessionOverlayForParticipant {viewer}></LiveSessionOverlayForParticipant>
</div>
m

<style lang="scss">
	#flv-player {
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
