<script lang="ts">
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	import type { LiveSession } from '../../../types/session';
	import StateTag from '../tags/StateTag.svelte';

	interface Props {
		liveSession: LiveSession;
	}

	const { liveSession }: Props = $props();
</script>

<div
	class="card middle-rounded"
	onclick={() => {
		window.location.href = `/session/live/${liveSession.id}`;
	}}
>
	<div class="body">
		<div class="thumbnail-wrapper">
			<img src={liveSession.thumbnail_uri} alt="" class="thumbnail" />
		</div>
	</div>
	<div class="footer">
		<div class="title">
			<p>{liveSession.title}</p>
		</div>
		<div class="session-info">
			<table>
				<tbody>
					<tr>
						<th>Duration</th>
						<td><span class="material-symbols-outlined live-icon"> bigtop_updates </span></td>
					</tr>
					<tr>
						<th>Breaks</th>
						<td>
							{#if liveSession.break_time}
								<span class="break-time">each {liveSession.break_time.interval} minute</span>
							{:else}
								<span class="break-time-none"
									><span class="material-symbols-outlined"> close </span></span
								>
							{/if}
						</td>
					</tr>
					<tr>
						<th>status</th><td><StateTag state={liveSession.status} /></td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="user-info">
			<button
				class="btn-div pfp-wrapper"
				onclick = {(e) => {
					e.stopPropagation();
					window.location.href = `/user/${liveSession.organizer?.id}`;
				}}
			>
				<img
					src={new URL(`${liveSession.organizer.id}`, PUBLIC_API_SERVER_DOMAIN).toString()}
					alt={`${PUBLIC_API_SERVER_DOMAIN}/media/images/default/pfp`}
				/>
			</button>
			<div class="info">
				<p class="title">{liveSession.title}</p>
				<p class="username">{liveSession.organizer?.username}</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	$card-width: 320px;
	$card-ratio: 16 / 9;
	.card {
		background-color: var(--bg);
		overflow: hidden;
		flex: 0 0 $card-width;
		width: $card-width;
		border: 1px solid var(--sig);
		&:hover {
			cursor: pointer;
		}
		.body {
			.thumbnail-wrapper {
				width: 100%;
				position: relative;
				padding-top: calc(100% / $card-ratio); /* 16:9 비율 유지 */
				overflow: hidden;

				.thumbnail {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					object-fit: cover; /* 이미지를 영역에 맞게 조절 */
				}
			}
		}

		.footer {
			display: flex;
			flex-direction: column;
			padding: 10px;
			gap: 10px;
			.title {
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				font-size: 0.9em;
			}
			.session-info {
				font-size: 12px;
				display: flex;
				flex-direction: column;
				table {
					border-collapse: collapse;
					tr {
						border-bottom: 2px solid var(--bg-sideBar);
						td {
							.live-icon {
								font-size: 20px;
								color: var(--sig);
							}

							.break-time-none {
								span {
									font-size: 20px;
								}
							}
						}
						th {
							padding: 5px;
							text-align: start;
							width: 50%;
						}
					}
				}
			}
			.user-info {
				display: flex;
				flex-direction: row;
				gap: 10px;
			}
			.pfp-wrapper {
				width: 30px;
				height: 30px;
				border-radius: 15px;
				overflow: hidden;
				&:hover {
					cursor: pointer;
				}
				img {
					width: 100%;
					object-fit: cover;
				}
			}
			.info {
				width: 241px;
				.title {
					width: 100%;
					font-size: 12px;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.username {
					font-size: 10px;
					color: rgba(255, 255, 255, 0.5);
				}
			}
		}
	}
</style>
