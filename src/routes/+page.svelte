<script lang="ts">
	import type { CategorizedSessions } from '../@types/session';
	import SessionDeck from '$lib/components/session/SessionDeck.svelte';
	import TopBar from '$lib/components/topbar/TopBar.svelte';

	let { data } = $props();

	const categorizedsessionsList: CategorizedSessions[] = data.categorizedSessionsList;
</script>

<section id="home">
	<TopBar />
	<div class="decks">
		{#each categorizedsessionsList as categorizedSessions}
			<SessionDeck {categorizedSessions}></SessionDeck>
		{/each}
	</div>
</section>

<style lang="scss">
	section#home {
		display: flex;
		flex-direction: column;
		.decks {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
	}
</style>
