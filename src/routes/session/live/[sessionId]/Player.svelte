<script lang="ts">
	interface Props {
		mediaStream?: MediaStream;
	}

	let { mediaStream }: Props = $props();

	let video: HTMLVideoElement;

	$effect(() => {
		if (mediaStream) {
			video.srcObject = mediaStream;
		}
	});
</script>

<div id="player">
	<video src="" bind:this={video} autoplay={true}></video>
</div>

<style lang="scss">
	#player {
		flex: 1;
		background-color: var(--bg);
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
