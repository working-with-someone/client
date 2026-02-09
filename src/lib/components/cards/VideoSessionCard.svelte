<script lang="ts">
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	import type { VideoSessionWithAll } from '../../../types/session';

	interface Props {
		videoSession: VideoSessionWithAll;
	}

	const { videoSession }: Props = $props();
</script>

<div class="card middle-rounded">
	<div class="body">
		<div class="thumbnail-wrapper">
			<img
				src={new URL(videoSession.thumbnail_uri, PUBLIC_API_SERVER_DOMAIN).href}
				alt=""
				class="thumbnail"
			/>
		</div>
	</div>
	<div class="footer">
		<div class="session-info">
			<table>
				<tbody>
					<tr>
						<th>interval</th>
						<td>
							{#if videoSession.break_time}
								<span class="break-time">
									<span class="interval">
										{videoSession.break_time.interval} minutes
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
							{#if videoSession.break_time}
								<span class="duration"> {videoSession.break_time.duration} minutes</span>
							{:else}
								<span class="break-time-none">x</span>
							{/if}
						</td>
					</tr>

					<tr>
						<th><span>created at</span></th>
						<td><span>{videoSession.created_at}</span></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="user-info">
			<button
				class="btn-div pfp-wrapper"
				on:click={() => {
					window.location.href = `/user/${videoSession.organizer_id}`;
				}}
			>
				<img
					src={new URL(
						`${videoSession?.organizer?.pfp?.curr}`,
						PUBLIC_API_SERVER_DOMAIN
					).toString()}
					alt={`${PUBLIC_API_SERVER_DOMAIN}/media/images/default/pfp`}
				/>
			</button>
			<div class="info">
				<p class="title">{videoSession.title}</p>
				<p class="username">{videoSession.organizer.username}</p>
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
</style>
