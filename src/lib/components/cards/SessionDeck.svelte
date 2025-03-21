<script lang="ts">
	import type { CategorizedSessions } from '../../../@types/session';
	import SessionCard from './SessionCard.svelte';
	import LiveSessionCard from './LiveSessionCard.svelte';

	interface Props {
		categorizedSessions: CategorizedSessions;
	}
	let { categorizedSessions }: Props = $props();

	const { category, sessions } = categorizedSessions;
</script>

<div class="deck middle-rounded">
	<div class="label">
		<span>{category}</span>
	</div>
	<div class="sessions">
		{#each sessions as session}
			{#if session.isLive}
				<LiveSessionCard {session} />
			{:else}
				<SessionCard {session} />
			{/if}
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
