<script lang="ts">
	import TopBar from '$lib/components/bar/topbar/TopBar.svelte';

	let { data } = $props();
</script>

<section id="home">
	<TopBar />
	<div class="decks"></div>
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
