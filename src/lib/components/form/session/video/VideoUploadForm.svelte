<script lang="ts">
	import { PUBLIC_TUS_SERVER_DOMAIN } from '$env/static/public';
	import { Upload } from 'tus-js-client';

	interface Props {
		onUploadComplete?: (videoId: string, name: string) => void;
		onUploadProgress?: (percentage: string) => void;
		onUploadError?: (errorMessage: Error) => void;
	}

	const { onUploadComplete, onUploadProgress, onUploadError }: Props = $props();

	let videoFileInput: HTMLInputElement;

	function uploadVideoFile() {
		if (!videoFileInput.files) {
			// alert to user file does not selected
			return;
		}

		const file = videoFileInput.files[0];
		const upload = new Upload(file, {
			endpoint: PUBLIC_TUS_SERVER_DOMAIN,
			retryDelays: [0, 3000, 5000, 10000, 20000],
			metadata: { filename: file.name, filetype: file.type },
			onError: function (error) {
				onUploadError?.(error);
			},
			onProgress: function (bytesUploaded, bytesTotal) {
				const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);

				onUploadProgress?.(percentage);
			},
			onSuccess: function (payload) {
				const videoId = JSON.parse(payload.lastResponse.getBody()).video_id;
				const name = upload.file.name;

				onUploadComplete?.(videoId, name);
			}
		});

		upload.start();
	}
</script>

<div
	class="video-upload-form"
	onclick={() => {
		videoFileInput.click();
	}}
>
	<div class="select-form">
		<div class="upload-icon">
			<span class="material-symbols-outlined"> arrow_upload_ready </span>
		</div>
		<div class="prompt">
			<p>select file or drag and drop</p>
			<p class="text-blur text-08">The video will remain private until all steps are completed.</p>
		</div>
	</div>
	<input
		type="file"
		hidden
		bind:this={videoFileInput}
		onchange={() => {
			uploadVideoFile();
		}}
		accept="video/mp4,video/mkv, video/x-m4v,video/*"
	/>
</div>

<style lang="scss">
	.video-upload-form {
		padding: 100px 20px;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.select-form {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50px;
			gap: 20px;

			&:hover {
				cursor: pointer;
			}
			.prompt {
				display: flex;
				align-items: center;
				flex-direction: column;
			}
			.upload-icon {
				span {
					font-size: 50px;
				}
			}
		}

		.progress {
			width: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10px;
			.progress-bar {
				width: 100%;
				height: 10px;
				border: 1px solid var(--font-light-gray);
				.bar {
					width: 0;
					height: 100%;
					background-color: var(--sig);
				}
			}
		}

		.uploaded-video-preview-wrapper {
			width: 100%;
			height: 100%;
			background-color: black;
			display: flex;
			align-items: center;
			.uploaded-video-preview {
				width: 100%;
				max-height: 300px;
				object-fit: cover;
			}
		}
	}
</style>
