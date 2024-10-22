<script>
	import { page } from '$app/stores';

	const menus = [
		{
			name: 'home',
			url: '/',
			icon: `<span class="menu-icon material-symbols-outlined">home</span>`,
			selected: false
		},
		{
			name: 'live',
			url: '/live',
			icon: `<span class="menu-icon material-symbols-outlined">bigtop_updates</span>`,
			selected: false
		},
		{
			name: 'calendar',
			url: '/calendar',
			icon: `<span class="menu-icon material-symbols-outlined">calendar_month</span>`,
			selected: false
		},
		{
			name: 'someone',
			url: '/someone',
			icon: `<span class="menu-icon material-symbols-outlined">group</span>`,
			selected: false
		},
		{
			name: 'sound',
			url: '/sound',
			icon: `<span class="menu-icon material-symbols-outlined">hearing</span>`,
			selected: false
		}
	];

	// root path일 때조차 ["/", ""] 가 return된다.
	const paths = $page.url.pathname.split('/');

	const selectedMenu = paths[1];

	menus.forEach((menu) => {
		if (menu.url.split('/')[1] == selectedMenu) menu.selected = true;
	});
</script>

<nav>
	<ul class="menus">
		{#each menus as menu}
			<li class="menu-item {menu.name} {menu.selected ? 'selected' : ''}">
				<button
					on:click={() => {
						window.location.href = menu.url;
					}}
				>
					{@html menu.icon}
				</button>
				<p>{menu.name}</p>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	$selected-color: #4552b4;
	nav {
		display: flex;
		align-items: start;
		justify-content: center;
		.menus {
			display: flex;
			flex-direction: column;
			gap: 20px;
			margin-top: 30px;
			justify-content: space-around;
			.menu-item {
				height: 80px;
				display: flex;
				align-items: center;
				flex-direction: column;
				&.selected {
					button {
						background-color: $selected-color;
					}
					p {
						display: block;
						color: $selected-color;
						margin-left: -100%;
						margin-right: -100%;
						text-align: center;
					}
				}
				button {
					padding: 0;
					width: 60px;
					height: 60px;
					border-radius: 30px;

					&:hover {
						background-color: $selected-color;
					}

					.menu-icon{
						font-size: 50px;
            color: white;
            margin-bottom: 5px;
            transition: color 0.3s ease-in-out;
					}
				}
				p {
					margin-top: 0.2em;
					display: none;
					text-align: center;
					position: relative;
					top: 0;
					left: 0;
					font-size: 0.8em;
				}
			}
		}
	}
</style>
