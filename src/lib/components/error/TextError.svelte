<script lang="ts">
	import { fade as svelteFade } from 'svelte/transition';
	interface Props {
		error?: Error;
		fontsize?: number;
		fade?: boolean;
	}

	const { error, fontsize, fade }: Props = $props();
	let visible = $state(true);

	if (fade) {
		setTimeout(() => {
			visible = false;
		}, 3000);
	}
</script>

{#if visible}
	<span
		style="font-size: {fontsize}px;"
		transition:svelteFade={fade ? { duration: 300 } : { duration: 0 }}
	>
		{error?.message}
	</span>
{/if}

<style lang="scss">
	span {
		color: var(--mid-red);
	}
</style>
