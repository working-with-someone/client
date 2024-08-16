<script>
	import { page } from '$app/stores';

	const iconColor = '#DDDDDD';

	const menus = [
		{
			name: 'home',
			url: '/',
			icon: `<svg
          width="35px"
          height="35px"
          stroke-width="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#000000"
          ><path
            d="M9 21H7a4 4 0 01-4-4v-6.292a4 4 0 011.927-3.421l5-3.03a4 4 0 014.146 0l5 3.03A4 4 0 0121 10.707V17a4 4 0 01-4 4h-2m-6 0v-4a3 3 0 013-3v0a3 3 0 013 3v4m-6 0h6"
            stroke=${iconColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></svg
        >`,
			selected: false
		},
		{
			name: 'wws',
			url: '/wws',
			icon: `<svg
          width="35px"
          height="35px"
          stroke-width="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#000000"
          ><path
            d="M3 16V8a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5z"
            stroke=${iconColor}
            stroke-width="2"
          /><path
            d="M16.5 14.5s-1.5 2-4.5 2-4.5-2-4.5-2"
            stroke=${iconColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          /><path
            d="M8.5 10a.5.5 0 110-1 .5.5 0 010 1zM15.5 10a.5.5 0 110-1 .5.5 0 010 1z"
            fill="#000000"
            stroke=${iconColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></svg
        >`,
			selected: false
		},
		{
			name: 'calendar',
			url: '/calendar',
			icon: `<svg
          width="35px"
          height="35px"
          stroke-width="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#000000"
          ><path
            d="M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 002 2h14a2 2 0 002-2v-9H3zM3 10V6a2 2 0 012-2h2M7 2v4M21 10V6a2 2 0 00-2-2h-.5"
            stroke=${iconColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></svg
        >`,
			selected: false
		},
		{
			name: 'someone',
			url: '/someone',
			icon: `<svg
          width="35px"
          height="35px"
          stroke-width="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#000000"
          ><path
            d="M1 20v-1a7 7 0 017-7v0a7 7 0 017 7v1"
            stroke=${iconColor}
            stroke-width="2"
            stroke-linecap="round"
          /><path
            d="M13 14v0a5 5 0 015-5v0a5 5 0 015 5v.5"
            stroke=${iconColor}
            stroke-width="2"
            stroke-linecap="round"
          /><path
            d="M8 12a4 4 0 100-8 4 4 0 000 8zM18 9a3 3 0 100-6 3 3 0 000 6z"
            stroke=${iconColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></svg
        >`,
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
			gap: 50px;
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
