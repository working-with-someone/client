<script lang="ts">
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	export let user;

	let pfp: HTMLImageElement;
	let pfpInput: HTMLInputElement;
	let username: string;

	const togglePfpInput = () => pfpInput.click();
	const resetConfig = () => {
		pfpInput.src = user.pfp;
		username = user.username;
		pfpInput.value = '';
	};

	const changeConfig = () => {
		const formData = new FormData();
		formData.append("username", username);

		// file이 입력되었다면
		if(pfpInput.files){
			formData.append("pfp", pfpInput.files[0]);
		}

		const updateSelfURL = new URL("/users/self", PUBLIC_API_SERVER_DOMAIN);

		fetch(updateSelfURL, {
			method : 'put',
			body : formData
		})
	};
</script>

<section id="user-config">
	<div class="profile">
		<div class="header">My Profile</div>
		<div class="body">
			<div class="pfp" on:click|stopPropagation={togglePfpInput}>
				<img src={`${PUBLIC_API_SERVER_DOMAIN}/media/images/${user.pfp.curr}`} />
				<input type="file" hidden bind:this={pfpInput} accept="images/*" />
			</div>
			<div class="name">
				<p>username</p>
				<input type="text" name="username" id="" value={user.username} />
			</div>
		</div>
		<div class="footer">
			<button on:click={changeConfig} class="update btn-sig">update</button>
			<button on:click={resetConfig} class="cancel btn-cancel">reset</button>
		</div>
	</div>
	<div class="security">
		<div class="header">Security</div>
		<div class="body">
			<div class="email">
				<p>Email</p>
				<p class="text-blur">
					{user.email}
				</p>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	section#user-config {
		display: grid;
		gap: 20px;
		padding: 10px;
		p {
			font-size: 0.7em;
		}

		> * {
			display: flex;
			flex-direction: column;

			.header {
				width: 100%;
				padding: 0 0 10px 0;
				border-bottom: 0.1px solid var(--font-dark-gray);
			}

			.body {
				padding: 20px 0;
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.footer {
				margin-top: 10px;
				display: flex;
				justify-content: end;
			}
		}
		.profile {
			.body {
				gap: 20px;
				.pfp {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 46px;
					height: 46px;
					border-radius: 23px;
					overflow: hidden;
					&:hover {
						cursor: pointer;
					}
					img {
						width: 100%;
					}
				}
				.name {
					display: flex;
					flex-direction: column;
					gap: 10px;
				}
			}
		}
	}
</style>
