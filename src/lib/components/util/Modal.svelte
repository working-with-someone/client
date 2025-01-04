<script lang="ts">
	let { closeModal } = $props();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<div class="modal-bg" on:click|self={closeModal}>
	<div class="modal">
		<div class="header">
			<slot name="modal-header"></slot>
		</div>
		<div class="body">
			<slot name="modal-body"></slot>
		</div>
		<div class="footer">
			<slot name="modal-footer"></slot>
		</div>
	</div>
</div>

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
			padding: 10px;
			border-radius: 15px;
		}
	}
</style>
