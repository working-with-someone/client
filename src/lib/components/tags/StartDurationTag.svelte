<script lang="ts">
	import type { LiveSession } from '../../../routes/session/live/[sessionId]/LiveSession.svelte';

	interface Props {
		liveSession: LiveSession;
	}

	const { liveSession }: Props = $props();

	let startDuration = $state('00:00:00');

	setInterval(() => {
		startDuration = `${liveSession.currentStatusDuration.hours}:${liveSession.currentStatusDuration.minutes}:${liveSession.currentStatusDuration.seconds}`;
	});
</script>

<div class="start-duration-tag">
	<span class="icon material-symbols-outlined" style="font-size : 30px;">bigtop_updates</span>
	<span>{startDuration}</span>
</div>

<style lang="scss">
	.start-duration-tag {
		display: flex;
		justify-content: center;
		gap: 10px;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 10px;
		border-radius: 10px;

		.icon {
			color: var(--sig);
		}
	}
</style>
