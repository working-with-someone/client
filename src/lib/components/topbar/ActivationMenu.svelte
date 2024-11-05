<script lang="ts">
	import Modal from '../util/Modal.svelte';
	import SessionUploadConfig from '../configuration/SessionUploadConfig.svelte';

	function closeSessionUploadModal() {
		showSessionUploadModal = false;
	}

	function openSessionUploadModal() {
		showSessionUploadModal = true;
	}

	let showSessionUploadModal = false
</script>

<div class="activation-menus">
	<button class="menu-item open-session">
		<span class="material-symbols-outlined"> radio_button_checked </span>
	</button>

	<button class="menu-item upload-session" on:click={openSessionUploadModal}>
		<span class="material-symbols-outlined"> video_call </span>
	</button>
</div>

<Modal bind:showModal={showSessionUploadModal}>
	<SessionUploadConfig slot="modal-body" on:closeSessionUploadModal={closeSessionUploadModal}
	></SessionUploadConfig>
</Modal>

<style lang="scss">
	.activation-menus {
		.menu-item.open-session {
			&:hover {
				span {
					color: var(--font-red);
				}
			}
		}

		.menu-item.upload-session {
			&:hover {
				span {
					color: var(--sig);
				}
			}
		}
	}
</style>
