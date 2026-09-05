<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let search = $state(page.url.searchParams.get('search') ?? '');

	async function submitSearch() {
		const searchParams = new URLSearchParams(page.url.searchParams);
		const trimmedSearch = search.trim();

		if (trimmedSearch) {
			searchParams.set('search', trimmedSearch);
		} else {
			searchParams.delete('search');
		}

		await goto(`${page.url.pathname}?${searchParams.toString()}`);
	}
</script>

<section id="search-bar">
	<form
		class="search-box"
		onsubmit={(event) => {
			event.preventDefault();
			submitSearch();
		}}
	>
		<input bind:value={search} class="search-input" type="text" placeholder="search" />
		<span class="material-symbols-outlined"> search </span>
	</form>
</section>

<style lang="scss">
	section#search-bar {
		display: flex;
		justify-content: center;
		.search-box {
			width: 300px;
			padding: 2px 0;
			border-radius: 10px;
			display: flex;
			background-color: var(--bg-button);
			justify-content: center;
			align-items: center;
			.search-input {
				width: 250px;
				background-color: var(--bg-button);
				font-size: 0.8em;
				border: none;
			}
		}
	}
</style>
