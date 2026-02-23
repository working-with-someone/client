<script>
	import LiveSessionDeck from '$lib/components/cards/LiveSessionDeck.svelte';
	import TopBar from '$lib/components/bar/topbar/TopBar.svelte';

	let { data } = $props();

	const pCategorizedLiveSessionList = data.pCategorizedLiveSessionsList;
</script>

<section id="live-sessions">
	<TopBar />
	<div class="decks">
		{#each pCategorizedLiveSessionList as pCategorizedLiveSessions}
			<LiveSessionDeck
				category={pCategorizedLiveSessions[0]}
				liveSessions={pCategorizedLiveSessions[1]}
			/>
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
