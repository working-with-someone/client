<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { MediaController } from './mediaController.svelte';
	import Preview from './Preview.svelte';
	import ControlPanel from './ControlPanel.svelte';
	import { Studio } from './studio.svelte';

	import ChatRoom from './ChatRoom.svelte';

	interface Props {
		studio: Studio;
		mediaController: MediaController;
	}

	let { studio, mediaController }: Props = $props();

	let liveStream = mediaController.mediaStream;

	onMount(async () => {
		if (!studio.liveSession.isOpened) {
			await studio.open();
		}

		studio.publish(mediaController.mediaStream);
	});

	onDestroy(() => {
		studio.unpublish();
	});
</script>

<section id="live-session-organizer">
	<div class="left">
		<Preview {studio} mediaStream={liveStream} />
		<ControlPanel {mediaController} {studio} />
	</div>
	<div class="right">
		<div class="body">
			<ChatRoom {studio} />
		</div>
	</div>
</section>

<style lang="scss">
	section#live-session-organizer {
		$chat-width: 350px;

		background-color: var(--bg-sideBar);
		width: 100%;
		height: 100%;
		border-radius: 10px;
		display: grid;
		grid-template-areas: 'left right';
		grid-template-columns: auto $chat-width;
		grid-template-rows: 100% 100%;
		padding: 10px;
		gap: 10px;
		.left {
			grid: left;
			display: flex;
			flex-direction: column;
		}
		.right {
			grid: right;
			flex-direction: column;
			.body {
				background-color: var(--bg);
				height: 100%;
				padding: 10px;
				border-radius: 0 10px 10px 0;
			}
		}
	}
</style>
