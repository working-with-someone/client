<script lang="ts">
	import type { PageData } from './$types';
	import { to } from '../../../../config/path.config.svelte';
	import VideoPlayer from '$lib/components/Player/VideoPlayer.svelte';
	import Pfp from '$lib/components/user/pfp.svelte';
	import FollowBtn from '$lib/components/user/followBtn.svelte';

	const { data }: { data: PageData } = $props();
	const videoSession = data.videoSession;
</script>

<section id="video-session">
	<div class="container">
		<div class="left">
			<div class="video-zone">
				<VideoPlayer videoSrc={to.mediaServer.staticServer.video + videoSession.video_id} />
			</div>

			<div class="video-info">
				<div class="title">
					<h5>{videoSession.title}</h5>
				</div>
				<div class="top">
					<div class="organizer-info">
						<div class="pfp">
							<Pfp pfpUri={videoSession.organizer.pfp.curr} size={30} />
						</div>
						<div class="username">
							<p>{videoSession.organizer.username}</p>
						</div>
						<div class="follow">
							<FollowBtn targetUserId={videoSession.organizer.id}>
								{#snippet children({ isFollowing, follow, unfollow })}
									{#if isFollowing}
										<button class="unfollow-btn btn-gray" onclick={unfollow}>unfollow</button>
									{:else}
										<button class="follow-btn btn-sig" onclick={follow}>follow</button>
									{/if}
								{/snippet}
							</FollowBtn>
						</div>
					</div>
				</div>
				<div class="mid">
					<div class="description middle-rounded">
						<p>{videoSession.description}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="right">
			<div class="body"></div>
		</div>
	</div>
</section>

<style lang="scss">
	$recommended-width: 300px;

	section#video-session {
		width: 100%;
		height: 100vh;
		max-height: 100vh;
		display: flex;
		justify-content: center;
		background-color: var(--bg-sideBar);
		overflow: hidden;

		.container {
			max-width: 2000px;
			width: 100%;
			height: 100%;
			padding: 20px;
			gap: 20px;
			display: flex;
			flex-direction: row;

			@media (max-width: 800px) {
				flex-direction: column;
				overflow-y: auto;
			}
		}

		.left {
			flex: 1;
			display: flex;
			flex-direction: column;
			min-width: 0;
			height: 100%;
			overflow-y: auto;

			&::-webkit-scrollbar {
				display: none;
			}
			-ms-overflow-style: none;
			scrollbar-width: none;

			/* 🌟 부모가 제공하는 완벽한 16:9 유튜브형 비디오 존 */
			.video-zone {
				width: 100%;
				aspect-ratio: 16 / 9; /* 가로/세로 비디오 상관없이 플레이어 틀은 16:9 유지 */
				max-height: calc(70vh - 40px); /* 세로 화면이 줄어들 때 화면 밖 탈출 방지 */
				margin-bottom: 15px;
				border-radius: 12px;
				overflow: hidden;
				background-color: #000;
			}

			.title h5 {
				font-size: 1.2rem;
				margin: 0 0 10px 0;
			}

			.top {
				margin-bottom: 10px;
				display: flex;
				flex-direction: column;
				gap: 10px;
				.organizer-info {
					display: flex;
					flex-direction: row;
					align-items: center;
					gap: 10px;
					font-size: 0.9em;

					.follow {
						button {
							width: 80px;
							padding: 5px 10px;
						}
					}
				}
			}

			.mid {
				.description {
					padding: 12px;
					background-color: var(--mid-gray);
					border-radius: 8px;
				}
			}
		}

		.right {
			width: $recommended-width;
			min-width: $recommended-width;
			height: 100%;
			background-color: var(--black);
			border-radius: 12px;

			@media (max-width: 800px) {
				width: 100%;
				min-width: 100%;
				height: auto;
				min-height: 300px;
			}
		}
	}
</style>
