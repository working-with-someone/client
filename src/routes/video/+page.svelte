<script lang="ts">
	import CategorizedVideoSessionDeck from '$lib/components/cards/CategorizedVideoSessionDeck.svelte';
	import TopBar from '$lib/components/bar/topbar/TopBar.svelte';

	let { data } = $props();

	const pCategorizedVideoSessionList = data.pCategorizedVideoSessionsList;
</script>

<section id="sessions">
	<TopBar />
	<div class="decks">
		{#each pCategorizedVideoSessionList as pCategorizedVideoSession}
			<CategorizedVideoSessionDeck
				category={pCategorizedVideoSession[0]}
				videoSessions={pCategorizedVideoSession[1]}
			/>
		{/each}
	</div>
</section>

<style lang="scss">
	section#sessions {
		display: flex;
		flex-direction: column;

		.decks {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
	}
</style>
