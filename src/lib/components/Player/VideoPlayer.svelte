<script lang="ts">
	interface Props {
		videoSrc: string;
		thumbnailSrc?: string;
	}

	const { videoSrc, thumbnailSrc }: Props = $props();
</script>

<div class="video-wrapper">
	<video id="player" src={videoSrc} poster={thumbnailSrc} controls />
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

		video#player {
			width: 100%;
			height: 100%;

			object-fit: contain;
			min-width: 100%;
		}
	}
</style>
