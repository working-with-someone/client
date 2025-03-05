<script lang="ts">
	import { onMount } from 'svelte';
	import type { MediaController } from './mediaController.svelte';
	import Preview from './Preview.svelte';
	import ControlPanel from './ControlPanel.svelte';
	import { Studio } from './studio.svelte';

	import type { PageData } from '../$types';
	import ChatRoom from '../../../../../lib/components/Chat/ChatRoom.svelte';

	interface Props {
		studio: Studio;
		mediaController: MediaController;
	}

	let { studio, mediaController }: Props = $props();

	let liveStream = mediaController.mediaStream;

	onMount(() => {
		if (studio.liveSession.isOpened) {
			studio.publish(mediaController.mediaStream);
		}
	});
</script>

<section id="live-session-organizer">
	<div class="left">
		<Preview {studio} mediaStream={liveStream} />
		<ControlPanel {mediaController} {studio} />
	</div>
	<div class="right">
		<div class="body">
			<ChatRoom />
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
		padding: 10px;
		gap: 10px;
		.left {
			grid: left;
			display: flex;
			flex-direction: column;
		}
		.right {
			grid: right;
			display: flex;
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
