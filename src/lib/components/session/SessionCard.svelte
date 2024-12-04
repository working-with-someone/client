<script lang="ts">
	import type { Session } from '../../../@types/video';
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	export let session: Session;

	function formatMinutesToHoursAndMinutes(minutes: number) {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return `${hours}h ${remainingMinutes}m`;
	}
</script>

<div class="card middle-rounded">
	<div class="body">
		<div class="thumbnail-wrapper">
			<img src={session.thumbnail} alt="" class="thumbnail" />
		</div>
	</div>
	<div class="footer">
		<div class="session-info">
			<table>
				<tr>
					<th>Duration</th>
					<td>{formatMinutesToHoursAndMinutes(session.time)}</td>
				</tr>
				<tr>
					<th>Breaks</th>
					<td>x</td>
				</tr>
				<tr>
					<th>Sound</th>
					<td><span>기다린만큼, 더 - 카더가든</span></td>
				</tr>
			</table>
		</div>
		<div class="user-info">
			<div
				class="pfp-wrapper"
				on:click={() => {
					window.location.href = `/user/${session.user.id}`;
				}}
			>
				<img
					src={new URL(`${session?.user?.pfp?.curr}`, PUBLIC_API_SERVER_DOMAIN).toString()}
					alt=""
				/>
			</div>
			<div class="info">
				<p class="title">{session.title}</p>
				<p class="username">{session.user.username}</p>
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
				.thumbnail {
					width: 100%;
				}
			}
		}

		.footer {
			display: flex;
			flex-direction: column;
			padding: 0px 10px;
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
