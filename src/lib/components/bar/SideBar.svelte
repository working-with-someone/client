<script>
	import Nav from './NavBar.svelte';
	import Avatar from '../profile/Avatar.svelte';
	import { getContext } from 'svelte';

	const user = getContext('user');
</script>

<section id="side-bar">
	<div class="logo">
		<img src="/favicon.png" alt="" />
	</div>
	<Nav />
	<Avatar />
</section>

<style lang="scss">
	section#side-bar {
		grid-area: sidebar;
		background-color: var(--bg-sideBar);
		display: grid;
		grid-template-rows: 60px 8fr 50px;
		gap: 10px;
		padding: 20px 0;
		.logo {
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 35px;
			}
		}
	}
</style>
