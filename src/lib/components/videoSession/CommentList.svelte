<script lang="ts">
	import wwsfetch from '$lib/utils/wwsfetch';
	import { getContext, onMount } from 'svelte';
	import Pfp from '../user/pfp.svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import Like from '../shared/Like.svelte';
	import UserLink from '../link/UserLink.svelte';
	import type { PublicVideoSessionCommentWithIsLiked } from '../../../types/contracts/comment';
	import LoadSpinner1 from '../loader/LoadSpinner1.svelte';
	dayjs.extend(relativeTime);

	const initialSkeletonRows = [0, 1, 2, 3];
	const loadMoreSkeletonRows = [0, 1];

	interface Props {
		videoSessionId: string;
		comments: PublicVideoSessionCommentWithIsLiked[];
	}

	interface CommentListResponse {
		data: PublicVideoSessionCommentWithIsLiked[];
		pagination: {
			hasMore: boolean;
			nextPage: number | null;
		};
	}

	let { comments, videoSessionId }: Props = $props();
	let hasMore = $state(true);
	let nextPage = $state<number | null>(1);
	let isInitialLoading = $state(true);
	let isLoadingMore = $state(false);
	let sentinel: HTMLLIElement | null = $state(null);

	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	function appendUniqueComments(incomingComments: PublicVideoSessionCommentWithIsLiked[]) {
		const existingIds = new Set(comments.map((comment) => comment.id));
		const nextComments = incomingComments.filter((comment) => !existingIds.has(comment.id));

		comments.push(...nextComments);
	}

	async function loadComments(page: number) {
		const isFirstPageLoad = page === 1;

		if (
			(isFirstPageLoad && !isInitialLoading) ||
			(!isFirstPageLoad && (isLoadingMore || !hasMore))
		) {
			return;
		}

		if (isFirstPageLoad) {
			isInitialLoading = true;
		} else {
			isLoadingMore = true;
		}

		try {
			const [response] = await Promise.all([
				wwsfetch(`/sessions/video/${videoSessionId}/comment`, {
					method: 'GET',
					queryParams: {
						page: `${page}`,
						per_page: '10',
						sort: 'recent'
					}
				}),
				delay(1000)
			]);
			const body: CommentListResponse = await response.json();

			appendUniqueComments(body.data);
			hasMore = body.pagination.hasMore;
			nextPage = body.pagination.nextPage;
		} finally {
			isInitialLoading = false;
			isLoadingMore = false;
		}
	}

	onMount(() => {
		void loadComments(1);
	});

	$effect(() => {
		if (!sentinel || isInitialLoading || isLoadingMore || !hasMore || nextPage === null) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					const pageToLoad = nextPage;

					if (pageToLoad !== null) {
						void loadComments(pageToLoad);
					}
				}
			},
			{
				rootMargin: '200px 0px'
			}
		);

		observer.observe(sentinel);

		return () => {
			observer.disconnect();
		};
	});

	function toggleLike(comment: PublicVideoSessionCommentWithIsLiked) {
		if (comment.isLiked) {
			wwsfetch(`/sessions/video/${videoSessionId}/comment/${comment.id}/like`, {
				method: 'DELETE'
			}).then(() => {
				comment.isLiked = false;
				comment.like_count -= 1;
			});
		} else {
			wwsfetch(`/sessions/video/${videoSessionId}/comment/${comment.id}/like`, {
				method: 'POST'
			})
				.then((res) => res.json())
				.then((body) => {
					const like = body.data;

					comment.isLiked = true;
					comment.like_count += 1;
				});
		}
	}
</script>

<ul class="comments-list">
	{#if isInitialLoading && comments.length === 0}
		{#each initialSkeletonRows as row}
			<li class="comment skeleton" aria-hidden="true">
				<div class="left">
					<div class="avatar-placeholder skeleton-block"></div>
				</div>
				<div class="right">
					<div class="top">
						<div class="username-placeholder skeleton-block"></div>
						<div class="ago-placeholder skeleton-block"></div>
					</div>
					<div class="mid">
						<div class="content-line wide skeleton-block"></div>
						<div class="content-line medium skeleton-block"></div>
					</div>
					<div class="bottom">
						<div class="like-placeholder skeleton-block"></div>
						<div class="count-placeholder skeleton-block"></div>
					</div>
				</div>
			</li>
		{/each}
	{:else}
		{#each comments as comment (comment.id)}
			<li class="comment">
				<div class="left">
					<Pfp pfpUri={comment.user.pfp!.curr} size={32}></Pfp>
				</div>
				<div class="right">
					<div class="top">
						<UserLink userId={comment.user.id} username={comment.user.username} size={14}
						></UserLink>
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
							<Like isLiked={comment.isLiked} animationEnabled={true} size={20}></Like>
						</button>
						<span class="like-count">{comment.like_count}</span>
					</div>
				</div>
			</li>
		{/each}
	{/if}

	{#if isLoadingMore}
		{#each loadMoreSkeletonRows as row}
			<li class="comment skeleton compact" aria-hidden="true">
				<div class="left">
					<div class="avatar-placeholder skeleton-block"></div>
				</div>
				<div class="right">
					<div class="top">
						<div class="username-placeholder skeleton-block"></div>
						<div class="ago-placeholder skeleton-block"></div>
					</div>
					<div class="mid">
						<div class="content-line wide skeleton-block"></div>
					</div>
				</div>
			</li>
		{/each}
		<LoadSpinner1 size={20}></LoadSpinner1>
	{/if}

	{#if hasMore}
		<li class="loading-sentinel" bind:this={sentinel} aria-hidden="true"></li>
	{/if}
</ul>

<style lang="scss">
	.comments-list {
		display: flex;
		flex-direction: column;
		gap: 30px;

		.loading-sentinel {
			width: 100%;
			height: 1px;
			list-style: none;
		}

		.comment {
			display: flex;
			flex-direction: row;
			gap: 15px;

			&.skeleton {
				pointer-events: none;

				.right {
					filter: blur(5px);
					opacity: 0.9;
				}

				&.compact {
					.mid {
						margin-bottom: 0;
					}
				}
			}

			.left {
				padding-top: 5px;

				.avatar-placeholder {
					width: 32px;
					height: 32px;
					border-radius: 999px;
				}
			}
			.right {
				display: flex;
				flex-direction: column;
				gap: 2px;

				.top {
					display: flex;
					flex-direction: row;
					gap: 5px;

					.username-placeholder {
						width: 110px;
						height: 14px;
						border-radius: 999px;
					}

					.ago-placeholder {
						width: 56px;
						height: 12px;
						border-radius: 999px;
					}

					.ago {
						p {
							color: var(--font-gray);
						}
						font-size: 0.9em;
					}
				}
				.mid {
					margin-bottom: 7px;

					.content-line {
						height: 13px;
						border-radius: 999px;

						&.wide {
							width: min(100%, 420px);
						}

						&.medium {
							width: min(70%, 280px);
							margin-top: 8px;
						}
					}
				}
				.bottom {
					display: flex;
					gap: 7px;
					align-items: center;

					.like-placeholder {
						width: 20px;
						height: 20px;
						border-radius: 999px;
					}

					.count-placeholder {
						width: 18px;
						height: 12px;
						border-radius: 999px;
					}

					button {
						padding: 0;
					}
					.like-count {
						line-height: 18px;
					}
				}
			}
		}

		.skeleton-block {
			position: relative;
			overflow: hidden;
			background: linear-gradient(90deg, #d9dce3 0%, #eceff4 45%, #d9dce3 100%);
			background-size: 200% 100%;
			animation: comment-skeleton-shimmer 1.4s ease-in-out infinite;
		}
	}

	@keyframes comment-skeleton-shimmer {
		0% {
			background-position: 200% 0;
		}

		100% {
			background-position: -200% 0;
		}
	}
</style>
