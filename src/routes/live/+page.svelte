<script>
	import SessionDeck from '$lib/components/session/SessionDeck.svelte';
	import TopBar from '$lib/components/topbar/TopBar.svelte';

	let { data } = $props();
</script>

<section id="live-sessions">
	<TopBar />
	<div class="decks">
		{#each data.categorizedSessionsList as categorizedLiveSessions}
			<SessionDeck categorizedSessions={categorizedLiveSessions} />
		{/each}
	</div>
</section>

<style lang="scss">
	section#live-sessions {
		display: flex;
		flex-direction: column;

		.decks {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
	}
</style>
