<script>
	export let data;
	import SessionCard from '$lib/components/video/sessionCard.svelte';
</script>

<section id="sessions">
	<div class="deck">
		{#each data.sessions as session}
			<SessionCard {session} />
		{/each}
	</div>
</section>

<style lang="scss">
	section#sessions {
		.deck {
			display: flex;
			flex-direction: row;
			gap: 20px;
		}
	}
</style>
