<script lang="ts">
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	import type { LiveSessionWithAll } from '../../../types/session';
	import StateTag from '../tags/StateTag.svelte';

	interface Props {
		liveSession: LiveSessionWithAll;
	}

	const { liveSession }: Props = $props();
</script>

<a class="card middle-rounded" href={`/session/live/${liveSession.id}`}>
	<div class="body">
		<div class="thumbnail-wrapper">
			<img
				src={new URL(liveSession.thumbnail_uri, PUBLIC_API_SERVER_DOMAIN).href}
				alt=""
				class="thumbnail"
			/>
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
						<th>interval</th>
						<td>
							{#if liveSession.break_time}
								<span class="break-time">
									<span class="interval">
										{liveSession.break_time.interval} minutes
									</span>
								</span>
							{:else}
								<span class="break-time-none">x</span>
							{/if}
						</td>
					</tr>
					<tr>
						<th>break time</th>
						<td>
							{#if liveSession.break_time}
								<span class="duration"> {liveSession.break_time.duration} minutes</span>
							{:else}
								<span class="break-time-none">x</span>
							{/if}
						</td>
					</tr>
					<tr>
						<th><span>started at</span></th>
						<td><span>{liveSession.created_at}</span></td>
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
					src={new URL(liveSession.organizer.pfp.curr, PUBLIC_API_SERVER_DOMAIN).href}
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
	$card-width: 320px;
	$card-ratio: 16 / 9;
	.card {
		background-color: var(--bg);
		overflow: hidden;
		flex: 0 0 $card-width;
		width: $card-width;
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
			padding: 5px 10px;
			gap: 10px;
			.session-info {
				font-size: 12px;
				display: flex;
				flex-direction: column;
				table {
					border-collapse: collapse;
					tr {
						border-bottom: 2px solid var(--bg-sideBar);
						th {
							padding: 5px;
							text-align: start;
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
						font-size: 13px;
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
