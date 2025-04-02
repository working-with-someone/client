<script lang="ts">
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	import { slide } from 'svelte/transition';
	import type { Participant } from './Participant.svelte';
	let chatInput: HTMLTextAreaElement;

	interface Props {
		participant: Participant;
	}

	const { participant }: Props = $props();

	function sendChat() {
		const msg = chatInput.value;
		participant.chatManager.chat(msg);

		chatInput.value = '';
		chatInput.focus();
	}
</script>

<div class="chatroom">
	<ul class="chat-log-list">
		{#each participant.chatManager.chatLogs as chatLog}
			<li class="chat-log" transition:slide>
				<div class="pfp">
					<img src={`${PUBLIC_API_SERVER_DOMAIN}${chatLog.user.pfp}`} alt="" />
				</div>
				<div class="message">
					<span class="username">{chatLog.user.username}</span>
					<span class="text">{chatLog.msg}</span>
				</div>
			</li>
		{/each}
	</ul>

	<div class="chat-form">
		<textarea
			class="chat-input middle-rounded"
			name=""
			id=""
			bind:this={chatInput}
			placeholder="chat ..."
			onkeydown={(e) => {
				if (e.key === 'Enter' && !e.shiftKey) {
					e.preventDefault();
					sendChat();
				}
			}}
		></textarea>
		<div class="feat">
			<button class="chat-feat insert-emoji">
				<span class="material-symbols-outlined"> mood </span>
			</button>
			<button class="chat-feat send" onclick={sendChat}>
				<span class="material-symbols-outlined"> send </span>
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	$chat-width: 330px;
	$pfp-width: 26px;
	.chatroom {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		.chat-log-list {
			display: flex;
			flex-direction: column;
			gap: 20px;
			overflow: scroll;
			flex-grow: 1;
			justify-content: end;
			margin-bottom: 20px;
			.chat-log {
				display: flex;
				flex-direction: row;
				gap: 10px;
				font-size: 12px;
				width: $chat-width;

				.pfp {
					width: $pfp-width;
					height: $pfp-width;
					border-radius: calc($pfp-width / 2);
					overflow: hidden;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 100%;
					}
				}
				.message {
					width: calc($chat-width - $pfp-width);
					white-space: normal;
					word-wrap: break-word;
					overflow-wrap: break-word;

					.username {
						color: var(--font-light-gray);
					}
				}
			}
		}

		.chat-form {
			background-color: var(--bg-sideBar);
			display: flex;
			flex-direction: row;
			padding: 0 5px;

			.chat-input {
				width: 100%;
				background-color: var(--bg-sideBar);
				padding: 10px;
				field-sizing: content;
				max-height: 500px;
				flex-grow: 1;
			}
			.feat {
				display: flex;
				gap: 5px;
				.chat-feat {
					padding: 0;
					span {
						font-size: 22px;
					}
					&:hover {
						span {
							color: var(--sig);
						}
					}
				}
			}
		}
	}
</style>
