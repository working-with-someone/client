<script lang="ts">
	import LiveSessionOpenConfig from '$lib/components/configuration/LiveSessionOpenConfig.svelte';

	let { data } = $props();

	const liveSession = data.liveSession;

	let showMediaConfiguration: boolean;

	if (liveSession.session_live.status === 1) {
		showMediaConfiguration = true;
	}
</script>

<section id="live-session">
	<div class="live-session-open-config">
		<LiveSessionOpenConfig {liveSession} />
	</div>
	<div class="session"></div>
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
