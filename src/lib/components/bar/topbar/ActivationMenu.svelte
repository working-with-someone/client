<script lang="ts">
	import Modal from '../../modals/Modal.svelte';
	import LiveSessionCreationConfig from '../../configuration/LiveSessionCreantionConfig.svelte';
	import VideoSessionUploadConfig from '../../configuration/VideoSessionCreationConfig.svelte';

	function closeSessionUploadModal() {
		showSessionUploadModal = false;
	}

	function openSessionUploadModal() {
		showSessionUploadModal = true;
	}

	let showSessionUploadModal = $state(false);

	function openLiveSessionConfigModal() {
		showLiveConfigModal = true;
	}

	function closeLiveSessionConfigModal() {
		showLiveConfigModal = false;
	}

	let showLiveConfigModal = $state(false);
</script>

<div class="activation-menus">
	<button class="menu-item open-session" onclick={openLiveSessionConfigModal}>
		<span class="material-symbols-outlined"> radio_button_checked </span>
	</button>

	<button class="menu-item upload-session" onclick={openSessionUploadModal}>
		<span class="material-symbols-outlined"> video_call </span>
	</button>
</div>

{#if showSessionUploadModal}
	<Modal closeModal={closeSessionUploadModal}>
		<VideoSessionUploadConfig slot="modal-body"></VideoSessionUploadConfig>
	</Modal>
{/if}

{#if showLiveConfigModal}
	<Modal closeModal={closeLiveSessionConfigModal}>
		<LiveSessionCreationConfig slot="modal-body"></LiveSessionCreationConfig>
	</Modal>
{/if}

<style lang="scss">
	.activation-menus {
		display: flex;
		flex-direction: row;
		gap: 5px;
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
