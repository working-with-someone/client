<script>
	import '../app.css';
	import SideBar from '../lib/components/bar/SideBar.svelte';
	import { setContext } from 'svelte';
	import { user } from '$lib/store/user';

	export let data;

	$: user.set(data.user);
	setContext('user', user);
</script>

<main>
	<SideBar />
	<div class="content">
		<slot />
	</div>
</main>

<style lang="scss">
	main {
		width: 100%;
		height: 100vh;
		background-color: var(--bg);
		border: 0.1px solid rgba(92, 109, 255, 0.2);
		display: grid;
		grid-template-columns: 100px calc(100% - 100px);
		grid-template-areas: 'sidebar content';
		.content {
			width: 100%;
			overflow: scroll;
			padding: 20px;
		}
	}
</style>
