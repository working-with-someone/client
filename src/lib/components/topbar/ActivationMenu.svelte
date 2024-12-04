<script lang="ts">
	import Modal from '../util/Modal.svelte';
	import SessionUploadConfig from '../configuration/SessionUploadConfig.svelte';
	import LiveConfig from '../configuration/LiveConfig.svelte';

	function closeSessionUploadModal() {
		showSessionUploadModal = false;
	}

	function openSessionUploadModal() {
		showSessionUploadModal = true;
	}

	let showSessionUploadModal = false;

	function openLiveConfigModal(){
		showLiveConfigModal = true;
	}

	function closeLiveConfigModal(){
		showLiveConfigModal = false;
	}

	let showLiveConfigModal = false;
</script>

<div class="activation-menus">
	<button class="menu-item open-session" on:click={openLiveConfigModal}>
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

<Modal bind:showModal={showLiveConfigModal}>
	<LiveConfig slot="modal-body" on:closeLiveConfigModal = {closeLiveConfigModal}></LiveConfig>
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
