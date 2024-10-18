<script>
	import { page } from '$app/stores';
	import '../app.css';
	import SideBar from '../lib/components/sidebar/SideBar.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let data;
	const user = writable();
	$: user.set(data.user);
	setContext('user', user);
</script>

<main>
	<SideBar/>
	<div class="content">
		<slot />
	</div>
</main>

<style lang="scss">
	main {
		width: 100vw;
		height: 100vh;
		background-color: var(--bg);
		border: 0.1px solid rgba(92, 109, 255, 0.2);
		display: grid;
		grid-template-rows: 60px 10fr;
		grid-template-columns: 100px auto;
		grid-template-areas:
			'sidebar topbar'
			'sidebar content';

		.content{
			padding : 40px;
		}
	}
</style>
