<script lang="ts">
	import type { PublicVideoSession } from '../../../types/contracts/video-session';
	import VideoSessionCard from './VideoSessionCard.svelte';

	interface Props {
		category: string;
		videoSessions: PublicVideoSession[];
	}

	let { category, videoSessions }: Props = $props();
</script>

<div class="deck middle-rounded">
	<div class="label">
		<span>{category}</span>
	</div>
	{#if videoSessions.length}
		<div class="sessions">
			{#each videoSessions as videoSession}
				<VideoSessionCard {videoSession} />
			{/each}
		</div>
	{:else}
		<div class="placeholder-card">
			<p class="placeholder-text">No video sessions available</p>
		</div>
	{/if}
</div>

<style lang="scss">
	.deck {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 10px 25px;
		background-color: var(--bg-sideBar);
		.label {
		}
		.sessions {
			display: flex;
			flex-direction: row;
			gap: 25px;
			overflow-x: scroll;
			padding: 10px 0px;
		}

		.placeholder-card {
			width: 320px;
			height: 323px;
			background-color: var(--bg);
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 8px;
			margin: 10px 0px;
		}
	}
</style>
