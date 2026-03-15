<script lang="ts">
	import CategorySearchBox from '$lib/components/input/CategorySearchBox.svelte';
	import InnerLabelInput from '$lib/components/input/InnerLabelInput.svelte';
	import { access_level } from '@prisma/client';
	import { VideoSessionForm } from '$lib/video/VideoSession.svelte';
	import { to } from '../../../../../config/path.config.svelte';

	let thumbnailImgInput: HTMLInputElement;

	interface Props {
		videoSessionForm: VideoSessionForm;
	}

	let { videoSessionForm }: Props = $props();

	let thumbnailImg: HTMLImageElement;

	const toggleThumbnailInput = () => thumbnailImgInput.click();

	let showThumbnailPrompt = $state(true);

	const changeThumbnailPreview = () => {
		if (thumbnailImgInput.files) {
			const reader = new FileReader();
			showThumbnailPrompt = false;

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
				src={new URL(videoSessionForm.video_id!, to.mediaServer.staticServer.video).href}
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
		<div class="thumbnail-wrapper middle-rounded">
			{#if showThumbnailPrompt}
				<div class="thumbnail-prompt" onclick={toggleThumbnailInput}>
					<span class="material-symbols-outlined"> upload_file </span>
					<p>upload file</p>
				</div>
			{:else}
				<div class="thumbnail-preview">
					<img bind:this={thumbnailImg} alt="" />
				</div>
			{/if}
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
				width: 150px;
				aspect-ratio: 16/9;
				border: 1px solid var(--font-light-gray);
				overflow: hidden;

				&:hover {
					cursor: pointer;
					border: 1px solid var(--font-white);
				}

				.thumbnail-prompt {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 5px;
					p {
						color: var(--font-light-gray);
						font-size: 15px;
					}
				}
				.thumbnail-preview {
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: black;
					img {
						width: 100%;
						object-fit: cover;
					}
				}
			}
		}
	}
</style>
