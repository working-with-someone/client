<script lang="ts">
	import type { PublicVideoSession } from '../../../types/contracts/video-session';
	import VideoSessionCard from './VideoSessionCard.svelte';

	interface Props {
		videoSessions: PublicVideoSession[];
	}

	let { videoSessions }: Props = $props();
</script>

<div>
	{#each videoSessions as videoSession}
		<VideoSessionCard {videoSession} />
	{/each}
</div>
