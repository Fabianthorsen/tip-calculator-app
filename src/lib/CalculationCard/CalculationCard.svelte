<script lang="ts">
  import Calculation from "./Calculation.svelte";
  export let onReset;
  export let billPerPerson;
  export let tipPerPerson;
  export let buttonDisabled;
</script>

<aside
  class="inline-grid grid-auto-rows p-5 bg-cyan-600 rounded-2xl my-3 md:w-[1fr]"
>
  <Calculation
    output={tipPerPerson}
    title="Tip Amount"
    subTitle="/per person"
  />
  <Calculation
    output={billPerPerson}
    title="Total Bill"
    subTitle="/per person"
  />
  {#if buttonDisabled}
    <button
      disabled
      type="button"
      class="btn btn-green disabled:opacity-75"
      on:click={onReset}
    >
      RESET
    </button>
  {:else}
    <button type="button" class="btn btn-green" on:click={onReset}>
      RESET
    </button>
  {/if}
</aside>

<style lang="postcss">
  .btn {
    @apply font-bold py-2 px-4 text-xl rounded md:self-end;
  }
  .btn-green {
    @apply bg-cyan-500 text-cyan-600;
  }
  .btn-green:active {
    @apply bg-grayish-cyan-200;
  }
  .btn-green:disabled {
    @apply bg-grayish-cyan-300;
  }
</style>
