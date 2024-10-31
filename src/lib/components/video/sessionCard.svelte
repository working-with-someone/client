<script lang="ts">
	import type { Session } from '../../../@types/video';
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	export let session: Session;
</script>

<div class="card middle-rounded">
	<div class="body">
		<div class="thumbnail-wrapper">
			<img src={session.thumbnail} alt="" class="thumbnail" />
		</div>
		<p class="duration middle-roundedn">342:23</p>
	</div>
	<div class="footer">
		<div class="pfp">
			<img
				src={new URL(`${session?.user?.pfp?.curr}`, PUBLIC_API_SERVER_DOMAIN).toString()}
				alt=""
			/>
		</div>
		<div class="info">
			<p class="title">{session.title}</p>
      <p class="username">{session.user.username}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.card {
		background-color: var(--bg-sideBar);
		overflow: hidden;
		width: 300px;

		.body {
			.thumbnail-wrapper {
				.thumbnail {
					width: 100%;
				}
			}
      .duration{
        position : absolute;
        bottom : 0;
        right : 0;
        background-color: rgba(0, 0, 0, 0.7);
      }
		}

		.footer {
			display: flex;
			flex-direction: row;
			gap: 10px;
			padding: 10px;
			.pfp {
				width: 30px;
				height: 30px;
				border-radius: 15px;
				overflow: hidden;
				img {
					width: 100%;
					object-fit: cover;
				}
			}
			.title {
				font-size: 12px;
				text-align: center;
			}
			.username {
				font-size: 10px;
				color: rgba(255, 255, 255, 0.5);
			}
		}
	}
</style>
