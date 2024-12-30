<script lang="ts">
	import LiveSessionMediaConfig from './LiveSessionMediaConfig.svelte';
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	export let liveSession;

	let currAudioDeviceId: string;
	let currVideoDeviceId: string;

	let previewVideo: HTMLVideoElement;
	let showPreviewImg = true;

	async function generateMediaStream() {
		const constraints: MediaStreamConstraints = {
			audio: {
				deviceId: currAudioDeviceId
			},
			video: {
				deviceId: currVideoDeviceId
			}
		};

		const stream = await navigator.mediaDevices.getUserMedia(constraints);
		showPreviewImg = false;
		previewVideo.srcObject = stream;
	}
</script>

<section id="live-session-open-config">
	<div class="header">Open Live Session</div>

	<div class="body">
		<div class="preview">
			<div class="preview-thumbnail" hidden={!showPreviewImg}>
				<img src={`${PUBLIC_API_SERVER_DOMAIN}${liveSession.thumbnail_url}`} alt="" />
			</div>
			<div class="preview-media" hidden={showPreviewImg}>
				<video id="preview-video" autoplay src="" bind:this={previewVideo}></video>
			</div>
		</div>
		<div class="media-config">
			<LiveSessionMediaConfig
				{currAudioDeviceId}
				{currVideoDeviceId}
				on:generateMediaStream={generateMediaStream}
				{liveSession}
			/>
		</div>
	</div>
</section>

<style lang="scss">
	section#live-session-open-config {
		background-color: var(--bg-sideBar);
		width: 50%;
		padding: 20px;
		min-width: 300px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 10px;
		.header {
		}
		.body {
      .preview {
				margin-bottom : 20px;
        .preview-thumbnail{
          img{

            width : 100%;
          }

        }
				.preview-media {
					border-radius: 10px;
					video {
						width: 100%;
					}
				}
			}

		}
	}
</style>
