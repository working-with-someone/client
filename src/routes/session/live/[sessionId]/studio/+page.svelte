<script lang="ts">
	import LiveSessionOpenConfig from '$lib/components/configuration/LiveSessionOpenConfig.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { MediaController } from './mediaController.svelte';
	import Main from './Main.svelte';
	import { Studio } from './studio.svelte';

	import type { PageData } from '../$types';

	let { data }: { data: PageData } = $props();

	const studio = new Studio(data.liveSession);

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
		{#if studio.liveSession.isReady}
			<LiveSessionOpenConfig {studio} {mediaController} />
		{:else if studio.liveSession.isClosed}
			<!-- end -->
			live session is closed
		{:else}
			<!-- opened, breaked -->
			<Main {studio} {mediaController} />
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
