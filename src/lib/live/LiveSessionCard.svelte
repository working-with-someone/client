<script lang="ts">
	import type { LiveSession } from '../../@types/video';
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	export let liveSession: LiveSession;
</script>

<div class="card middle-rounded">
	<div class="body">
		<div class="thumbnail-wrapper">
			<img src={liveSession.thumbnail} alt="" class="thumbnail" />
			<span class="live-icon material-symbols-outlined">bigtop_updates</span>
		</div>
	</div>
	<div class="footer">
		<div
			class="pfp-wrapper"
			on:click={() => {
				window.location.href = `/user/${liveSession.user.id}`;
			}}
		>
			<img
				src={new URL(`${liveSession?.user?.pfp?.curr}`, PUBLIC_API_SERVER_DOMAIN).toString()}
				alt=""
			/>
		</div>
		<div class="info">
			<p class="title">{liveSession.title}</p>
			<p class="username">{liveSession.user.username}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.card {
		background-color: var(--bg-sideBar);
		overflow: hidden;
		width: 300px;
		border : 0.5px solid var(--font-red);

		.body {
			.thumbnail-wrapper {
				position: relative;
				.thumbnail {
					width: 100%;
				}
			}
			.live-icon {
				position: absolute;
				bottom: 10px;
				right: 10px;
				padding: 2px;
				font-size: 20px;
				border-radius: 20px;
				color : var(--font-red);
				background-color: rgba(0, 0, 0, 0.7);
			}
		}

		.footer {
			display: flex;
			flex-direction: row;
			gap: 10px;
			padding: 10px;
			.pfp-wrapper {
				width: 30px;
				height: 30px;
				border-radius: 15px;
				overflow: hidden;
				&:hover {
					cursor: pointer;
				}
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
