<script lang="ts">
	import VideoSessionConfig from '../form/session/video/VideoSessionConfig.svelte';
	import VideoUploadForm from '../form/session/video/VideoUploadForm.svelte';

	let step = $state<number>(1);

	const handleNext = () => {
		step += 1;
	};
</script>

<section id="session-upload-config">
	<div class="header">Create Video Session</div>

	<div class="body">
		{#if step === 1}
			<VideoUploadForm />
		{:else if step === 2}
			<VideoSessionConfig />
		{/if}
	</div>
	<div class="footer">
		<button class="next-button" onclick={handleNext}>
			{#if step === 1}
				Upload
			{:else if step === 2}
				Complete
			{/if}
		</button>
	</div>
</section>

<style lang="scss">
	section#session-upload-config {
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
		.footer {
			display: flex;
			justify-content: end;
			padding: 20px 10px 10px 10px;
			border-top: 1px solid var(--font-light-gray);
			.next-button {
				background-color: var(--sig);
				color: var(--bg);
				font-size: 12px;
			}
		}
	}
</style>
