<script lang="ts">
	import type { LiveSession } from '../../../routes/session/live/[sessionId]/studio/studio.svelte';

	interface Props {
		liveSession: LiveSession;
	}

	const { liveSession }: Props = $props();
</script>

{#if liveSession.isOpened}
	<div class="state-tag state-tag-open little-rounded">
		<span>opened</span>
	</div>
{:else if liveSession.isBreaked}
	<div class="state-tag state-tag-break little-rounded">
		<span>breaked</span>
	</div>
{/if}

<style lang="scss">
	.state-tag {
		padding: 5px 10px;
		&.state-tag-open {
			background-color: var(--dark-green);
			span {
				color: var(--light-green);
			}
		}

		&.state-tag-break {
			background-color: var(--dark-blue);
			span {
				color: var(--light-blue);
			}
		}
	}
</style>
