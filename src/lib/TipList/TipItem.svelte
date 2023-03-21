<script lang="ts">
  export let group;
  export let percentage;
  export let onClick;
</script>

<input
  class="radio-button"
  type="radio"
  id="t{percentage}"
  value={percentage}
  bind:group
  on:click={onClick}
/>
<label for="t{percentage}">{percentage}%</label>

<style lang="postcss">
  .radio-button {
    @apply hidden;
  }

  .radio-button + label {
    @apply flex justify-center cursor-pointer py-2 font-semibold text-xl rounded border-2 border-cyan-600 bg-cyan-600 text-grayish-cyan-200;
  }

  .radio-button:checked + label {
    @apply bg-cyan-500 text-cyan-600 border-cyan-500;
  }
</style>
