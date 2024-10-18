<script>
	import SearchBar from '$lib/components/searchbar/SearchBar.svelte';
</script>

<section id="home">
	<SearchBar></SearchBar>

	<section class="content" id="home-live">
    <div class="title">
      <span class="material-symbols-outlined"> bigtop_updates </span>
    </div>
	</section>

	<section class="content" id="home-study">
    <div class="title">
      <span class="material-symbols-outlined"> edit </span>
      <span>study</span>
		</div>
	</section>

	<section class="content" id="home-ready">
		<div class="title">
			<span class="material-symbols-outlined"> congenital </span> 
			<span>get ready</span> 
		</div>
	</section>
</section>

<style lang="scss">
	section#home {
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30px;

		.content {
			.title {
        display : flex;
        align-items: center;
        gap : 10px;
				padding: 5px;
			}
		}
	}
</style>
