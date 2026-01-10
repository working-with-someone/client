<script lang="ts">
	import type { Studio } from '../../live/studio';
	import StateTag from '../tags/StateTag.svelte';

	interface Props {
		studio: Studio;
	}

	const { studio }: Props = $props();

	let duration = $state('00:00:00');
	let currentStateDuration = $state('00:00:00');

	setInterval(() => {
		let elapsedTime = studio.elapsedTime;

		if (elapsedTime) {
			duration = `${elapsedTime.hours}:${elapsedTime.minutes}:${elapsedTime.seconds}`;
		}

		currentStateDuration = `${studio.currentStatusDuration.hours}:${studio.currentStatusDuration.minutes}:${studio.currentStatusDuration.seconds}`;
	}, 1000);
</script>

<div class="overlay">
	<div class="duration">
		<span class="icon material-symbols-outlined" style="font-size : 30px;">bigtop_updates</span>
		<span>{duration}</span>
	</div>

	<div class="state">
		<StateTag state={studio.liveSession.status} />
		<div class="timer">
			{#if studio.isOpened}
				<span class="until-open">{currentStateDuration}</span>
			{:else if studio.isBreaked}
				<span class="until-break">{currentStateDuration}</span>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.overlay {
		position: absolute;
		top: 10px;
		left: 10px;
		display: flex;
		align-items: row;
		align-items: center;
		gap: 10px;

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

		.state {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 10px;
			.timer {
				font-size: 14px;

				.until-open {
					color: var(--light-green);
				}

				.until-break {
					color: var(--light-blue);
				}
			}
		}
	}
</style>
