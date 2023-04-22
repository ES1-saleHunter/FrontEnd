<template>
  <div
    v-if="load"
    class="w-10/12 h-full flex justify-center absolute z-50 items-center"
  >
    <div class="flex flex-col items-center fixed pb-80">
      <icon-loading-four
        theme="outline"
        size="60"
        fill="#2F9A66"
        :strokeWidth="3"
        class="animate-spin text-3xl"
      />
      <div>Carregando...</div>
    </div>
  </div>
</template>

<script>
export default { props: ["load"] };
</script>
