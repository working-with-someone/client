<script lang="ts">
	import type { Session } from '../../../@types/video';
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	export let session: Session;
</script>

<div class="card middle-rounded">
	<div class="body">
		<div class="thumbnail-wrapper">
			<img src={session.thumbnail} alt="" class="thumbnail" />
			<span class="material-symbols-outlined live-icon"> bigtop_updates </span>
		</div>
	</div>
	<div class="footer">
		<div
			class="pfp-wrapper"
			on:click={() => {
				window.location.href = `/user/${session.user.id}`;
			}}
		>
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
		background-color: var(--bg);
		overflow: hidden;
		flex: 0 0 300px;
		width: 301px;
		.body {
			width: 301px;
			height: 170px;
			.thumbnail-wrapper {
				width: 301px;
				height: 170px;
				position: relative;
				.thumbnail {
					width: 100%;
				}
			}
			.live-icon {
				position: absolute;
				bottom: 10px;
				right: 10px;
				padding: 5px 10px;
				font-size: 20px;
				border-radius: 20px;
				color: var(--sig);
				background-color: rgba(0, 0, 0, 0.6);
			}
		}

		.footer {
			width: 301px;
			height: 55px;
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
			.info {
				width: 241px;
				height: 55px;
				.title {
					width: 100%;
					font-size: 12px;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.username {
					font-size: 10px;
					color: rgba(255, 255, 255, 0.5);
				}
			}
		}
	}
</style>
