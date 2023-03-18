<script lang="ts">
  import "./app.css";
  import { writable } from "svelte/store";

  let bill: number | null;
  let people: number | null;
  let tip: number | null;

  let customTipInput: boolean = false;
  let customTipInputElement: HTMLInputElement;

  let bill_per_person = writable<number>(0);
  let tip_per_person = writable<number>(0);

  $: if (bill && people && tip) {
    let tip_amount = bill * (tip / 100);
    let total_bill = bill + tip_amount;
    $bill_per_person = Number((total_bill / people).toFixed(2));
    $tip_per_person = Number((tip_amount / people).toFixed(2));
  }

  $: if (customTipInput) {
    setTimeout(() => customTipInputElement.focus(), 0);
  }

  function toggleCustomTipInput() {
    customTipInput = !customTipInput;
    tip = null;
  }

  function resetValues(event: MouseEvent) {
    event.preventDefault();

    bill = null;
    tip = null;
    people = null;
    customTipInput = false;
    $bill_per_person = 0;
    $tip_per_person = 0;
  }
</script>

<main class="grid place-items-center h-screen">
  <section class="my-10 text-xl text-cyan-600">
    <h1 class="grid grid-cols-1">
      <span class="tracking-widest">SPLI</span>
      <span class="tracking-widest">TTER</span>
    </h1>
  </section>
  <section class="bg-white rounded-t-3xl p-6 w-full h-screen">
    <form class="grid grid-cols-1">
      <label class="input-header" for="bill">Bill</label>
      <input
        class="input"
        type="number"
        step="0.01"
        id="bill"
        bind:value={bill}
      />
      <h3 class="input-header">Select Tip %</h3>
      <ul class="grid grid-cols-2 grid-rows-3 gap-3">
        <li>
          <input
            class="radio-button"
            type="radio"
            id="t5"
            value="5"
            name="percentage"
            bind:group={tip}
            on:click={() => (customTipInput = false)}
          />
          <label for="t5">5%</label>
        </li>
        <li>
          <input
            class="radio-button"
            type="radio"
            id="t10"
            value="10"
            name="percentage"
            bind:group={tip}
            on:click={() => (customTipInput = false)}
          />
          <label for="t10">10%</label>
        </li>
        <li>
          <input
            class="radio-button"
            type="radio"
            id="t15"
            value="15"
            name="percentage"
            bind:group={tip}
            on:click={() => (customTipInput = false)}
          />
          <label for="t15">15%</label>
        </li>
        <li>
          <input
            class="radio-button"
            type="radio"
            id="t25"
            value="25"
            name="percentage"
            bind:group={tip}
            on:click={() => (customTipInput = false)}
          />
          <label for="t25">25%</label>
        </li>
        <li>
          <input
            class="radio-button"
            type="radio"
            id="t50"
            value="50"
            name="percentage"
            bind:group={tip}
            on:click={() => (customTipInput = false)}
          />
          <label for="t50">50%</label>
        </li>
        <li>
          {#if customTipInput}
            <input
              class="input input-custom-tip"
              type="number"
              step="1"
              bind:value={tip}
              bind:this={customTipInputElement}
              on:focusout={!tip && toggleCustomTipInput}
            />
          {:else}
            <button
              type="button"
              class="custom-tip-button"
              on:click={toggleCustomTipInput}
            >
              Custom
            </button>
          {/if}
        </li>
      </ul>
      <label class="input-header" for="people">Number of People</label>
      <input class="input" type="number" id="people" bind:value={people} />
      <div class="grid p-5 bg-cyan-600 rounded-2xl">
        <div class="grid grid-flow-col py-4 items-center place-content-between">
          <div class="text-white">
            <p class="text-sm">Tip Amount</p>
            <p class="text-xs text-grayish-cyan-300">/ person</p>
          </div>
          <h2 class="text-cyan-500 text-3xl">${$tip_per_person}</h2>
        </div>
        <div class="grid grid-flow-col pb-4 items-center place-content-between">
          <div class="text-white">
            <p class="text-sm">Total</p>
            <p class="text-xs text-grayish-cyan-300">/ person</p>
          </div>
          <h2 class="text-cyan-500 text-3xl">${$bill_per_person}</h2>
        </div>
        <button type="button" class="btn btn-green" on:click={resetValues}
          >RESET</button
        >
      </div>
    </form>
  </section>
</main>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.grayish-cyan.200);
    font-family: "Space Mono", Helvetica, Arial, Sans-Serif;
    color: theme(colors.grayish-cyan.400);
  }
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-green {
    @apply bg-cyan-500 text-cyan-600;
  }
  .btn-green:active {
    @apply bg-grayish-cyan-200;
  }

  .input {
    @apply bg-grayish-cyan-100 rounded-md text-cyan-600 text-right py-2 px-3;
  }

  .input-header {
    @apply text-xs;
  }

  .radio-button {
    display: none;
  }

  .radio-button + label {
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding: 8px 10px;
    font-weight: 600;
    border-radius: 4px;
    background-color: theme(colors.cyan.600);
    color: theme(colors.grayish-cyan.200);
  }

  .radio-button:checked + label {
    background-color: theme(colors.cyan.500);
    color: theme(colors.cyan.600);
  }
  .custom-tip-button {
    @apply flex justify-center cursor-pointer font-bold rounded py-2 px-3 w-full;
    @apply bg-grayish-cyan-100 text-grayish-cyan-400;
  }

  .input-custom-tip {
    @apply bg-grayish-cyan-100 rounded-md text-grayish-cyan-400 text-right py-2 px-3 w-full;
  }
</style>
