<script lang="ts">
	import type { MediaController } from '../mediaController.svelte';

	interface Props {
		mediaController: MediaController;
	}

	let { mediaController } = $props();
</script>

<div class="control-panel">
	<div class="control">
		<div class="micro">
			<button class="toggle-mute">
				<span class="material-symbols-outlined"> mic </span>
			</button>
		</div>
	</div>
	<div class="session-control">
		<div class="quit">
			<button>stop session</button>
		</div>
	</div>
</div>

<style lang="scss">
	.control-panel {
		padding-top: 15px;
		padding-bottom: 5px;
		display: flex;
		flex-direction: row;
		display: flex;
		.control {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			.micro {
				display: flex;
				align-items: center;

				.toggle-mute {
					width: 34px;
					height: 34px;
					border-radius: 17px;
					padding: 0;

					&:hover {
						background-color: var(--focus);
					}
				}
			}
		}

		.session-control {
			.quit {
				button {
					height: 34px;
					background-color: var(--font-red);
					color: var(--bg);
					padding: 5px 15px;
				}
			}
		}
	}
</style>
