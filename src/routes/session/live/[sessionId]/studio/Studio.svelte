<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Main from './Main.svelte';
	import { Studio } from '../../../../../lib/live/studio';
	import { LiveSession } from '../LiveSession.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import LiveSessionConfig from '$lib/components/configuration/LiveSessionConfig.svelte';

	let { liveSessionData } = $props();

	const liveSession = new LiveSession(liveSessionData);
	const studio = new Studio(liveSession);

	let showLiveSessionConfig = $state(false);

	function openLiveSessionConfigModal() {
		showLiveSessionConfig = true;
	}

	function closeLiveSessionConfigModal() {
		showLiveSessionConfig = false;
	}

	onMount(async () => {
		if (studio.liveSession.isReady) {
			openLiveSessionConfigModal();
		}
		await studio.mediaController.init();
	});

	onDestroy(() => {
		studio.unpublish();
	});
</script>

<section id="live-session">
	{#if showLiveSessionConfig}
		<!--live session config modal은 close되면 안된다. -->
		<Modal closeModal={undefined}>
			<LiveSessionConfig slot="modal-body" {studio} {closeLiveSessionConfigModal}
			></LiveSessionConfig>
		</Modal>
	{/if}

	{#if studio.liveSession.isClosed}
		<p>live session is closed</p>
	{:else}
		<!-- ready, opened, breaked -->
		<Main {studio} />
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
