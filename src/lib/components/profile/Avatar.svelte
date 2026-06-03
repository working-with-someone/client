<script>
	import Modal from '../modals/Modal.svelte';
	import UserConfig from '../configuration/ProfileConfig.svelte';
	import { getContext } from 'svelte';
	import Pfp from '../user/pfp.svelte';

	const user = getContext('user');

	let showUserConfigModal = $state(false);

	function closeUserConfigModal() {
		showUserConfigModal = false;
	}

	function openUserConfigModal() {
		showUserConfigModal = true;
	}
</script>

<button class="avatar" onclick={openUserConfigModal} aria-hidden="true">
	<Pfp pfpUri={$user.pfp.curr} size={46} />
</button>

{#if showUserConfigModal}
	<Modal closeModal={closeUserConfigModal}>
		<UserConfig slot="modal-body" {closeUserConfigModal} />
	</Modal>
{/if}

<style lang="scss">
	.avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		&:hover {
			cursor: pointer;
		}
	}
</style>
