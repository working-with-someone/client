<script lang="ts">
</script>

<div class="activation-menus">
	<button class="menu-item open-session">
		<span class="material-symbols-outlined"> radio_button_checked </span>
	</button>

	<button class="menu-item upload-session">
		<span class="material-symbols-outlined"> video_call </span>
	</button>
</div>

<style lang="scss">
	.activation-menus {
		.menu-item.open-session{
			&:hover {
				span {
					color: var(--font-red);
				}
			}
		}

    .menu-item.upload-session{
      &:hover {
        span {
          color: var(--sig);
        }
      }
    }
	}
</style>
