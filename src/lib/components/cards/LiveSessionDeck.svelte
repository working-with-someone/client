<script lang="ts">
	import type { LiveSessionWithAll } from '../../../types/session';
	import LiveSessionCard from './LiveSessionCard.svelte';

	interface Props {
		category: string;
		liveSessions: LiveSessionWithAll[];
	}

	let { category, liveSessions }: Props = $props();
</script>

<div class="deck middle-rounded">
	<div class="label">
		<span>{category}</span>
	</div>
	{#if liveSessions.length}
		<div class="sessions">
			{#each liveSessions as liveSession}
				<LiveSessionCard {liveSession} />
			{/each}
		</div>
	{:else}
		<div class="placeholder-card">
			<p class="placeholder-text">No live sessions available</p>
		</div>
	{/if}
</div>

<style lang="scss">
	.deck {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 10px 25px;
		background-color: var(--bg-sideBar);
		.label {
		}
		.sessions {
			display: flex;
			flex-direction: row;
			gap: 25px;
			overflow-x: scroll;
			padding: 10px 0px;
		}
		.placeholder-card {
			width: 320px;
			height: 323px;
			background-color: var(--bg);
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 8px;
			margin: 10px 0px;
		}
	}
</style>
