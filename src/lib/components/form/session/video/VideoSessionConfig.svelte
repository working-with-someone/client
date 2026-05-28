<script lang="ts">
	import CategorySearchBox from '$lib/components/input/CategorySearchBox.svelte';
	import InnerLabelInput from '$lib/components/input/InnerLabelInput.svelte';
	import { access_level } from '@prisma/client';
	import { VideoSessionForm } from '$lib/video/VideoSession.svelte';
	import { to } from '../../../../../config/path.config.svelte';
	import { generateThumbnails } from '$lib/utils/thumbnail-generator';
	import LoadSpinner from '$lib/components/loader/LoadSpinner1.svelte';
	import type { UploadStage } from '../../../../../types/stage';
	import TextError from '$lib/components/error/TextError.svelte';

	let thumbnailImgInput: HTMLInputElement;

	interface Props {
		videoSessionForm: VideoSessionForm;
		uploadStage: UploadStage;
	}

	let { videoSessionForm, uploadStage }: Props = $props();

	let thumbnailImg: HTMLImageElement;
	let generatedThumbnails: File[] = [];

	const toggleThumbnailInput = () => thumbnailImgInput.click();

	let showThumbnailPrompt = $state(true);
	let showThumbnailGeneratedSelection = $state(false);
	let showThumbnailPreview = $state(false);
	let thumbNailGenerationInProgress = $state(false);

	let thumbnailError = $state<Error>();

	const changeThumbnailPreview = () => {
		if (thumbnailImgInput.files) {
			const reader = new FileReader();
			showThumbnailPrompt = false;
			showThumbnailPreview = true;
			reader.onload = function (e) {
				if (e?.target?.result) {
					thumbnailImg.src = e.target.result.toString();
				}
			};

			reader.readAsDataURL(thumbnailImgInput.files[0]);
		}

		if (thumbnailImgInput.files) {
			videoSessionForm.thumbnailFile = thumbnailImgInput.files[0];
		}
	};

	const cancelThumbnail = () => {
		if (!thumbnailImgInput.files) return;

		videoSessionForm.thumbnailFile = null;
		showThumbnailPrompt = true;
		showThumbnailPreview = false;
		showThumbnailGeneratedSelection = false;
		thumbnailImg.src = '';
	};

	const generateThumbnail = async () => {
		if (uploadStage != 'completed') {
			thumbnailError = new Error('video upload not completed');
			return;
		}

		generatedThumbnails = [];
		if (!videoSessionForm?.video_id) return;

		thumbNailGenerationInProgress = true;
		showThumbnailPrompt = false;
		showThumbnailGeneratedSelection = true;

		const url = to.mediaServer.staticServer.video + '/' + videoSessionForm.video_id;

		const thumbNails = await generateThumbnails(url, 3);

		if (thumbNails && thumbNails.length > 0) {
			for (let i = 0; i < thumbNails.length; i++) {
				generatedThumbnails.push(thumbNails[i]);
			}
		}

		thumbNailGenerationInProgress = false;
	};

	const selectGeneratedThumbnail = (thumbnail: File) => {
		videoSessionForm.thumbnailFile = thumbnail;
		showThumbnailGeneratedSelection = false;
		showThumbnailPreview = true;

		const reader = new FileReader();

		reader.onload = function (e) {
			if (e?.target?.result) {
				thumbnailImg.src = e.target.result.toString();
			}
		};

		reader.readAsDataURL(thumbnail);
	};
</script>

<div class="video-session-config">
	<div class="detail config">
		<div class="header-sub header-sub2">
			<p>Details</p>
		</div>
		<InnerLabelInput label={'title (required)'}>
			<input
				type="text"
				name="title"
				id=""
				placeholder="title of your video"
				bind:value={videoSessionForm.title}
			/>
		</InnerLabelInput>

		<InnerLabelInput label={'description'}>
			<textarea
				name="description"
				id=""
				cols="30"
				rows="10"
				placeholder="description of your video"
				bind:value={videoSessionForm.description}
			></textarea>
		</InnerLabelInput>
	</div>
	<div class="video-preview config">
		<div class="header-sub">
			<p>uploaded video</p>
		</div>
		{#if videoSessionForm.video_uploaded}
			<video
				controls
				src={to.mediaServer.staticServer.video + '/' + videoSessionForm.video_id}
				class="middle-rounded"
			></video>
		{:else}
			<p class="text-blur">no video uploaded</p>
		{/if}
	</div>
	<div class="thumbnail config">
		<div class="header-sub header-sub2">
			<p>Thumbnail</p>
			<span>select thumbnail for video</span>
		</div>
		<div class="thumbnail-wrapper">
			{#if showThumbnailPrompt}
				<div class="thumbnail-prompt middle-rounded" onclick={toggleThumbnailInput}>
					<span class="material-symbols-outlined"> upload_file </span>
					<p>upload file</p>
				</div>
				<div class="thumbnail-generate-prompt middle-rounded" onclick={generateThumbnail}>
					<span class="material-symbols-outlined"> auto_fix_high </span>
					<p>auto generate</p>
				</div>
			{/if}

			{#if showThumbnailPreview}
				<div class="thumbnail-preview">
					<button class="btn-circle" onclick={cancelThumbnail}>
						<span class="material-symbols-outlined"> close </span>
					</button>
					<img
						bind:this={thumbnailImg}
						alt=""
						src="https://cloudfour.com/examples/img-currentsrc/images/kitten-small.png"
					/>
				</div>
			{/if}

			{#if showThumbnailGeneratedSelection}
				<div class="thumbnail-generated-selection">
					{#if thumbNailGenerationInProgress}
						<LoadSpinner size={20} />
						<span class="text-blur">generating thumbnails...</span>
					{:else}
						{#each generatedThumbnails as thumbnail, index}
							<div
								class="thumbnail-generated middle-rounded"
								onclick={() => selectGeneratedThumbnail(thumbnail)}
							>
								<img
									src={URL.createObjectURL(thumbnail)}
									alt={`generated thumbnail ${index + 1}`}
								/>
							</div>
						{/each}
						<div class="close-btn-wrapper">
							<button class="close btn-circle" onclick={cancelThumbnail}>
								<span class="material-symbols-outlined"> close </span>
							</button>
						</div>
					{/if}
				</div>
			{/if}
		</div>
		<div class="error">
			<TextError error={thumbnailError} fontsize={12} fade={true}></TextError>
		</div>
	</div>

	<div class="category config">
		<div class="header-sub header-sub2">
			<p>Category</p>
			<span>select category</span>
		</div>
		<CategorySearchBox
			selectOption={(categoryLabel) => {
				videoSessionForm.category_label = categoryLabel;
				return false;
			}}
		/>
	</div>

	<div class="privacy config">
		<div class="header-sub header-sub2">
			<p>Privacy</p>
			<span>who can join your session?</span>
		</div>

		<div class="privacy-selector">
			<label class="radio">
				<span class="privacy-tag">Public</span>
				<span class="privacy-desc">( all users can join this live session )</span>
				<input
					type="radio"
					onchange={() => (videoSessionForm.access_level = access_level.PUBLIC)}
					checked={videoSessionForm.access_level === access_level.PUBLIC}
					name="radio"
				/>
				<span class="checkmark"></span>
			</label>
			<label class="radio">
				<span class="privacy-tag">Followers Only</span>
				<span class="privacy-desc">( only your followers can join this live session )</span>
				<input
					type="radio"
					onchange={() => {
						videoSessionForm.access_level = access_level.FOLLOWER_ONLY;
					}}
					checked={videoSessionForm.access_level === access_level.FOLLOWER_ONLY}
					name="radio"
				/>
				<span class="checkmark"></span>
			</label>
			<label class="radio">
				<span class="privacy-tag">Private</span>
				<span class="privacy-desc"
					>( Only you and user you have specified can join this live session )</span
				>
				<input
					type="radio"
					onchange={() => {
						videoSessionForm.access_level = access_level.PRIVATE;
					}}
					checked={videoSessionForm.access_level === access_level.PRIVATE}
					name="radio"
				/>
				<span class="checkmark"></span>
			</label>
		</div>
	</div>
</div>

<input
	type="file"
	name="thumbnail"
	id=""
	accept="image/*"
	bind:this={thumbnailImgInput}
	hidden
	onchange={changeThumbnailPreview}
/>

<style lang="scss">
	.video-session-config {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		gap: 30px;
		max-height: 500px;
		overflow-y: scroll;
		padding: 20px;

		.config {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		.header-sub2 {
			margin-bottom: 5px;
			p {
				font-size: 15px;
			}
			span {
				font-size: 13px;
				color: var(--font-light-gray);
			}
		}

		.detail {
			input {
				background-color: var(--bg);
				font-size: 15px;
				&::placeholder {
					color: var(--font-dark-gray);
				}
			}
			textarea {
				background-color: var(--bg);
				font-size: 15px;
				height: 100px;
				&::placeholder {
					color: var(--font-dark-gray);
				}
			}
		}
		.video-preview {
			video {
				width: 100%;
			}
			.text-blur {
				color: var(--font-light-gray);
				font-size: 15px;
			}
		}
		.upload {
			.upload-wrapper {
				overflow: hidden;

				width: 100%;
				aspect-ratio: 16/9;
				height: auto;
				border: 1px solid var(--font-light-gray);
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.thumbnail {
			display: flex;
			flex-direction: column;
			gap: 10px;

			.thumbnail-wrapper {
				display: flex;
				flex-direction: row;
				gap: 10px;

				.thumbnail-prompt {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 5px;
					width: 150px;
					aspect-ratio: 16/9;
					border: 1px solid var(--font-light-gray);
					&:hover {
						cursor: pointer;
						border: 1px solid var(--font-white);
					}
					p {
						color: var(--font-light-gray);
						font-size: 15px;
					}
				}

				.thumbnail-generate-prompt {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 5px;
					width: 150px;
					aspect-ratio: 16/9;
					border: 1px solid var(--font-light-gray);
					&:hover {
						cursor: pointer;
						border: 1px solid var(--font-white);
					}
					p {
						color: var(--font-light-gray);
						font-size: 15px;
					}
				}
				.thumbnail-preview {
					width: 300px;
					position: relative;
					background-color: black;
					button {
						position: absolute;
						top: 5px;
						right: 5px;
						span {
							font-size: 20px;
						}
					}
					img {
						width: 100%;
						object-fit: cover;
					}
				}

				.thumbnail-generated-selection {
					display: flex;
					flex-direction: row;
					gap: 10px;

					.thumbnail-generated {
						width: 150px;
						aspect-ratio: 16/9;
						border: 1px solid var(--font-light-gray);
						&:hover {
							cursor: pointer;
							border: 1px solid var(--font-white);
						}
						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}

					.close-btn-wrapper {
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}
</style>
