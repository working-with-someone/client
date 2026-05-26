<script lang="ts">
	interface Props {
		size: number;
	}

	const { size } = $props();
</script>

<span class="loader" style="width : {size}px; height : {size}px;"></span>

<style lang="scss">
	.loader {
		border-radius: 50%;
		display: inline-block;
		border-top: 3px solid #fff;
		border-right: 3px solid transparent;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
