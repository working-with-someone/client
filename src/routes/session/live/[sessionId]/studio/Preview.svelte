<script lang="ts">
	import type { Studio } from './studio.svelte';

	interface Props {
		studio: Studio;
		mediaStream?: MediaStream;
	}

	let { mediaStream, studio }: Props = $props();

	let video: HTMLVideoElement;

	let duration = $state('00:00:00');

	setInterval(() => {
		const { hours, minutes, seconds } = studio.elapsedTime;

		duration = `${hours}:${minutes}:${seconds}`;
	}, 1000);

	$effect(() => {
		if (mediaStream) {
			video.srcObject = mediaStream;
		}
	});
</script>

<div id="player">
	<video src="" bind:this={video} autoplay={true}></video>

	<div class="overlay">
		<div class="duration">
			<span class="icon material-symbols-outlined" style="font-size : 30px;">bigtop_updates</span>
			<span>{duration}</span>
		</div>
	</div>
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

		.overlay {
			position: absolute;
			top: 10px;
			left: 10px;
			.duration {
				display: flex;
				align-items: center;
				gap: 10px;
				background-color: rgba(0, 0, 0, 0.5);
				padding: 10px;
				border-radius: 10px;
				.icon {
					color: var(--sig);
				}
			}
		}
	}
</style>
