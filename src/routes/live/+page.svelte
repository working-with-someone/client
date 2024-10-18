<script>
	export let data;
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
</script>

<section id="live">
	<div class="deck">
		{#each data.liveStreamings as liveStreaming}
			<div class="card middle-rounded">
				<div class="body">
					<img class="thumbnail" src={liveStreaming.thumbnail} alt="" />
				</div>
				<div class="footer">
					<div class="pfp">
						<img
							src={new URL(
								`${liveStreaming?.user?.pfp?.curr}`,
								PUBLIC_API_SERVER_DOMAIN
							).toString()}
							alt=""
						/>
					</div>
          <div class="info">
            <p class = "title">{liveStreaming.title}</p>
            <p class="duration">342:23</p>  
          </div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
  section#live{
    .deck {
		display: flex;
		flex-direction: row;
    gap : 20px;

		.card {
			background-color: var(--bg-sideBar);
      overflow: hidden;
      border : 1px solid rgba(235, 90, 64, 0.6);

      width: 300px;
			.body {
				.thumbnail {
					width: 100%;
				}
			}

			.footer {
				display: flex;
				flex-direction: row;
        gap : 10px;
        padding : 10px;
				.pfp {
					width: 30px;
					height: 30px;
					border-radius: 15px;
					overflow: hidden;
					img {
						width: 100%;
						object-fit: cover;
					}
				}
        .title{
          font-size : 12px;
          text-align: center;
        }
        .duration{
          font-size : 10px;
          color : var(--font-dark-gray);
        }
			}
		}
	}
  }
	
</style>
