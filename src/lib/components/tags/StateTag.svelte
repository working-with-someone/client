<script lang="ts">
	import { live_session_status } from '@prisma/client';

	interface Props {
		state: live_session_status;
	}

	const { state }: Props = $props();
</script>

{#if state == live_session_status.OPENED}
	<div class="state-tag state-tag-open little-rounded">
		<span>opened</span>
	</div>
	{:else if state  == live_session_status.READY}
	<div class="state-tag state-tag-ready little-rounded">
		<span>ready</span>
	</div>
{:else if state == live_session_status.BREAKED}
	<div class="state-tag state-tag-break little-rounded">
		<span>breaked</span>
	</div>
{/if}

<style lang="scss">
	.state-tag {
		display: inline-block;
		padding: 5px 10px;
				&.state-tag-ready {
			background-color: var(--dark-orange);
			span {
				color: var(--light-orange);
			}
		}

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
