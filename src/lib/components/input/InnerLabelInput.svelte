<script lang="ts">
  interface Props {
    label: any;
    children?: import('svelte').Snippet;
  }

  let { label, children }: Props = $props();
</script>

<div class="inner-label-input middle-rounded">
  <span>{label}</span>
  {@render children?.()}
</div>

<style lang="scss">
  .inner-label-input{
    padding : 4px 6px;
    display : flex;
    flex-direction: column;
    gap : 5px;
    border : 1px solid var(--font-light-gray);

    &:hover{
      border : 1px solid var(--font-white);
    }
    span{
      font-size : 12px;
      padding : 0 4px;
      color : gray;
    }
  }
</style>