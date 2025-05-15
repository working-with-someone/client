<script lang="ts">
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	import type { LiveSession } from '../../../types/session';
	import StateTag from '../tags/StateTag.svelte';

	interface Props {
		liveSession: LiveSession;
	}

	const { liveSession }: Props = $props();
</script>

<a class="card middle-rounded" href={`/session/live/${liveSession.id}`}>
	<div class="body">
		<div class="thumbnail-wrapper">
			<img src={liveSession.thumbnail_uri} alt="" class="thumbnail" />
			<span class="material-symbols-outlined live-icon much-rounded"> bigtop_updates </span>
			<div class="status-tag-wrapper">
				<StateTag state={liveSession.status} />
			</div>
		</div>
	</div>
	<div class="footer">
		<div class="session-info">
			<table>
				<tbody>
					<tr>
						<th>Interval</th>
						<td>
							{#if liveSession.break_time}
								<span class="break-time">
									<span class="interval">
										{liveSession.break_time.interval} minutes
									</span>
								</span>
							{:else}
								<span class="break-time-none"
									><span class="material-symbols-outlined"> close </span></span
								>
							{/if}
						</td>
					</tr>
					<tr>
						<th>Break time</th>
						<td>
							{#if liveSession.break_time}
								<span class="duration"> {liveSession.break_time.duration} minutes</span>
							{:else}
								<span class="break-time-none"
									><span class="material-symbols-outlined"> close </span></span
								>
							{/if}
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="user-info">
			<button
				class="btn-div pfp-wrapper"
				onclick={(e) => {
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
</a>

<style lang="scss">
	$card-width: 400px;
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
				padding-top: calc(100% / $card-ratio);
				overflow: hidden;
				.thumbnail {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
				.live-icon {
					position: absolute;
					top: 10px;
					right: 10px;
					font-size: 24px;
					color: var(--sig);
					background-color: rgba(0, 0, 0, 0.5);
					padding: 4px 8px;
					z-index: 1;
				}
				.status-tag-wrapper {
					position: absolute;
					bottom: 10px;
					right: 10px;
					z-index: 1;
				}
			}
		}
		.footer {
			display: flex;
			flex-direction: column;
			padding: 10px;
			gap: 10px;
			.session-info {
				font-size: 12px;
				table {
					border-collapse: collapse;
					width: 100%;
					tr {
						border-bottom: 2px solid var(--bg-sideBar);
						th, td {
							padding: 5px;
							text-align: start;
						}
						th {
							width: 50%;
						}
						.break-time-none span {
							font-size: 18px;
						}
					}
				}
			}
			.user-info {
				display: flex;
				gap: 10px;
				align-items: center;
				.pfp-wrapper {
					width: 30px;
					height: 30px;
					border-radius: 15px;
					overflow: hidden;
					flex-shrink: 0;
					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}
				.info {
					flex: 1;
					min-width: 0;
					.title {
						font-size: 14px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						width: 100%;
					}
					.username {
						font-size: 12px;
						color: rgba(255, 255, 255, 0.5);
					}
				}
			}
		}
	}
</style>