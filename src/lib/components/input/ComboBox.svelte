<script lang="ts">
	// 타입 정의
	type ComboboxProps = {
		options?: string[];
		value?: string;
		placeholder?: string;
		className?: string;
		id?: string;
		name?: string;
		changeInput: (value) => void;
	};

	// $props를 사용한 props 선언 (TypeScript 타입 추가)
	let {
		options = [],
		value = '',
		placeholder = 'input or select',
		className = '',
		id = '',
		name = '',
		changeInput
	}: ComboboxProps = $props();

	// 내부 상태
	let isDropdownVisible = $state(false);
	let inputElement: HTMLDivElement | null = $state(null);

	// 필터링된 옵션 계산
	let filteredOptions = $derived(
		options.filter((option) => option.toLowerCase().includes((value || '').toLowerCase()))
	);

	// 이벤트 디스패치를 위한 설정
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{
		input: { value: string };
		change: { value: string };
	}>();

	// 입력값 변경 처리
	function handleInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		value = target.value;
		isDropdownVisible = true;

		changeInput(value);
	}

	// 옵션 선택 처리
	function selectOption(selectedOption: string): void {
		value = selectedOption;
		isDropdownVisible = false;
		(inputElement?.querySelector('input') as HTMLInputElement)?.blur();

		changeInput(value);
	}

	function handleClickOutside(event: MouseEvent): void {
		if (inputElement && !inputElement.contains(event.target as Node)) {
			isDropdownVisible = false;
		}
	}

	// 라이프사이클 훅
	$effect(() => {
		// 컴포넌트 마운트 시 이벤트 리스너 추가
		document.addEventListener('click', handleClickOutside);

		// 클린업 함수 반환 (컴포넌트 언마운트 시 실행)
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
		on:focus={() => (isDropdownVisible = true)}
	/>
	<span class="material-symbols-outlined"> search </span>
	{#if isDropdownVisible && filteredOptions.length > 0}
		<div class="dropdown middle-rounded">
			{#each filteredOptions as option}
				<div
					class="dropdown-item"
					class:active={value === option}
					on:click={() => selectOption(option)}
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
