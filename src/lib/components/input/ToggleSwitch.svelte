<script lang="ts">
	interface Props {
		toggled: boolean;
	}

	let { toggled = $bindable() }: Props = $props();
</script>

<label class="switch">
	<input
		type="checkbox"
		checked={toggled}
		onchange={() => {
			toggled = !toggled;
		}}
	/>
	<span class="slider round"></span>
</label>

<style lang="scss">
	/* The switch component */
	.switch {
		position: relative;
		display: inline-block;
		width: 30px;
		height: 17px;

		input {
			opacity: 0;
			width: 0;
			height: 0;
		}

		.slider {
			position: absolute;
			cursor: pointer;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #ccc;
			transition: 0.4s;

			&:before {
				position: absolute;
				content: '';
				height: 13px;
				width: 13px;
				left: 2px;
				bottom: 2px;
				background-color: white;
				transition: 0.4s;
			}
		}

		input:checked + .slider {
			background-color: #2196f3;

			&:before {
				transform: translateX(13px);
			}
		}

		input:focus + .slider {
			box-shadow: 0 0 1px #2196f3;
		}

		.slider.round {
			border-radius: 17px;

			&:before {
				border-radius: 50%;
			}
		}
	}
</style>
