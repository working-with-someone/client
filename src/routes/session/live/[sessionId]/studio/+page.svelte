<script lang="ts">
	import type { PageData } from './$types';
	import { LiveSession } from '../LiveSession.svelte';
	import { live_session_status } from '@prisma/client';
	import Studio from './Studio.svelte';

	let { data }: { data: PageData } = $props();

	const liveSession = new LiveSession(data.liveSession);
</script>

<section id="live-session">
	{#if liveSession.status === live_session_status.CLOSED}
		<p>live session is closed</p>
	{:else}
		<!-- ready, opened, breaked -->
		<Studio liveSessionData={liveSession} />
	{/if}
</section>

<style lang="scss">
	section#live-session {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
