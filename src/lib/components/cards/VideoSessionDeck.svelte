<script lang="ts">
	import type { VideoSessionWithAll } from '../../../types/session';
	import VideoSessionCard from './VideoSessionCard.svelte';

	interface Props {
		category: string;
		videoSessions: VideoSessionWithAll[];
	}

	let { category, videoSessions }: Props = $props();
</script>

<div class="deck middle-rounded">
	<div class="label">
		<span>{category}</span>
	</div>
	<div class="sessions">
		{#each videoSessions as videoSession}
			<VideoSessionCard {videoSession} />
		{/each}
	</div>
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
			margin-top: 20px;
			gap: 25px;
			overflow-x: scroll;
		}
	}
</style>
