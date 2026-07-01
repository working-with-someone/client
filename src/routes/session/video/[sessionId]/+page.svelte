<script lang="ts">
	import type { PageData } from './$types';
	import { to } from '../../../../config/path.config.svelte';
	import VideoPlayer from '$lib/components/Player/VideoPlayer.svelte';
	import Pfp from '$lib/components/user/pfp.svelte';
	import FollowBtn from '$lib/components/user/followBtn.svelte';
	import wwsfetch from '$lib/utils/wwsfetch';
	import { getContext, onMount } from 'svelte';
	import CopyButton from '$lib/components/button/CopyButton.svelte';
	import AutoResizeTextarea from '$lib/components/input/AutoResizeTextarea.svelte';
	import CommentList from '$lib/components/videoSession/CommentList.svelte';
	import type { CommentWithAll } from '../../../../types/comment';
	import Like from '$lib/components/shared/Like.svelte';
	import moveTo from '$lib/utils/navigation';

	const { data }: { data: PageData } = $props();
	const videoSession = data.videoSession;

	const user = getContext('user');
	let isLiked = $state(false);

	function toggleLike() {
		if (!isLiked) {
			wwsfetch(`/sessions/video/${videoSession.id}/like`, {
				method: 'POST'
			}).then(() => {
				isLiked = !isLiked;
				videoSession._count.likes += 1;
			});
		} else {
			wwsfetch(`/sessions/video/${videoSession.id}/like`, {
				method: 'DELETE'
			}).then(() => {
				isLiked = !isLiked;
				videoSession._count.likes -= 1;
			});
		}
	}

	let commentInput: string = $state('');
	let comments: CommentWithAll[] = $state([]);

	function createComment() {
		wwsfetch(`/sessions/video/${videoSession.id}/comment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: commentInput
			})
		})
			.then((res) => res.json())
			.then((body) => {
				const createdComment = body.data;

				comments.unshift(createdComment);
			});
	}

	onMount(() => {
		wwsfetch(`/sessions/video/${videoSession.id}/like`, {
			method: 'GET'
		}).then((res) => {
			if (res.status === 200) {
				isLiked = true;
			}
		});
	});
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
						<div class="pfp clickable" onclick={() => moveTo.user(videoSession.organizer.id)}>
							<Pfp pfpUri={videoSession.organizer.pfp.curr} size={30} />
						</div>
						<div class="username clickable" onclick={() => moveTo.user(videoSession.organizer.id)}>
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
					<div class="video-activation-btns">
						<div class="like activation-btn">
							<button class="like-btn" class:active={isLiked} onclick={toggleLike}>
								<Like {isLiked} animationEnabled={true}></Like>
								<span class="like-count">{videoSession._count.likes} </span>
							</button>
						</div>
						<div class="copy-link activation-btn">
							<CopyButton></CopyButton>
						</div>
						<!-- <div class="save activation-btn">
							<button class="save-btn">
								<span class="material-symbols-outlined"> collections_bookmark </span>
								<span>save</span>
							</button>
						</div> -->
					</div>
				</div>
				<div class="mid">
					<div class="description middle-rounded">
						<p>{videoSession.description}</p>
					</div>
				</div>
				<div class="bottom">
					<div class="comment-header">
						<h4>Comment ({videoSession.comment_count})</h4>
					</div>
					<div class="comment-form">
						<div class="comment-input">
							<Pfp pfpUri={$user.pfp.curr} size={30}></Pfp>
							<AutoResizeTextarea
								placeholder="write comment"
								bind:content={commentInput}
								onEnter={() => createComment()}
							></AutoResizeTextarea>
						</div>
						<div class="comment-submit">
							<button class="btn-sig" onclick={createComment}>comment</button>
						</div>
					</div>
					<div class="comments">
						<CommentList videoSessionId={videoSession.id} {comments}></CommentList>
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
		height: auto;

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
			height: auto;
			overflow-y: auto;

			&::-webkit-scrollbar {
				display: none;
			}
			-ms-overflow-style: none;
			scrollbar-width: none;

			.video-zone {
				width: 100%;
				aspect-ratio: 16 / 9;
				max-height: calc(70vh - 40px);
				margin-bottom: 15px;
				border-radius: 12px;
				overflow: hidden;
				background-color: #000;
			}

			.video-info {
				display: flex;
				flex-direction: column;
				.title h5 {
					font-size: 1.2rem;
					margin: 0 0 10px 0;
				}

				.top {
					margin-bottom: 10px;
					display: flex;
					justify-content: space-between;
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
					.video-activation-btns {
						display: flex;
						align-items: center;
						gap: 10px;
						.activation-btn {
							display: inline-flex;
							align-items: center;
							justify-content: center;
							height: 40px;
						}
						.like {
							display: flex;
							flex-direction: row;
							background-color: var(--mid-gray);
							border-radius: 50vh;
							padding: 0px 5px;
							.like-btn {
								background-color: transparent;
								padding: 0px 10px;

								.like-count {
									padding: 0px 10px;
								}
							}
						}
						.copy-link {
							display: flex;
							flex-direction: row;
							background-color: var(--mid-gray);
							border-radius: 50vh;
						}
						.save {
							display: flex;
							flex-direction: row;
							background-color: var(--mid-gray);
							border-radius: 50vh;
							padding: 0px 5px;

							.save-btn {
								background-color: transparent;
								padding: 0px 10px;
							}
						}
					}
				}

				.mid {
					margin-bottom: 40px;
					.description {
						padding: 12px;
						background-color: var(--mid-gray);
						border-radius: 8px;
					}
				}

				.bottom {
					.comment-form {
						display: flex;
						flex-direction: column;
						margin: 20px 0px;

						.comment-input {
							margin: 0;
							width: 100%;
							display: flex;
							flex-direction: row;
							gap: 10px;
						}
					}
					.comment-submit {
						display: flex;
						justify-content: flex-end;
						margin-top: 10px;
						button {
							padding: 5px 10px;
						}
					}
				}
			}
		}

		.right {
			width: $recommended-width;
			height: auto;
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
