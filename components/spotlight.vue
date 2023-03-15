<script setup lang="ts">

const { x, y } = useMouse();

</script>
<template>
  <div
    class="absolute w-[500] h-[500px] aspect-square rounded-full  -translate-x-1/2 -translate-y-1/2 -z-10 dark:bg-indigo-500/5 bg-violet-400/10 overflow-hidden"
    :style="`left: ${x}px; top: ${y}px;`">
  </div>
</template>
