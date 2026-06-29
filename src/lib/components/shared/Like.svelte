<script lang="ts">
	interface Props {
		isLiked: boolean;
		animationEnabled?: boolean;
		size?: number;
	}

	const { isLiked, animationEnabled = false, size = 24 }: Props = $props();
</script>

{#if isLiked}
	<span
		class="material-symbols-outlined liked {animationEnabled ? 'pop-animation' : ''}"
		style={`font-size : ${size}px;`}
	>
		thumb_up
	</span>
{:else}
	<span class="material-symbols-outlined like" style={`font-size : ${size}px;`}> thumb_up </span>
{/if}

<style lang="scss">
	.like {
		padding: 0;
		&:hover {
			color: var(--sig);
		}
	}

	.liked {
		font-variation-settings: 'FILL' 1;
		padding: 0;
		color: var(--sig);
	}

	@keyframes pop {
		0% {
			transform: scale(1);
		}
		30% {
			transform: scale(1.5);
		}
		60% {
			transform: scale(0.7);
		}
		100% {
			transform: scale(1);
		}
	}

	.pop-animation {
		animation: pop 0.3s ease-in-out;
	}
</style>
