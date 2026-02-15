<script lang="ts">
	// 타입 정의
	type ComboboxProps = {
		options?: string[];
		value?: string;
		placeholder?: string;
		className?: string;
		id?: string;
		name?: string;
		changeInput?: (value: any) => void;
		selectOption?: (option: string) => void;
	};

	import { tick } from 'svelte';
	let {
		options = [],
		value = '',
		placeholder = 'input or select',
		className = '',
		id = '',
		name = '',
		changeInput,
		selectOption
	}: ComboboxProps = $props();

	let isDropdownVisible = $state(false);
	let inputElement: HTMLDivElement | null = $state(null);

	let activeIndex = $state(-1);
	const listboxId = id ? `${id}-listbox` : 'combobox-listbox';
	let filteredOptions = $derived(
		options.filter((option) => option.toLowerCase().includes((value || '').toLowerCase()))
	);

	function handleInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		value = target.value;
		isDropdownVisible = true;

		changeInput?.(value);
	}

	async function handleKeydown(event: KeyboardEvent) {
		if (!isDropdownVisible && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
			isDropdownVisible = true;
			activeIndex = 0;
			await tick();
			return;
		}

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				activeIndex = Math.min(activeIndex + 1, filteredOptions.length - 1);
				await tick();
				scrollActiveIntoView();
				break;
			case 'ArrowUp':
				event.preventDefault();
				activeIndex = Math.max(activeIndex - 1, 0);
				await tick();
				scrollActiveIntoView();
				break;
			case 'Enter':
				if (isDropdownVisible && activeIndex >= 0 && filteredOptions[activeIndex]) {
					event.preventDefault();
					handleSelectOption(filteredOptions[activeIndex]);
				}
				break;
			case 'Escape':
				isDropdownVisible = false;
				activeIndex = -1;
				break;
		}
	}

	function scrollActiveIntoView() {
		const el = inputElement?.querySelectorAll('.dropdown-item')[activeIndex] as
			| HTMLElement
			| undefined;
		if (el) el.scrollIntoView({ block: 'nearest' });
	}

	function handleSelectOption(selectedOption: string): void {
		value = selectedOption;
		isDropdownVisible = false;
		(inputElement?.querySelector('input') as HTMLInputElement)?.blur();

		activeIndex = -1;

		changeInput?.(value);
		selectOption?.(value);
	}

	function handleClickOutside(event: MouseEvent): void {
		if (inputElement && !inputElement.contains(event.target as Node)) {
			isDropdownVisible = false;
		}
	}

	$effect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="combobox middle-rounded {className}" bind:this={inputElement}>
	<input
		{id}
		{name}
		type="text"
		class="combobox-input middle-rounded select-box"
		{placeholder}
		bind:value
		on:input={handleInput}
		on:focus={() => {
			isDropdownVisible = true;
		}}
		on:keydown={handleKeydown}
		role="combobox"
		aria-expanded={isDropdownVisible}
		aria-controls={listboxId}
		aria-autocomplete="list"
		aria-haspopup="listbox"
	/>
	<span class="material-symbols-outlined"> search </span>
	{#if isDropdownVisible && filteredOptions.length > 0}
		<div class="dropdown middle-rounded" id={listboxId} role="listbox">
			{#each filteredOptions as option, index}
				<div
					class="dropdown-item"
					class:active={activeIndex === index}
					role="option"
					tabindex="-1"
					aria-selected={activeIndex === index}
					on:mouseenter={() => (activeIndex = index)}
					on:click={() => handleSelectOption(option)}
				>
					<p>
						<span class="category-label">{option}</span><span class="suffix">with me</span>
					</p>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.combobox {
		position: relative;
		width: 70%;
		display: flex;
		flex-direction: columns;
		padding: 6px 6px;
		border: 1px solid var(--font-light-gray);

		.combobox-input {
			width: 100%;
			background-color: var(--bg);
		}

		.dropdown {
			position: absolute;
			top: calc(100% + 2px);
			left: 0;
			right: 0;
			background-color: var(--bg);
			z-index: 100;
			max-height: 200px;
			overflow-y: auto;
			border: 1px solid var(--font-light-gray);

			.dropdown-item {
				padding: 10px 10px;
				cursor: pointer;
				transition: background-color 0.2s;
				border-bottom: 1px solid var(--font-light-gray);

				&.active {
					background-color: #0096f3;
				}

				&:hover,
				&:active {
					background-color: #0096f3;
				}

				&:last-child {
					border-bottom: none;
				}

				p {
					display: flex;
					gap: 20px;
					.category-label {
						font-size: 0.8em;
					}

					.suffix {
						color: var(--font-light-gray);
						font-size: 0.8em;
					}
				}
			}
		}
	}
</style>
