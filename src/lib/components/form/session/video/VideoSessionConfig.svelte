<script lang="ts">
	import InnerLabelInput from '$lib/components/input/InnerLabelInput.svelte';

	let thumbnailImgInput: HTMLInputElement;

	const toggleThumbnailInput = () => thumbnailImgInput.click();

	// must be fetch categories
	let thumbnailImg: HTMLImageElement;

	// must be fetch categories
	const categories = ['study', 'read', 'code', 'working'];

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
	};
</script>

	<div class="detail config">
		<div class="header-sub header-sub2">
			<p>Details</p>
		</div>
		<InnerLabelInput label={'title (required)'}>
			<input type="text" name="title" id="" placeholder="title of your video" />
		</InnerLabelInput>

		<InnerLabelInput label={'description'}>
			<textarea name="description" id="" cols="30" rows="10" placeholder="description of your video"
			></textarea>
		</InnerLabelInput>
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
					<img
						bind:this={thumbnailImg}
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUnEgyQZ9_IAhE9kIXocwN7gytvYie-0z-A&s"
						alt=""
					/>
				</div>
			{/if}
		</div>
	</div>

	<div class="category config">
		<div class="header-sub header-sub2">
			<p>Category</p>
			<span>select category</span>
		</div>
		<div class="select-box middle-rounded">
			<select
				name="category"
				id=""
				class="category-input middle-rounded"
				placeholder="select category of video"
			>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="privacy config">
		<div class="header-sub header-sub2">
			<p>Privacy</p>
			<span>who can join your session?</span>
		</div>

		<div class="privacy-selector">
			<label class="radio">
				<span class="privacy-tag">Public</span>
				<span class="privacy-desc">( all users can see this video )</span>
				<input type="radio" checked={true} name="radio" />
				<span class="checkmark"></span>
			</label>
			<label class="radio">
				<span class="privacy-tag">Followers Only</span>
				<span class="privacy-desc">( only your followers can see this video )</span>
				<input type="radio" name="radio" />
				<span class="checkmark"></span>
			</label>
			<label class="radio">
				<span class="privacy-tag">Private</span>
				<span class="privacy-desc">( Only you can see this video )</span>

				<input type="radio" name="radio" />
				<span class="checkmark"></span>
			</label>
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
</style>
