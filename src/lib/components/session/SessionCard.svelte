<script lang="ts">
	import type { Session } from '../../../@types/video';
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	export let session: Session;

	function convertMinutesToHHMMSS(minutes: number) {
		// 초 단위로 변환
		const totalSeconds = Math.floor(minutes * 60);

		// 시간, 분, 초 계산
		const hours = Math.floor(totalSeconds / 3600);
		const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		// 두 자리 형식으로 변환
		const formattedHours = String(hours).padStart(2, '0');
		const formattedMinutes = String(minutesLeft).padStart(2, '0');
		const formattedSeconds = String(seconds).padStart(2, '0');

		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	}
</script>

<div class="card middle-rounded">
	<div class="body">
		<div class="thumbnail-wrapper">
			<img src={session.thumbnail} alt="" class="thumbnail" />
			<p class="duration middle-roundedn">{convertMinutesToHHMMSS(session.time)}</p>
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
			.duration {
				position: absolute;
				bottom: 10px;
				right: 10px;
				padding: 5px 10px;
				font-size: 12px;
				border-radius: 20px;
				background-color: rgba(0, 0, 0, 0.7);
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
