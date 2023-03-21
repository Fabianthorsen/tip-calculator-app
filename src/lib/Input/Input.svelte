<script lang="ts">
  export let title;
  export let value;
  export let id;
  export let step;
  export let type = "number";
  export let icon;
  export let placeholder;
  export let min;

  function typeAction(node) {
    node.type = type;
  }

  $: isInvalid = value == 0;
</script>

<section class="my-5 grid grid-cols-1">
  <label class="flex justify-between text-sm mb-2" for={id}>
    {title}

    {#if isInvalid}
      <span class="text-red-400">Can't be zero</span>
    {/if}
  </label>
  <div class="relative">
    {#if icon}
      <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        <img src={icon} alt="icon" />
      </span>
    {/if}
    <input
      class={`${
        value && !isInvalid && "focus:border-cyan-500 focus:outline-none"
      } border-2 cursor-pointer text-xl bg-grayish-cyan-100 rounded-md text-cyan-600 text-right py-2 pl-10 pr-3 w-full ${
        isInvalid && "border-red-400 outline-none"
      }`}
      use:typeAction
      {placeholder}
      {id}
      {min}
      {step}
      bind:value
    />
  </div>
</section>
