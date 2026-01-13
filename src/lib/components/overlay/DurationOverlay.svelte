<script lang="ts">
	import type { LiveSession } from '../../../routes/session/live/[sessionId]/LiveSession.svelte';
	import StartDurationTag from '../tags/StartDurationTag.svelte';
	import StateDurationTag from '../tags/StateDurationTag.svelte';

	interface Props {
		liveSession: LiveSession;
	}

	const { liveSession }: Props = $props();
</script>

<div class="duration-overlay">
	<StartDurationTag {liveSession}></StartDurationTag>
	<StateDurationTag {liveSession}></StateDurationTag>
</div>

<style lang="scss">
	.duration-overlay {
		display: flex;
		gap: 10px;
	}
</style>
