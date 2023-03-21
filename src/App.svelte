<script lang="ts">
  import "./app.css";

  import Input from "./lib/Input/Input.svelte";
  import CalculationCard from "./lib/CalculationCard/CalculationCard.svelte";
  import TipItem from "./lib/TipList/TipItem.svelte";

  import dollarIcon from "./assets/icon-dollar.svg";
  import personIcon from "./assets/icon-person.svg";

  import { writable } from "svelte/store";

  let percentages = [5, 10, 15, 25, 50];

  let bill: number | null;
  let people: number | null;
  let tip: number | null;

  let customTipInput: boolean = false;
  let customTipInputElement: HTMLInputElement;

  let billPerPerson = writable<number>(0);
  let tipPerPerson = writable<number>(0);
  let resetDisabled = writable<boolean>(true);

  $: if (bill > 0 && people > 0 && tip > 0) {
    let tip_amount = Number((bill * (tip / 100)).toFixed(2));
    let total_bill = Number((Number(bill) + Number(tip_amount)).toFixed(2));
    billPerPerson.set(Number((total_bill / people).toFixed(2)));
    tipPerPerson.set(Number((tip_amount / people).toFixed(2)));
  }

  $: if (customTipInput) {
    setTimeout(() => customTipInputElement.focus(), 0);
  }

  $: if (bill || people || tip) {
    resetDisabled.set(false);
  } else {
    resetDisabled.set(true);
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

<main>
  <div
    class="flex flex-col items-center justify-center h-full md:h-screen shadow-md"
  >
    <figure class="my-10 md:mb-14 md:my-0 text-lg text-cyan-600">
      <h1 class="text-2xl grid grid-cols-1">
        <span class="tracking-widest">SPLI</span>
        <span class="tracking-widest">TTER</span>
      </h1>
    </figure>
    <section
      class="bg-white rounded-t-3xl p-6 w-full h-full md:w-[768px] md:h-auto md:rounded-3xl"
    >
      <form class="grid grid-cols-1 md:grid-flow-col md:grid-cols-2 md:gap-8">
        <section class="px-2">
          <Input
            title="Bill"
            icon={dollarIcon}
            bind:value={bill}
            id="bill"
            placeholder="0"
            min="0"
            step="0.01"
          />
          <section class="my-7">
            <h3 class="text-sm mb-2">Select Tip %</h3>
            <ul
              class="grid grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2"
            >
              {#each percentages as percentage}
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
                    class={`input-custom-tip ${
                      customTipInputElement && "focus:border-cyan-500"
                    }`}
                    type="number"
                    step="1"
                    min="0"
                    bind:value={tip}
                    bind:this={customTipInputElement}
                    on:focusout={!tip && toggleCustomTipInput}
                  />
                {:else}
                  <button
                    type="button"
                    class="custom-tip-button border-2 border-grayish-cyan-100"
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
            step="1"
            placeholder="0"
            min="0"
            bind:value={people}
          />
        </section>
        <CalculationCard
          onReset={resetValues}
          tipPerPerson={$tipPerPerson}
          billPerPerson={$billPerPerson}
          buttonDisabled={$resetDisabled}
        />
      </form>
    </section>
  </div>
</main>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.grayish-cyan.200);
    font-family: "Space Mono", Helvetica, Arial, Sans-Serif;
    color: theme(colors.grayish-cyan.400);
  }

  .input-custom-tip {
    @apply bg-grayish-cyan-100 rounded-md text-grayish-cyan-400 text-xl text-center p-2 w-full border-2;
  }

  .custom-tip-button {
    @apply flex justify-center cursor-pointer font-bold text-xl rounded p-2 w-full;
    @apply bg-grayish-cyan-100 text-grayish-cyan-400;
  }
</style>
