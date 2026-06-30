<script lang="ts">
	import { VideoSessionForm } from '$lib/video/VideoSession.svelte';
	import VideoSessionConfig from '../form/session/video/VideoSessionConfig.svelte';
	import VideoUploadForm from '../form/session/video/VideoUploadForm.svelte';
	import UploadLoader from '../loader/UploadLoader.svelte';
	import wwsfetch from '$lib/utils/wwsfetch';
	import type { UploadStage } from '../../../types/stage';
	const videoSessionForm = new VideoSessionForm();
	import TextError from '../error/TextError.svelte';
	import moveTo from '$lib/utils/navigation';

	let step = $state<number>(1);

	let uploadStage: UploadStage = $state('select');
	let uploadProgressPercentage = $state<string>('0');
	let uploadError = $state<Error>();

	let updateError = $state<Error>();

	const onUploadComplete = (videoId: string, name: string) => {
		videoSessionForm.title = name;
		videoSessionForm.video_uploaded = true;
		videoSessionForm.video_id = videoId;

		createVideoSession()
			.then((res) => {
				uploadStage = 'completed';
			})
			.catch((err) => {
				uploadError = new Error('Failed to create video session. Please try again.');

				uploadStage = 'select';
			});
	};

	const onUploadProgress = (percentage: string) => {
		step = 2;
		uploadStage = 'uploading';
		uploadProgressPercentage = percentage;
	};

	const onUploadError = (error: Error) => {
		uploadError = new Error('Failed to upload video. Please try again.');
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

		wwsfetch(`/sessions/video/${videoSessionForm.id}`, {
			method: 'PUT',
			body: formData
		})
			.then((res) => {
				moveTo.videoSession(videoSessionForm.id);
			})
			.catch((err) => {
				updateError = new Error(err.message || 'Failed to update video session. Please try again.');
			});
	};
</script>

<section id="session-upload-config" class="much-rounded">
	{#if step === 1}
		<div class="header">Upload Video</div>
		<div class="body">
			<VideoUploadForm {onUploadComplete} {onUploadProgress} {onUploadError} />
		</div>
		<div class="footer">
			<TextError error={uploadError} fontsize={12} fade={true}></TextError>
		</div>
	{:else if step === 2}
		<div class="header">Video Session Config</div>
		<div class="body">
			<VideoSessionConfig {videoSessionForm} {uploadStage} />
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
				<div class="error-wrapper">
					<TextError error={updateError} fontsize={12}></TextError>
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
			gap: 10px;
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
				flex-shrink: 0;
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
			.error-wrapper {
				display: flex;
				align-items: center;
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
