<script lang="ts">
	import LiveSessionOpenConfig from '$lib/components/configuration/LiveSessionOpenConfig.svelte';
	import { onMount } from 'svelte';
	import { LiveSessionManager } from '../liveSessionManager.svelte';
	import { MediaController } from '../mediaController.svelte';

	let { data } = $props();

	const liveSessionManager = $state(new LiveSessionManager(data.liveSession));
	const mediaController = $state(new MediaController());

	onMount(() => {
		mediaController.loadDevices();
	});
</script>

<section id="live-session">
	{#if liveSessionManager.isReady}
		<div class="live-session-open-config">
			<LiveSessionOpenConfig {liveSessionManager} {mediaController} />
		</div>
	{:else if liveSessionManager.isOpened}
		<div class="session">session</div>
	{/if}
</section>

<style lang="scss">
	section#live-session {
		width: 100%;
		height: 100%;
		div.live-session-open-config {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
