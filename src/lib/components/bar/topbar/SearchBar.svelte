<script>
</script>

<section id="search-bar">
	<div class="search-box">
		<input class="search-input" type="text" placeholder="search" />
		<span class="material-symbols-outlined"> search </span>
	</div>
</section>

<style lang="scss">
	section#search-bar {
		display : flex;
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
				width : 250px;
				background-color: var(--bg-button);
				font-size : 0.8em;
				border: none;
			}
		}
	}
</style>
