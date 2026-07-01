<script lang="ts">
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	import wwsfetch from '$lib/utils/wwsfetch';
	import { getContext, onMount } from 'svelte';
	import Pfp from '../user/pfp.svelte';
	import type { CommentWithAll } from '../../../types/comment';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import Like from '../shared/Like.svelte';
	import UserLink from '../link/UserLink.svelte';
	dayjs.extend(relativeTime);

	const user = getContext('user');

	interface Props {
		videoSessionId: string;
		comments: CommentWithAll[];
	}

	let { comments, videoSessionId }: Props = $props();

	onMount(async () => {
		wwsfetch(`/sessions/video/${videoSessionId}/comment`, {
			method: 'GET',
			queryParams: {
				page: '1',
				per_page: '10',
				sort: 'recent'
			}
		})
			.then((res) => res.json())
			.then((body) => {
				const _comments = body.data;

				comments.push(..._comments);
			});
	});

	function toggleLike(comment: CommentWithAll) {
		const isLiked = comment.likes.length ? true : false;

		if (isLiked) {
			wwsfetch(`/sessions/video/${videoSessionId}/comment/${comment.id}/like`, {
				method: 'DELETE'
			}).then(() => {
				comment.likes.pop();
				comment.like_count -= 1;
			});
		} else {
			wwsfetch(`/sessions/video/${videoSessionId}/comment/${comment.id}/like`, {
				method: 'POST'
			})
				.then((res) => res.json())
				.then((body) => {
					const like = body.data;

					comment.likes.push(like);
					comment.like_count += 1;
				});
		}
	}
</script>

<ul class="comments-list">
	{#each comments as comment}
		<li class="comment">
			<div class="left">
				<Pfp pfpUri={comment.user.pfp!.curr} size={32}></Pfp>
			</div>
			<div class="right">
				<div class="top">
					<UserLink userId={comment.user.id} username={comment.user.username} size={14}></UserLink>
					<div class="ago">
						<p>{dayjs(comment.created_at).fromNow()}</p>
					</div>
				</div>
				<div class="mid">
					<p>{comment.content}</p>
				</div>
				<div class="bottom">
					<button
						class="like-btn"
						onclick={() => {
							toggleLike(comment);
						}}
					>
						<Like isLiked={comment.likes.length ? true : false} animationEnabled={true} size={20}
						></Like>
					</button>
					<span class="like-count">{comment.like_count}</span>
				</div>
			</div>
		</li>
	{/each}
</ul>

<style lang="scss">
	.comments-list {
		display: flex;
		flex-direction: column;
		gap: 30px;
		.comment {
			display: flex;
			flex-direction: row;
			gap: 15px;
			.left {
				padding-top: 5px;
			}
			.right {
				display: flex;
				flex-direction: column;
				.top {
					display: flex;
					flex-direction: row;
					gap: 5px;
					.ago {
						p {
							color: var(--font-gray);
						}
						font-size: 0.9em;
					}
				}
				.mid {
					margin-bottom: 7px;
				}
				.bottom {
					display: flex;
					gap: 7px;
					button {
						padding: 0;
					}
					.like-count {
						line-height: 18px;
					}
				}
			}
		}
	}
</style>
