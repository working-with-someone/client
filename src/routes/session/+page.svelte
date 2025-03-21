<script lang="ts">
	import SessionDeck from '$lib/components/cards/SessionDeck.svelte';
	import TopBar from '$lib/components/bar/topbar/TopBar.svelte';

	let { data } = $props();
</script>

<section id="sessions">
	<TopBar />
	<div class="decks">
		{#each data.categorizedSessionsList as categorizedSessions}
			<SessionDeck {categorizedSessions}></SessionDeck>
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
