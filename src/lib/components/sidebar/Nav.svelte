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
			name: 'live',
			url: '/live',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="35" viewBox="0 0 34 35" fill="none">
				<mask id="mask0_3_43" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="35">
				<rect y="0.0593262" width="34" height="34" fill="#D9D9D9"/>
				</mask>
				<g mask="url(#mask0_3_43)">
				<path d="M7.0125 24.2135C5.66667 22.8677 4.63368 21.3388 3.91354 19.627C3.1934 17.9152 2.83333 16.1149 2.83333 14.226C2.83333 12.3371 3.1934 10.5368 3.91354 8.82495C4.63368 7.11315 5.66667 5.58433 7.0125 4.23849L8.7125 5.93849C7.60278 7.04822 6.74688 8.31731 6.14479 9.74579C5.54271 11.1743 5.24167 12.6677 5.24167 14.226C5.24167 15.7843 5.54271 17.2777 6.14479 18.7062C6.74688 20.1347 7.60278 21.4038 8.7125 22.5135L7.0125 24.2135ZM10.2708 20.9552C9.37361 20.0579 8.68889 19.0309 8.21667 17.8739C7.74445 16.717 7.50833 15.501 7.50833 14.226C7.50833 12.951 7.74445 11.735 8.21667 10.5781C8.68889 9.42113 9.37361 8.39405 10.2708 7.49683L11.9708 9.19683C11.2861 9.88155 10.7726 10.6548 10.4302 11.5166C10.0878 12.3784 9.91667 13.2816 9.91667 14.226C9.91667 15.1704 10.0878 16.0736 10.4302 16.9354C10.7726 17.7972 11.2861 18.5704 11.9708 19.2552L10.2708 20.9552ZM15.5833 29.8093V17.4843C14.9458 17.201 14.4323 16.7642 14.0427 16.1739C13.6531 15.5836 13.4583 14.9343 13.4583 14.226C13.4583 13.2343 13.8007 12.3961 14.4854 11.7114C15.1701 11.0267 16.0083 10.6843 17 10.6843C17.9917 10.6843 18.8299 11.0267 19.5146 11.7114C20.1993 12.3961 20.5417 13.2343 20.5417 14.226C20.5417 14.9343 20.3469 15.5836 19.9573 16.1739C19.5677 16.7642 19.0542 17.201 18.4167 17.4843V29.8093H15.5833ZM23.7292 20.9552L22.0292 19.2552C22.7139 18.5704 23.2274 17.7972 23.5698 16.9354C23.9122 16.0736 24.0833 15.1704 24.0833 14.226C24.0833 13.2816 23.9122 12.3784 23.5698 11.5166C23.2274 10.6548 22.7139 9.88155 22.0292 9.19683L23.7292 7.49683C24.6264 8.39405 25.3111 9.42113 25.7833 10.5781C26.2556 11.735 26.4917 12.951 26.4917 14.226C26.4917 15.501 26.2556 16.717 25.7833 17.8739C25.3111 19.0309 24.6264 20.0579 23.7292 20.9552ZM26.9875 24.2135L25.2875 22.5135C26.3972 21.4038 27.2531 20.1347 27.8552 18.7062C28.4573 17.2777 28.7583 15.7843 28.7583 14.226C28.7583 12.6677 28.4573 11.1743 27.8552 9.74579C27.2531 8.31731 26.3972 7.04822 25.2875 5.93849L26.9875 4.23849C28.3333 5.58433 29.3663 7.11315 30.0865 8.82495C30.8066 10.5368 31.1667 12.3371 31.1667 14.226C31.1667 16.1149 30.8066 17.9152 30.0865 19.627C29.3663 21.3388 28.3333 22.8677 26.9875 24.2135Z" fill="#DDDDDD"/>
				</g>
				</svg>`,
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
