<script>
	import SearchBar from "./SearchBar.svelte";
	import ActivationMenu from "./ActivationMenu.svelte";
</script>

<section id="top-bar">
	<div class="start">

	</div>
	<div class="center">
		<SearchBar />
	</div>
	<div class="end">
		<ActivationMenu />
	</div>

</section>

<style lang="scss">
	section#top-bar {
		background-color: var(--bg);
		-webkit-app-region: drag;

		display : flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom : 20px;
		
		.start{
			width : 200px;
		}
		.end {
			width : 200px;
			display : flex;
			justify-content: end;
		}
		
	}
</style>
