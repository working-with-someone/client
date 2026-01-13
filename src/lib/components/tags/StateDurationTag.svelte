<script lang="ts">
	import StateTag from './StateTag.svelte';
	import type { LiveSession } from '../../../routes/session/live/[sessionId]/LiveSession.svelte';
	import { convertToTime } from '$lib/utils/time';

	interface Props {
		liveSession: LiveSession;
	}

	const { liveSession }: Props = $props();

	let currentStateDuration = $state('00:00:00');

	let openTotalDuration = convertToTime(liveSession.break_time!.interval, 'm');
	let breakTotalDuration = convertToTime(liveSession.break_time!.duration, 'm');

	setInterval(() => {
		currentStateDuration = `${liveSession.currentStatusDuration.hours}:${liveSession.currentStatusDuration.minutes}:${liveSession.currentStatusDuration.seconds}`;
	}, 1000);
</script>

<div class="state-duration-tag">
	<StateTag state={liveSession.status}></StateTag>

	<div class="timer">
		{#if liveSession.isOpened}
			<div class="open-duration">
				<span>{currentStateDuration}</span>
				<span>/</span>
				<span
					>{openTotalDuration.hours}:{openTotalDuration.minutes}:{openTotalDuration.seconds}</span
				>
			</div>
		{:else if liveSession.isBreaked}
			<div class="break-duration">
				<span>{currentStateDuration}</span>
				<span>/</span>
				<span
					>{breakTotalDuration.hours}:{breakTotalDuration.minutes}:{breakTotalDuration.seconds}</span
				>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.state-duration-tag {
		display: flex;
		align-items: center;
		gap: 10px;
		.state {
			display: inline-block;
			flex-direction: row;
			align-items: center;
			gap: 10px;
		}
		.timer {
			display: inline-block;
			font-size: 14px;

			.open-duration {
				span {
					color: var(--light-green);
				}
			}

			.break-duration {
				span {
					color: var(--light-blue);
				}
			}
		}
	}
</style>
