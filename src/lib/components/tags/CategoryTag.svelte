<script lang="ts">
	interface Props {
		category_label: string;
	}

	const { category_label }: Props = $props();
</script>

<div class="category-tag little-rounded">
	<span>{category_label}</span>
	<slot name="extension"></slot>
</div>

<style lang="scss">
	.category-tag {
		display: flex;
		flex-direction: row;
		padding: 5px 10px;
		background-color: var(--bg-sideBar);
		align-items: baseline;
		color: var(--bg);
		gap: 10px;
	}
</style>
