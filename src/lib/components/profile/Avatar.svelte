<script>
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	import Modal from '../util/Modal.svelte';
	import UserConfig from '../configuration/UserConfig.svelte';
	import { getContext } from 'svelte';

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
	<div class="pfp">
		<img
			src={`${PUBLIC_API_SERVER_DOMAIN}${$user.pfp.curr}`}
			alt={`${PUBLIC_API_SERVER_DOMAIN}/media/images/default/pfp`}
		/>
	</div>
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

		.pfp {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 46px;
			height: 46px;
			border-radius: 23px;
			overflow: hidden;
			img {
				width: 100%;
			}
		}
	}
</style>
