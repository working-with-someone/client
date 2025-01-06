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
	<div class="progress"></div>
</div>

<style lang="scss">
	#player {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: var(--bg);
		video {
			width: 100%;
			max-height: 785px;
		}

		.progress {
			width: 100%;
			height: 5px;
			background-color: var(--sig);
		}
	}
</style>
