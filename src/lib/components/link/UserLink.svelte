<script lang="ts">
	import moveTo from '$lib/utils/navigation';

	interface Props {
		userId: number;
		username: string;
		size?: number;
	}

	const { userId, username, size = 16 }: Props = $props();

	function handleClick(e: MouseEvent) {
		e.stopPropagation();
		moveTo.user(userId);
	}
</script>

<a onclick={handleClick} style={`font-size: ${size}px;`}>{username}</a>

<style lang="scss">
	a {
		font-weight: bold;
		display: block;
		&:hover {
			cursor: Pointer;
			color: var(--light-blue);
		}
	}
</style>
