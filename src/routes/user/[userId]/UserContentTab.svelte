<script lang="ts">
	import VideoSessionCard from '$lib/components/cards/VideoSessionCard.svelte';
	import wwsfetch from '$lib/utils/wwsfetch';
	import { VideoSession } from '$lib/video/VideoSession.svelte';
	import type { VideoSessionWithAll } from '../../../types/session';

	let activeTab = $state('home');

	interface Props {
		userId: string;
	}

	const { userId }: Props = $props();

	const tabs = {
		home: {
			name: 'home'
		},
		video: {
			name: 'video'
		},
		live: {
			name: 'live'
		}
	};

	let videoSessions = $state<VideoSessionWithAll[]>([]);

	function setActiveTab(tab: string) {
		activeTab = tab;

		videoSessions = [];

		switch (tab) {
			case 'home':
				break;
			case 'video':
				wwsfetch(`/users/${userId}/sessions/video`, {
					method: 'GET',
					queryParams: {
						page: '1',
						per_page: '10'
					}
				})
					.then((res) => res.json())
					.then((body: { data: VideoSessionWithAll[] }) => {
						videoSessions.push(...body.data);
					});
				break;
			case 'live':
				break;
		}
	}
</script>

<div class="contents">
	<div class="tab" role="tablist" aria-label="User content tabs">
		<div class="tab-list">
			<button
				type="button"
				role="tab"
				class:active={activeTab === 'home'}
				onclick={() => setActiveTab('home')}>home</button
			>
			<button
				type="button"
				role="tab"
				class:active={activeTab === 'video'}
				onclick={() => setActiveTab('video')}>video</button
			>
			<button
				type="button"
				role="tab"
				class:active={activeTab === 'live'}
				onclick={() => setActiveTab('live')}>live</button
			>
		</div>
	</div>

	<div class="content">
		<div class="sessions">
			{#if activeTab === 'video'}
				{#if videoSessions.length > 0}
					{#each videoSessions as videoSession}
						<VideoSessionCard {videoSession} skipUserInfo={true} />
					{/each}
				{:else}
					<p>No video sessions available.</p>
				{/if}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.contents {
		margin: 0 50px;
		height: auto;

		.tab {
			position: relative;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			width: 100%;
			min-height: 62px;
			gap: 0;

			&::before {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 1px;
				background: rgba(255, 255, 255, 0.16);
				z-index: 0;
			}

			.tab-list {
				z-index: 1;
				display: flex;
				align-items: flex-end;
				gap: 6px;
				flex: 1;

				button {
					position: relative;
					border: 1px solid transparent;
					border-bottom: none;
					background: transparent;
					color: var(--font-light-gray);
					font-weight: 700;
					font-size: 0.98rem;
					padding: 11px 30px 10px;
					white-space: nowrap;
					cursor: pointer;
					border-radius: 14px 14px 0 0;
					margin-bottom: -1px;
					transition:
						color 0.2s ease,
						background-color 0.2s ease,
						border-color 0.2s ease;

					&:hover {
						color: var(--font);
					}

					&.active {
						z-index: 2;
						color: var(--font);
						background: var(--bg);
						border-color: rgba(255, 255, 255, 0.24);
						border-bottom-color: transparent;

						&::after {
							content: '';
							position: absolute;
							left: -1px;
							right: -1px;
							bottom: -1px;
							height: 4px;
							background: var(--bg);
							z-index: 3;
						}
					}
				}
			}
		}

		.content {
			padding: 20px 0;
			.sessions {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				gap: 20px;
			}
		}
	}
</style>
