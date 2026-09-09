<script lang="ts">
	import CategorizedVideoSessionDeck from '$lib/components/cards/CategorizedVideoSessionDeck.svelte';
	import TopBar from '$lib/components/bar/topbar/TopBar.svelte';
	import RandomizedVideoSessionDeck from '$lib/components/cards/RandomizedVideoSessionDeck.svelte';

	let { data } = $props();

	const pCategorizedVideoSessionsBodyList = $derived(data.pCategorizedVideoSessionsBodyList);
	const randomizedVideoSessionsBody = $derived(data.randomizedVideoSessionsBody);
</script>

<section id="sessions">
	<TopBar />
	<div class="decks">
		{#each pCategorizedVideoSessionsBodyList as pCategorizedVideoSessionBody}
			<CategorizedVideoSessionDeck
				category={pCategorizedVideoSessionBody[0]}
				videoSessions={pCategorizedVideoSessionBody[1].data}
				pagination={pCategorizedVideoSessionBody[1].pagination}
			/>
		{/each}

		<RandomizedVideoSessionDeck
			videoSessions={randomizedVideoSessionsBody.data}
			pagination={randomizedVideoSessionsBody.pagination}
		></RandomizedVideoSessionDeck>
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
