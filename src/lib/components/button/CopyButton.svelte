<script lang="ts">
	let isCopied = $state(false);

	function handleCopy() {
		if (isCopied) return;

		const currentUrl = window.location.href;

		navigator.clipboard.writeText(currentUrl).then(() => {
			isCopied = true;

			setTimeout(() => {
				isCopied = false;
			}, 1000);
		});
	}
</script>

<button class="copy-link-btn" onclick={handleCopy}>
	<span class="material-symbols-outlined link-icon"> link_2 </span>
	{#if isCopied}
		<span class="copy-link-prompt"> copied </span>
	{:else}
		<span class="copy-link-prompt"> copy </span>
	{/if}
</button>

<style lang="scss">
	.copy-link-btn {
		background-color: transparent;
		padding: 0px 10px;

		.copy-link-prompt {
			padding: 0px 10px;
			line-height: 25px;
		}
	}
</style>
