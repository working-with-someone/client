<script lang="ts">
	let { closeModal } = $props();
	let isBgMouseDown = false;

	function handleMouseDown(e) {
		// mousedown이 배경 영역 자체에서 일어났는지 확인
		isBgMouseDown = e.target === e.currentTarget;
	}

	function handleClick(e) {
		// mousedown과 click 모두 배경 영역에서 일어났을 때만 닫기
		if (isBgMouseDown && e.target === e.currentTarget) {
			closeModal();
		}

		// 초기화
		isBgMouseDown = false;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<div class="modal-bg" on:mousedown={handleMouseDown} on:click={handleClick}>
	<div class="modal">
		<div class="header">
			<slot name="modal-header"></slot>
		</div>
		<div class="body">
			<slot name="modal-body"></slot>
		</div>
		<div class="footer">
			<slot name="modal-footer"></slot>
		</div>
	</div>
</div>

<style lang="scss">
	.modal-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 10;

		.modal {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 15px;
		}
	}
</style>
