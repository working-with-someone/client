<script>
	import { VITE_API_SERVER_DOMAIN } from '$env/static/private';
	import Modal from '../util/Modal.svelte';
	import UserConfig from '../configuration/UserConfig.svelte';
	export let user;

	let showModal = false;
</script>

<div
	class="avatar"
	on:click={() => {
		showModal = true;
	}}
>
	<div class="pfp">
		<img src={`${VITE_API_SERVER_DOMAIN}/media/images/${user.pfp.curr}`} />
	</div>
</div>

<Modal {showModal}>
	<UserConfig {user}></UserConfig>
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
