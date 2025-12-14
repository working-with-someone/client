<script lang="ts">
	import LiveSessionOverlayForStudio from '$lib/components/overlay/LiveSessionOverlayForStudio.svelte';
	import type { Studio } from '../../../../../lib/live/studio';

	interface Props {
		studio: Studio;
	}

	let { studio }: Props = $props();

	let video: HTMLVideoElement;

	$effect(() => {
		video.srcObject = studio.mediaController.mediaStream;
	});
</script>

<div id="player">
	<video src="" bind:this={video} autoplay={true}></video>

	<LiveSessionOverlayForStudio {studio} />
</div>

<style lang="scss">
	#player {
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
