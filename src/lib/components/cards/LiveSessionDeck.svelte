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
	<div class="sessions">
		{#each liveSessions as liveSession}
			<LiveSessionCard {liveSession} />
		{/each}
	</div>
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
			margin-top: 20px;
			gap: 25px;
			overflow-x: scroll;
		}
	}
</style>
