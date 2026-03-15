<script lang="ts">
	import { VideoSessionForm } from '$lib/video/VideoSession.svelte';
	import VideoSessionConfig from '../form/session/video/VideoSessionConfig.svelte';
	import VideoUploadForm from '../form/session/video/VideoUploadForm.svelte';
	import UploadLoader from '../loader/UploadLoader.svelte';
	import wwsfetch from '$lib/utils/wwsfetch';

	const videoSessionForm = new VideoSessionForm();

	let step = $state<number>(1);

	type UploadStage = 'select' | 'uploading' | 'completed';
	let uploadStage: UploadStage = $state('select');
	let uploadProgressPercentage = $state<string>('0');
	let errorMessage = $state<string>('');

	const onUploadComplete = (videoId: string, name: string) => {
		videoSessionForm.title = name;
		videoSessionForm.video_uploaded = true;
		videoSessionForm.video_id = videoId;

		createVideoSession()
			.then((res) => {
				uploadStage = 'completed';
			})
			.catch((err) => {
				errorMessage = 'Failed to create video session. Please try again.';

				uploadStage = 'select';
			});
	};

	const onUploadProgress = (percentage: string) => {
		step = 2;
		uploadStage = 'uploading';
		uploadProgressPercentage = percentage;
	};

	const onUploadError = (error: Error) => {
		errorMessage = 'Failed to upload video. Please try again.';
		step = 1;
		uploadStage = 'select';
	};

	const createVideoSession = async () => {
		const formData = new FormData();

		formData.append('title', videoSessionForm.title);

		// required
		formData.append('video_id', videoSessionForm.video_id!);
		formData.append('access_level', videoSessionForm.access_level);

		const res = await wwsfetch('/sessions/video', {
			method: 'POST',
			body: formData
		});

		const data = (await res.json()).data;

		videoSessionForm.id = data.id;
		videoSessionForm.video_id = data.video_id;
	};

	const updateVideoSession = async () => {
		const formData = new FormData();
		formData.append('title', videoSessionForm.title);
		formData.append('description', videoSessionForm.description);
		formData.append('access_level', videoSessionForm.access_level);
		formData.append('category_label', videoSessionForm.category_label);

		if (videoSessionForm.thumbnailFile) {
			formData.append('thumbnail', videoSessionForm.thumbnailFile);
		}

		const res = await wwsfetch(`/sessions/video/${videoSessionForm.id}`, {
			method: 'PUT',
			body: formData
		});

		const data = await res.json();

		videoSessionForm.title = data.title;
		videoSessionForm.description = data.description;
		videoSessionForm.access_level = data.access_level;
		videoSessionForm.video_id = data.video_id;

		window.location.href = `/session/video/${videoSessionForm.id}`;
	};
</script>

<section id="session-upload-config" class="much-rounded">
	{#if step === 1}
		<div class="header">Upload Video</div>
		<div class="body">
			<VideoUploadForm {onUploadComplete} {onUploadProgress} {onUploadError} />
		</div>
		<div class="footer">
			{errorMessage}
		</div>
	{:else if step === 2}
		<div class="header">Video Session Config</div>
		<div class="body">
			<VideoSessionConfig {videoSessionForm} />
		</div>
		<div class="footer">
			{#if uploadStage === 'uploading'}
				<div class="upload-progress-wrapper">
					<div class="uploader-wrapper">
						<UploadLoader />
					</div>
					<span>uploading ({uploadProgressPercentage}%)</span>
				</div>
			{:else if uploadStage === 'completed'}
				<div class="upload-complete-wrapper">
					<span class="material-symbols-outlined"> check_circle </span>
					<span>upload complete</span>
				</div>
				<div class="create-button">
					<button on:click={updateVideoSession}>create session</button>
				</div>
			{/if}
		</div>
	{/if}
</section>

<style lang="scss">
	section#session-upload-config {
		width: 700px;
		background-color: var(--bg);
		padding: 5px 10px;
		.header {
			padding: 10px;
			border-bottom: 1px solid gray;
		}

		.body {
			.thumbnail {
				display: flex;
				flex-direction: column;
				gap: 10px;
			}
		}
		.footer {
			display: flex;
			align-items: stretch;
			justify-content: space-between;
			padding: 10px 5px;
			border-top: 1px solid var(--font-light-gray);
			font-size: 0.9em;
			.upload-progress-wrapper {
				display: flex;
				align-items: center;
				gap: 15px;

				.uploader-wrapper {
					display: flex;
					flex-direction: row;
					align-items: center;
					gap: 20px;
					font-size: 20px;
				}
			}

			.upload-complete-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 10px;
				span {
					&:first-child {
						font-size: 20px;
						color: var(--light-green);
					}
					&:last-child {
					}
				}
			}

			.create-button {
				button:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}
				button {
					background-color: var(--sig);
					color: var(--bg);
					font-size: 0.8em;
				}
			}
		}
	}
</style>
