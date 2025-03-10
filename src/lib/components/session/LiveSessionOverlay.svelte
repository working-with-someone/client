<script lang="ts">
	import type { Studio } from '../../../routes/session/live/[sessionId]/studio/studio.svelte';

	interface Props {
		studio: Studio;
	}

	const { studio }: Props = $props();

	let duration = $state('00:00:00');

	setInterval(() => {
		const { hours, minutes, seconds } = studio.elapsedTime;

		duration = `${hours}:${minutes}:${seconds}`;
	}, 1000);
</script>

<div class="overlay">
	<div class="duration">
		<span class="icon material-symbols-outlined" style="font-size : 30px;">bigtop_updates</span>
		<span>{duration}</span>
	</div>
</div>

<style lang="scss">
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
</style>
