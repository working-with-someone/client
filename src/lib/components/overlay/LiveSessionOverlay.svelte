<script lang="ts">
	import type { Studio } from '../../../routes/session/live/[sessionId]/studio/studio.svelte';
	import StateTag from '../tags/StateTag.svelte';

	interface Props {
		studio: Studio;
	}

	const { studio }: Props = $props();

	let duration = $state('00:00:00');
	let untilBreak = $state('00:00:00');
	let untilOpen = $state('00:00:00');

	setInterval(() => {
		let elapsedTime = studio.elapsedTime;

		duration = `${elapsedTime.hours}:${elapsedTime.minutes}:${elapsedTime.seconds}`;

		if (studio.breakTimeSchedular) {
			let untilBreakTIme = studio.breakTimeSchedular.remainTimeUntilBreak;

			untilBreak = `${untilBreakTIme.hours}:${untilBreakTIme.minutes}:${untilBreakTIme.seconds}`;

			let untilOpenTime = studio.breakTimeSchedular.remainTimeUntilOpen;
			untilOpen = `${untilOpenTime.hours}:${untilOpenTime.minutes}:${untilOpenTime.seconds}`;
		}
	}, 1000);
</script>

<div class="overlay">
	<div class="duration">
		<span class="icon material-symbols-outlined" style="font-size : 30px;">bigtop_updates</span>
		<span>{duration}</span>
	</div>

	<div class="state">
		<StateTag liveSession={studio.liveSession} />
		{#if studio.breakTimeSchedular}
			<div class="timer">
				{#if studio.liveSession.isOpened}
					<span class="until-open">{untilBreak}</span>
				{:else if studio.liveSession.isBreaked}
					<span class="until-break">{untilOpen}</span>
				{/if}
			</div>
		{/if}
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
