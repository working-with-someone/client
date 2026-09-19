<script lang="ts">
	import { page } from '$app/state';
	import type { PublicVideoSession } from '../../../types/api-contracts/video-session';
	import VideoSessionCard from './VideoSessionCard.svelte';
	import type { PaginatedResult, PaginationMeta } from '../../../types/pagination';
	import wwsfetch from '$lib/utils/wwsfetch';

	interface Props {
		videoSessions: PublicVideoSession[];
		pagination: PaginationMeta;
	}

	let { videoSessions: initialSessions, pagination: initialPagination }: Props = $props();
	let sentinel: HTMLDivElement | null = $state(null);

	let videoSessions = $state([...initialSessions]);
	let pagination = $state({ ...initialPagination });
	let isLoadingMore = $state(false);

	$effect(() => {
		videoSessions = [...initialSessions];
		pagination = { ...initialPagination };
	});

	const loadMoreSkeletonCards = [0, 1, 2];

	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function handleInfiniteScroll() {
		if (isLoadingMore || !pagination.hasMore) {
			return;
		}

		isLoadingMore = true;

		try {
			const queryParams = new URLSearchParams(page.url.searchParams);
			queryParams.set('page', (pagination.currPage + 1).toString());
			queryParams.set('per_page', pagination.per_page.toString());

			const [res] = await Promise.all([
				wwsfetch(`/sessions/video?${queryParams.toString()}`, {
					method: 'GET'
				}),
				delay(1000)
			]);

			const body = (await res.json()) as PaginatedResult<PublicVideoSession>;

			videoSessions.push(...body.data);
			pagination = body.pagination;

			if (!pagination.hasMore) {
				sentinel = null;
			}
		} finally {
			isLoadingMore = false;
		}
	}

	$effect(() => {
		if (!sentinel) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					handleInfiniteScroll();
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
</script>

<div class="deck">
	{#if videoSessions.length}
		<div class="sessions">
			{#each videoSessions as videoSession}
				<VideoSessionCard {videoSession} />
			{/each}
			{#if isLoadingMore}
				{#each loadMoreSkeletonCards as row}
					<div class="card skeleton-card" aria-hidden="true">
						<div class="thumbnail-placeholder skeleton-block"></div>
						<div class="footer">
							<div class="line-placeholder wide skeleton-block"></div>
							<div class="line-placeholder medium skeleton-block"></div>
							<div class="user-placeholder">
								<div class="avatar-placeholder skeleton-block"></div>
								<div class="line-placeholder narrow skeleton-block"></div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
		<div class="sentinel" bind:this={sentinel}></div>
	{:else}
		<p>No video sessions available.</p>
	{/if}
</div>

<style lang="scss">
	.deck {
		display: flex;
		flex-direction: column;

		.sessions {
			display: flex;
			flex-wrap: wrap;
			gap: 30px;
		}
	}

	.skeleton-card {
		flex: 0 0 320px;
		width: 320px;
		display: flex;
		flex-direction: column;
		background-color: var(--bg);
		overflow: hidden;
		pointer-events: none;
		filter: blur(5px);
		opacity: 0.9;

		.thumbnail-placeholder {
			width: 100%;
			padding-top: calc(100% / (16 / 9));
		}

		.footer {
			display: flex;
			flex-direction: column;
			padding: 5px 10px;
			gap: 10px;

			.line-placeholder {
				height: 13px;
				border-radius: 999px;

				&.wide {
					width: 90%;
				}

				&.medium {
					width: 60%;
				}

				&.narrow {
					width: 80px;
				}
			}

			.user-placeholder {
				display: flex;
				align-items: center;
				gap: 10px;

				.avatar-placeholder {
					width: 30px;
					height: 30px;
					border-radius: 15px;
					flex-shrink: 0;
				}
			}
		}
	}

	.skeleton-block {
		position: relative;
		overflow: hidden;
		background: linear-gradient(90deg, #d9dce3 0%, #eceff4 45%, #d9dce3 100%);
		background-size: 200% 100%;
		animation: category-search-skeleton-shimmer 1.4s ease-in-out infinite;
	}

	@keyframes category-search-skeleton-shimmer {
		0% {
			background-position: 200% 0;
		}

		100% {
			background-position: -200% 0;
		}
	}
</style>
