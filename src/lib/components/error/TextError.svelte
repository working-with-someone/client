<script lang="ts">
	interface Props {
		error?: App.Error;
	}

	const { error }: Props = $props();
</script>

{#if error}
	<span> {error.message} </span>
{/if}

<style lang="scss">
	span {
		color: var(--mid-red);
	}
</style>
