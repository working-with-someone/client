<script lang="ts">
	import LiveSessionOpenConfig from '$lib/components/configuration/LiveSessionOpenConfig.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { LiveSessionManager } from '../liveSessionManager.svelte';
	import { MediaController } from '../mediaController.svelte';
	import LiveSession from './LiveSession.svelte';

	let { data } = $props();

	const liveSessionManager: LiveSessionManager = $state(new LiveSessionManager(data.liveSession));
	let mediaController = $state(new MediaController());

	onMount(() => {
		// navigator가 mount된 이후에
		mediaController.init();
	});

	onDestroy(() => {});
</script>

<section id="live-session">
	<!-- ready -->
	{#if mediaController.initialized}
		{#if liveSessionManager.isReady}
			<LiveSessionOpenConfig {liveSessionManager} {mediaController} />
		{:else if liveSessionManager.isClosed}
			<!-- end -->
		{:else}
			<!-- open, pause -->
			<LiveSession {liveSessionManager} {mediaController} />
		{/if}
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
