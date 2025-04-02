<script lang="ts">
	import HlsPlayer from '$lib/components/HlsPlayer/HlsPlayer.svelte';
	import type { PageData } from './$types';
	import ChatRoom from './ChatRoom.svelte';
	import { LiveSession, Participant } from './Participant.svelte';

	const { data }: { data: PageData } = $props();

	const liveSession = new LiveSession(data.liveSession, data.breakTime);
	const participant = new Participant(liveSession);
</script>

<section id="live-session">
	<div class="left">
		<HlsPlayer sessionId={data.liveSession.id}></HlsPlayer>
	</div>
	<div class="right">
		<div class="body">
			<ChatRoom {participant} />
		</div>
	</div>
</section>

<style lang="scss">
	section#live-session {
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
