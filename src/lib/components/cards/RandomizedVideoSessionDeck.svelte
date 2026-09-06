<script lang="ts">
	import type { PublicVideoSession } from '../../../types/api-contracts/video-session';
	import VideoSessionCard from './VideoSessionCard.svelte';

	interface Props {
		videoSessions: PublicVideoSession[];
	}

	let { videoSessions }: Props = $props();
</script>

<div class="deck">
	{#if videoSessions.length}
		<div class="sessions">
			{#each videoSessions as videoSession}
				<VideoSessionCard {videoSession} />
			{/each}
		</div>
	{:else}
		<p>No video sessions available.</p>
	{/if}
</div>

<style>
	.deck {
		display: flex;
		flex-direction: column;

		.sessions {
			display: flex;
			flex-wrap: wrap;
			gap: 30px;
		}
	}
</style>
