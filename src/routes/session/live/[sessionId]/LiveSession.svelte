<script lang="ts">
	import { onMount } from 'svelte';
	import type { LiveSessionManager } from '../liveSessionManager.svelte';
	import type { MediaController } from '../mediaController.svelte';
	import ControlPanel from './ControlPanel.svelte';
	import Player from './Player.svelte';
	import type { PageData } from './$types';

	interface Props {
		liveSessionManager: LiveSessionManager;
		mediaController: MediaController;
		data: PageData;
	}

	let { liveSessionManager, mediaController, data }: Props = $props();

	let liveStream = mediaController.mediaStream;

	onMount(() => {
		if (liveSessionManager.isOpened) {
			liveSessionManager.publish(mediaController.mediaStream);
		}
	});
</script>

<section id="live-session-organizer">
	<div class="left">
		<Player mediaStream={liveStream} {data} />
		<ControlPanel {mediaController} {liveSessionManager} />
	</div>
	<div class="right">
		<div class="body">
			<div class="chatroom">
				<ul class="chat-list">
					<li class="chat">
						<div class="pfp">
							<img
								src="https://yt3.ggpht.com/UbQKBZo90ej_FI_Rvps-n05TFPKEXiUz3QHYdGPsq58PxxN6DYZGHkfnZ-wDyZUL1fo-sW3k=s88-c-k-c0x00ffffff-no-rj"
								alt=""
							/>
						</div>
						<div class="username">seungho-hub</div>
						<div class="text">let's get it</div>
					</li>
				</ul>
			</div>
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
				.chatroom {
					.chat-list {
						.chat {
							display: flex;
							flex-direction: row;
							gap: 10px;
							font-size: 12px;
							.pfp {
								width: 24px;
								height: 24px;
								border-radius: 12px;
								img {
									width: 100%;
								}
							}
							.username {
								color: var(--font-light-gray);
							}
						}
					}
				}
			}
		}
	}
</style>
