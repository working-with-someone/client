<script lang="ts">
	import LiveSessionOpenConfig from '$lib/components/configuration/LiveSessionOpenConfig.svelte';
	import Modal from '$lib/components/util/Modal.svelte';
	export let data;

	const liveSession = data.liveSession;

	let showMediaConfiguration: boolean;

	if (liveSession.session_live.status === 1) {
		showMediaConfiguration = true;
	}
</script>

<section class="live-session">
	<div class="mediaConfiguration">
		<LiveSessionOpenConfig {liveSession} />
	</div>
	<div class="session">session</div>
</section>