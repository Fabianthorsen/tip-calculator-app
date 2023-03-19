<script lang="ts">
  import "./app.css";

  import Input from "./lib/Input.svelte";
  import CalculationCard from "./lib/CalculationCard.svelte";
  import TipItem from "./lib/TipList/TipItem.svelte";

  import dollarIcon from "./assets/icon-dollar.svg";
  import personIcon from "./assets/icon-person.svg";

  import { writable } from "svelte/store";

  let tipPercentages = [5, 10, 15, 25, 50];

  let bill: number | null;
  let people: number | null;
  let tip: number | null;

  let customTipInput: boolean = false;
  let customTipInputElement: HTMLInputElement;

  let billPerPerson = writable<number>(0);
  let tipPerPerson = writable<number>(0);

  $: if (bill > 0 && people > 0 && tip > 0) {
    let tip_amount = Number((bill * (tip / 100)).toFixed(2));
    let total_bill = Number((Number(bill) + Number(tip_amount)).toFixed(2));
    billPerPerson.set(Number((total_bill / people).toFixed(2)));
    tipPerPerson.set(Number((tip_amount / people).toFixed(2)));
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
    $billPerPerson = 0;
    $tipPerPerson = 0;
  }
</script>

<main class="grid place-items-center h-screen">
  <figure class="my-10 text-xl text-cyan-600">
    <h1 class="text-2xl grid grid-cols-1">
      <span class="tracking-widest">SPLI</span>
      <span class="tracking-widest">TTER</span>
    </h1>
  </figure>
  <section class="bg-white rounded-t-3xl p-6 w-full h-screen">
    <form class="grid grid-cols-1">
      <section class="px-2">
        <Input
          title="Bill"
          icon={dollarIcon}
          bind:value={bill}
          id="bill"
          step="0.01"
        />
        <section class="my-7">
          <h3 class="text-sm mb-2">Select Tip %</h3>
          <ul class="grid grid-cols-2 grid-rows-3 gap-4">
            {#each tipPercentages as percentage}
              <li>
                <TipItem
                  {percentage}
                  bind:group={tip}
                  onClick={() => (customTipInput = false)}
                />
              </li>
            {/each}
            <li>
              {#if customTipInput}
                <input
                  class="input-custom-tip"
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
        </section>
        <Input
          title="Number of people"
          icon={personIcon}
          id="people"
          step="0.01"
          bind:value={people}
        />
      </section>
      <CalculationCard
        onReset={resetValues}
        tipPerPerson={$tipPerPerson}
        billPerPerson={$billPerPerson}
      />
    </form>
  </section>
</main>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.grayish-cyan.200);
    font-family: "Space Mono", Helvetica, Arial, Sans-Serif;
    color: theme(colors.grayish-cyan.400);
  }

  .input-custom-tip {
    @apply bg-grayish-cyan-100 rounded-md text-grayish-cyan-400 text-2xl text-center p-2 w-full;
  }

  .custom-tip-button {
    @apply flex justify-center cursor-pointer font-bold text-2xl rounded p-2 w-full;
    @apply bg-grayish-cyan-100 text-grayish-cyan-400;
  }
</style>
