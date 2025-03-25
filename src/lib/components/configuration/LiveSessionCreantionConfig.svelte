<script lang="ts">
	import wwsfetch from '$lib/utils/wwsfetch';
	import { onMount } from 'svelte';
	import InnerLabelInput from '../input/InnerLabelInput.svelte';
	import Switch from '../input/ToggleSwitch.svelte';
	import { error } from '@sveltejs/kit';
	import TextError from '../error/TextError.svelte';
	import type { wwsError } from '$lib/error/wwsError';

	const toggleThumbnailInput = () => thumbnailImgInput.click();

	let thumbnailImgInput: HTMLInputElement;

	// must be fetch categories
	let thumbnailImg: HTMLImageElement;
	let enableBreakTime = $state(true);
	// must be fetch categories
	let categories: string[] = $state([]);

	let showThumbnailPrompt = $state(true);

	let title = $state('');
	let description = $state('');
	let category = $state('');
	let accessLevel = $state(1);

	let breakTimeInterval: string = '50';
	let breakTimeDuration: string = '10';

	let validationError = $state<App.Error>();
	onMount(() => {
		loadCategories();
	});

	function loadCategories() {
		wwsfetch('/categories', {})
			.then((res) => res.json())
			.then((data) => {
				category = data[0].label;
				data.forEach((category: any) => {
					categories = [...categories, category.label];
				});
			});
	}

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

	async function createLiveSession() {
		const formData = new FormData();

		formData.append('title', title);
		formData.append('description', description);
		formData.append('access_level', accessLevel.toString());
		formData.append('category', category);

		if (thumbnailImgInput.files) {
			formData.append('thumbnail', thumbnailImgInput.files[0]);
		}

		wwsfetch('/sessions/live', {
			method: 'POST',
			body: formData
		})
			.then((res) => res.json())
			.then((liveSession) => {
				if (enableBreakTime) {
					return wwsfetch(`/sessions/live/${liveSession.id}/break_time`, {
						method: 'POST',
						body: new URLSearchParams({
							interval: breakTimeInterval,
							duration: breakTimeDuration
						})
					}).then(() => liveSession);
				}
				return liveSession;
			})
			.then((liveSession) => {
				window.location.href = `/session/live/${liveSession.id}/studio`;
			})
			.catch((err: wwsError) => {
				validationError = err;
			});
	}
</script>

<section id="live-session-creation-config">
	<div class="header">Create Live Session</div>

	<div class="body">
		<div class="detail config">
			<div class="header-sub">
				<p>Details</p>
			</div>
			<InnerLabelInput label={'title (required)'}>
				<input
					type="text"
					name="title"
					id=""
					placeholder="title of your live session"
					bind:value={title}
				/>
			</InnerLabelInput>

			<InnerLabelInput label={'description'}>
				<textarea
					name="description"
					id=""
					cols="30"
					rows="10"
					placeholder="description of your live session"
					bind:value={description}
				></textarea>
			</InnerLabelInput>
		</div>
		<div class="thumbnail config">
			<div class="header-sub">
				<p>Thumbnail</p>
				<span>select thumbnail for live session</span>
			</div>
			<div class="thumbnail-wrapper middle-rounded">
				{#if showThumbnailPrompt}
					<button class="btn-text thumbnail-prompt" onclick={toggleThumbnailInput}>
						<span class="material-symbols-outlined"> upload_file </span>
						<p>upload file</p>
					</button>
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
			<div class="header-sub">
				<p>Category</p>
				<span>select category</span>
			</div>
			<div class="select-box middle-rounded">
				<select
					name="category"
					id=""
					class="category-input middle-rounded"
					placeholder="select category of live session"
					bind:value={category}
				>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="privacy config">
			<div class="header-sub">
				<p>Privacy</p>
				<span>who can join your session?</span>
			</div>

			<div class="privacy-selector">
				<label class="radio">
					<span class="privacy-tag">Public</span>
					<span class="privacy-desc">( all users can join this live session )</span>
					<input
						type="radio"
						onchange={() => (accessLevel = 1)}
						checked={accessLevel === 1}
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
							accessLevel = 2;
						}}
						checked={accessLevel === 2}
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
							accessLevel = 3;
						}}
						checked={accessLevel === 3}
						name="radio"
					/>
					<span class="checkmark"></span>
				</label>
			</div>
		</div>

		<hr />
		<div class="break-time config">
			<div class="header-sub">
				<p>Break Time</p>
				<Switch bind:toggled={enableBreakTime} />
				{#if !enableBreakTime}
					<span>Even if you disable the break time, a manual break is possible</span>
				{/if}
			</div>
			{#if enableBreakTime}
				<div class="minutes">
					<span>Every</span>
					<input
						class="break-time-duration-input"
						type="number"
						min="1"
						max="60"
						bind:value={breakTimeDuration}
					/>
					<span> minute break will be taken every </span>
					<input
						class="break-time-interval-input"
						type="number"
						min="10"
						max="600"
						bind:value={breakTimeInterval}
					/>
					<span>minutes.</span>
				</div>
			{/if}
		</div>
	</div>
	<div class="footer">
		<div class="error">
			<TextError error={validationError} />
		</div>
		<div class="start">
			<button onclick={createLiveSession} class="next-button">start</button>
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
</section>

<style lang="scss">
	section#live-session-creation-config {
		width: 700px;

		.header {
			padding: 10px;
			border-bottom: 1px solid gray;
		}

		.body {
			padding: 20px 30px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			gap: 30px;
			max-height: 500px;
			overflow-y: scroll;

			.config {
				display: flex;
				flex-direction: column;
				gap: 10px;
			}
			.header-sub {
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

			.break-time {
				.header-sub {
					display: flex;
					flex-direction: row;
					align-items: end;
					gap: 10px;
				}
				.minutes {
					font-size: 13px;
					span {
						color: var(--font-gray);
					}
					input {
						background: none;
						border: 1px solid var(--font-gray);
						width: 50px;
						padding: 1px 3px;
						text-align: center;
					}
				}
			}
		}
		.footer {
			display: flex;
			justify-content: end;
			gap: 20px;
			padding: 20px 10px 10px 10px;
			border-top: 1px solid var(--font-light-gray);
			.error {
				font-size: 12px;
				flex-grow: 1;
			}
			.start {
				flex-grow: 0;
				flex-shrink: 0;
				.next-button {
					background-color: var(--sig);
					color: var(--bg);
					font-size: 12px;
				}
			}
		}
	}
</style>
