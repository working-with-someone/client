<script>
	export let showModal;
</script>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<div class="modal-bg">
		<div class="modal">
			<slot></slot>
		</div>
	</div>
{/if}

<style lang="scss">
	.modal-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.8);

		.modal {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: var(--bg);
			padding: 2em;
			border-radius: 15px;
		}
	}
</style>
