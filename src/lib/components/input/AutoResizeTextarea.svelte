<script lang="ts">
	interface Props {
		content: string;
		placeholder: string;
		maxRows?: number;
		onEnter: () => void;
	}

	let { content = $bindable(), placeholder, maxRows, onEnter }: Props = $props();

	let textareaElement: HTMLTextAreaElement;

	function handleInput() {
		if (textareaElement && content !== undefined) {
			textareaElement.style.height = 'auto';
			textareaElement.style.height = textareaElement.scrollHeight + 'px';
		}
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			onEnter();
			content = '';
		}
	}
</script>

<div class="textarea-wrapper">
	<textarea
		bind:this={textareaElement}
		bind:value={content}
		{placeholder}
		rows="1"
		style={maxRows
			? `max-height: ${maxRows * 1.5 + 1}em; overflow-y: ${textareaElement?.scrollHeight > textareaElement?.clientHeight ? 'auto' : 'hidden'}`
			: ''}
		onkeydown={onKeyDown}
		oninput={handleInput}
	></textarea>
</div>

<style>
	.textarea-wrapper {
		width: 100%;
	}

	textarea {
		width: 100%;
		padding: 0px 0px 10px 0px;
		box-sizing: border-box;
		border: none;
		border-bottom: 2px solid #ccc;
		border-radius: 0;
		line-height: 1.5;
		outline: none;
		resize: none;
		font-family: inherit;
		background-color: transparent;

		height: auto;
		overflow-y: hidden;
		transition: border-color 0.2s ease;
	}
</style>
