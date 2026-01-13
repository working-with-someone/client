<script lang="ts">
	import { Viewer } from '../../live/viewer';
	import DurationOverlay from './DurationOverlay.svelte';

	interface Props {
		viewer: Viewer;
	}

	const { viewer }: Props = $props();
</script>

<div class="overlay">
	<div class="state">
		<DurationOverlay liveSession={viewer.liveSession}></DurationOverlay>
	</div>
</div>

<style lang="scss">
	.overlay {
		position: absolute;
		top: 10px;
		left: 10px;
		display: flex;
		align-items: row;
		align-items: center;
		gap: 10px;

		.state {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 10px;
		}
	}
</style>
