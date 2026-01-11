<script lang="ts">
	import { Viewer } from '../../live/viewer';
	import StateTag from '../tags/StateTag.svelte';

	interface Props {
		viewer: Viewer;
	}

	const { viewer }: Props = $props();

	let duration = $state('00:00:00');
	let currentStateDuration = $state('00:00:00');

	setInterval;
</script>

<div class="overlay">
	<div class="state">
		<StateTag state={viewer.liveSession.status} />
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
