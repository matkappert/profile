<script setup lang="ts">

const { x, y } = useMouse();

</script>
<template>
  <div class="w-screen h-screen absolute inset-0 overflow-hidden">
    <div
      class="absolute w-[500px] h-[500px] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 -z-10 dark:bg-indigo-500/10 bg-violet-400/10"
      :style="`left: ${x}px; top: ${y}px;`">
    </div>
  </div>
</template>
