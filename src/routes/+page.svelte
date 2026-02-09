<script lang="ts">
	import type { CategorizedSessions } from '../types/session';
	import SessionDeck from '$lib/components/cards/VideoSessionDeck.svelte';
	import TopBar from '$lib/components/bar/topbar/TopBar.svelte';

	let { data } = $props();

	const categorizedVideoSessionsList = data.categorizedSessionsList;
</script>

<section id="home">
	<TopBar />
	<div class="decks">
		<!-- {#each categorizedVideoSessionsList as categorizedVideoSessions}
			<SessionDeck
				category={categorizedVideoSessions[0]}
				videoSessions={categorizedVideoSessions[1]}
			/>
		{/each} -->
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
