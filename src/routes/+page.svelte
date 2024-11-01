<script>
	import SessionDeck from '$lib/components/session/SessionDeck.svelte';
	import TopBar from '$lib/components/topbar/TopBar.svelte';
	export let data;
</script>

<section id="home">
	<TopBar />
	<div class="decks">
		{#each data.categorizedSessionsList as categorizedSessions}
			<SessionDeck {categorizedSessions}></SessionDeck>
		{/each}
	</div>
</section>

<style lang="scss">
	section#home {
		display: flex;
		flex-direction: column;
		.decks{
			display: flex;
			flex-direction: column;
			gap : 20px;
		}
	}
</style>
