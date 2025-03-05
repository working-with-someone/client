<script lang="ts">
	let chatInput: HTMLTextAreaElement;

	function sendChat() {
		const message = chatInput.value;
		chatInput.value = '';

		chatInput.focus();
	}
</script>

<div class="chatroom">
	<ul class="chat-log-list">
		<li class="chat-log">
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
	.chatroom {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		.chat-log-list {
			flex-grow: 1;
			.chat-log {
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
