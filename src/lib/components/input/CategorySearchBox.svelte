<script lang="ts">
	import { onMount } from 'svelte';
	import ComboBox from '../input/ComboBox.svelte';
	import wwsfetch from '$lib/utils/wwsfetch';

	let categories: string[] = $state([]);

	interface Props {
		value: string;
		placeholder?: string;
		changeInput?: (value: string) => void;
		selectOption?: (option: string) => void;
	}

	const {
		changeInput,
		value = $bindable(''),
		placeholder = 'input or select category',
		selectOption
	}: Props = $props();

	onMount(() => {
		loadCategories();
	});

	async function loadCategories() {
		try {
			const res = await wwsfetch('/categories', {
				queryParams: { page: '1', per_page: '10' }
			});
			const body = await res.json();

			if (body?.data?.length) {
				categories = body.data.map((c: any) => c.label);
			}
		} catch (e) {
			// silent fail — parent can still type a new category
		}
	}
</script>

<div class="category-search-box">
	<ComboBox {changeInput} options={categories} {placeholder} {selectOption} />
</div>

<style>
	.category-search-box {
	}
</style>
