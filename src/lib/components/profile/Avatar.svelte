<script>
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	import Modal from '../util/Modal.svelte';
	import UserConfig from '../configuration/UserConfig.svelte';
	import { getContext } from 'svelte';
	import { setContext } from 'svelte';
	
	const user = getContext('user');

	function closeUserConfigModal() {
		showUserConfigModal = false;
	}

	let showUserConfigModal = false;
</script>

<div
	class="avatar"
	on:click={() => {
		showUserConfigModal = true;
	}}
>
	<div class="pfp">
		<img src={`${PUBLIC_API_SERVER_DOMAIN}${$user.pfp.curr}`} />
	</div>
</div>

<Modal bind:showModal={showUserConfigModal}>
	<UserConfig slot="modal-body" on:closeUserConfigModal={closeUserConfigModal}/>
</Modal>

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

	.body {
	}
</style>
