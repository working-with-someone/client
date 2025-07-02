<script lang="ts">
	import { PUBLIC_TUS_SERVER_DOMAIN } from '$env/static/public';
	import { Upload } from 'tus-js-client';

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
			onError: () => {
				console.error('error raised while tus upload');
			},
			onProgress: () => {
				console.log('tus upload start');
			},
			onSuccess: () => {
				console.log('tus upload done!');
			}
		});

		upload.start();
	}
</script>

<div class="video-upload-form">
	<div class="upload-icon">
		<span class="material-symbols-outlined"> arrow_upload_ready </span>
	</div>
	<div class="prompt">
		<p>select file or drag and drop</p>
		<p class="text-blur text-08">The video will remain private until all steps are completed.</p>
	</div>

	<div class="select-file-btn">
		<button onclick={() => videoFileInput.click()}>select file</button>
	</div>

	<input type="file" hidden bind:this={videoFileInput} onchange={uploadVideoFile} />
</div>

<style lang="scss">
	.video-upload-form {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 200px 0px;
		flex-direction: column;
		gap: 20px;
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
</style>
