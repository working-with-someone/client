<script>
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	import wwsfetch from '$lib/utils/wwsfetch';
	import { getContext } from 'svelte';
	export let data;

	let { targetUser, isFollowing } = data;
	const user = getContext('user');
	const isSelf = $user.id == targetUser.id;

	function reloadTarget(){
		wwsfetch(`/users/${targetUser.id}`, {})
      .then((res) => res.json())
      .then(data => {
        targetUser = data;
      })
      .catch((err) => {
        console.log('Failed to fetch user data');
      });
	}

	function follow() {
		wwsfetch(`/users/${$user.id}/followings/${targetUser.id}`, {
			method: 'POST'
		})
			.then((res) => {
				if (res.status === 201) {
					isFollowing = true;
					reloadTarget();
				}
			})
			.catch((err) => {
				console.log('failed following user');
			});
	}

	function unfollow() {
		wwsfetch(`/users/${$user.id}/followings/${targetUser.id}`, {
			method: 'DELETE'
		})
			.then((res) => {
				if (res.status === 204) {
					isFollowing = false;
					reloadTarget();
				}
			})
			.catch((err) => {
				console.log('failed unfollowing user');
			});
	}
</script>

<section id="user">
	<div class="detail">
		<div class="summary">
			<div class="pfp">
				<img src={new URL(targetUser.pfp.curr, PUBLIC_API_SERVER_DOMAIN).toString()} alt="" />
			</div>
			<div class="username">
				<span>{targetUser.username}</span>
			</div>
			{#if !isSelf}
				<div class="follow">
					{#if isFollowing}
						<button class="btn-gray" on:click={unfollow}>
							<span>following</span>
						</button>
					{:else}
						<button class="btn-sig" on:click={follow}>
							<span> follow </span></button
						>
					{/if}
				</div>
			{/if}
			<div class="join-info">
				<div class="icon">
					<span class="material-symbols-outlined"> groups </span>
				</div>
				<div class="joiner">
					<span class="count">{targetUser.followers_count}</span>
					<a class="link" href="#">followers</a>
				</div>
				<div class="seperator">
					<span>·</span>
				</div>
				<div class="joining">
					<span class="count">{targetUser.followings_count}</span>
					<a class="link" href="#">following</a>
				</div>
			</div>
		</div>

		<div class="intro-box">
			<div class="header">
				<h5>seungho-hub와 함께 study with me! 👋</h5>
			</div>
			<div class="body">
				<img
					src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white"
				/>
				<img
					src="https://img.shields.io/badge/Express-339933?style=for-the-badge&logo=Express&logoColor=white"
				/>
				<img
					src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white"
				/>
				<img
					src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white"
				/>
				<img
					src="https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=Svelte&logoColor=white"
				/>
				<img
					src="https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=Electron&logoColor=white"
				/>
				<img
					src="https://img.shields.io/badge/mysql-%236DB33F.svg?style=for-the-badge&logo=mysql&logoColor=white"
				/>

				<a href="https://www.notion.so/seungho-hub" target="_blank"
					><img
						src="https://img.shields.io/badge/Notion-fff?style=for-the-badge&logo=Notion&logoColor=black"
					/></a
				>
				<a href="https://leetcode.com/seungho-hub/" target="_blank"
					><img
						src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=LeetCode&logoColor=white"
					/></a
				>

				<br />

				<picture>
					<source
						media="(prefers-color-scheme: dark)"
						srcset="https://github-readme-stats-ouuan.vercel.app/api?username=seungho-hub&theme=dark&show_icons=true"
					/>
					<img
						src="https://github-readme-stats-ouuan.vercel.app/api?username=seungho-hub&show_icons=true"
					/>
				</picture>
			</div>
		</div>

		<div class="videos"></div>
	</div>
</section>

<style lang="scss">
	.detail {
		margin: 50px;
		display: flex;
		flex-direction: row;
		flex: 1 auto;
		gap: 100px;
		.summary {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20px;
			flex-basis: 300px;
			.pfp {
				width: 300px;
				height: 300px;
				border-radius: 150px;
				overflow: hidden;
				img {
					width: 100%;
					object-fit: cover;
				}
			}
			.follow {
				width: 50%;
				button {
					width: 100%;
					display : flex;
					align-items: center;
					justify-content: center;
					span {
						font-size : 1.2em;
						color: var(--bg);
					}
				}
			}
			.join-info {
				width: auto;
				display: flex;
				flex-direction: row;
				gap: 6px;
				.icon {
					span {
						color: var(--font-light-gray);
					}
				}
				.link {
					color: var(--font-light-gray);
				}
			}
			.social {
				width: 50%;
				display: flex;
				align-items: start;
				justify-content: start;
				.subscribers {
					span {
						color: var(--font-light-gray);
					}
				}
			}
		}
		.intro-box {
			width: 100%;
			padding: 20px;
			border: 1px solid rgba(104, 104, 104, 0.5);
			.header {
				padding-bottom: 10px;
				border-bottom: 1px solid rgba(104, 104, 104, 0.5);
			}
			.body {
				padding-top: 10px;
			}
		}
	}
</style>
