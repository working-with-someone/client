<script lang="ts">
	import type { Participant } from '../../../routes/session/live/[sessionId]/Participant.svelte';
	import StateTag from '../tags/StateTag.svelte';

	interface Props {
		participant: Participant;
	}

	const { participant }: Props = $props();
</script>

<div class="overlay">
	<div class="state">
		<StateTag liveSession={participant.liveSession} />
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

		.state {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 10px;
		}
	}
</style>
