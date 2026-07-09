<script lang="ts">
	import type { VideoSessionWithAll } from '../../../types/session';
	import VideoSessionCard from './VideoSessionCard.svelte';

	interface Props {
		videoSessions: VideoSessionWithAll[];
	}

	let { videoSessions }: Props = $props();
</script>

<div>
	{#each videoSessions as videoSession}
		<VideoSessionCard {videoSession} />
	{/each}
</div>
