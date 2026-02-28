<script lang="ts">
</script>

<div class="uploader-wrap">
	<div class="uploader" aria-hidden></div>
</div>

<style lang="scss">
	// Green base palette chosen for harmony:
	// - #2ecc71 (emerald) strong center
	// - rgba(46,204,113,0.6/0.4/0.2/0.05) for softer rings

	.uploader-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.uploader {
		width: 6px;
		height: 6px;
		position: relative;
		border-radius: 50%;
		background: rgba(110, 231, 183, 1);
		animation: wave 1s ease-in infinite;
	}

	@keyframes wave {
		0% {
			box-shadow:
				0 0 0 0px rgba(110, 231, 183, 0.6),
				0 0 0 3px rgba(110, 231, 183, 0.5),
				0 0 0 6px rgba(110, 231, 183, 0.4),
				0 0 0 9px rgba(110, 231, 183, 0.2),
				0 0 0 12px rgba(110, 231, 183, 0.05);
		}
		100% {
			box-shadow:
				0 0 0 12px rgba(110, 231, 183, 0.05),
				0 0 0 9px rgba(110, 231, 183, 0.2),
				0 0 0 6px rgba(110, 231, 183, 0.4),
				0 0 0 3px rgba(110, 231, 183, 0.5),
				0 0 0 0px rgba(110, 231, 183, 0.6);
		}
	}
</style>
