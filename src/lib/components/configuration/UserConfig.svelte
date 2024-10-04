<script>
	import { VITE_API_SERVER_DOMAIN } from '$env/static/private';
	export let user;
</script>

<section id="user-config">
  <div class="header">My Profile</div>
	<div class="profile">
		<div class="pfp">
			<img src={`${VITE_API_SERVER_DOMAIN}/media/images/${user.pfp.curr}`} />
		</div>
		<div class="name">
			<p class = "text-blur">username</p>
			<p class = "username">seungho-hub</p>
		</div>
	</div>
	<div class="security"></div>
	<div class="support"></div>
</section>

<style lang="scss">
	section#user-config {
		display: grid;
    gap : 20px;
		.profile {
			display: flex;
			flex-direction: row;
      align-items: center;
      gap : 20px;
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
			.name {
				display: flex;
				flex-direction: column;
        gap : 10px;
				p{
          font-size : 0.7em;
					color: var(--font-light-gray);
          padding : 0 10px;
				}
        .username{
          color : none;
        }
			}
		}
	}
</style>
