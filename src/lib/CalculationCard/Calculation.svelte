<script>
  export let output;
  export let title;
  export let subTitle;
</script>

<div class="flex py-4 md:py-0 items-center place-content-between h-fit">
  <div class="text-white">
    <p class="text-xs md:text-lg">{title}</p>
    <p class="text-xs text-grayish-cyan-300">{subTitle}</p>
  </div>
  <output class="text-cyan-500 text-3xl md:text-4xl"
    >${output.toFixed(2)}</output
  >
</div>
