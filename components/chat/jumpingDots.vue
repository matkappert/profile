<script setup lang="ts">

//  ╔═╗╦═╗╔═╗╔═╗╔═╗
//  ╠═╝╠╦╝║ ║╠═╝╚═╗
//  ╩  ╩╚═╚═╝╩  ╚═╝
interface Props {
   dotClass?: string
}
withDefaults(defineProps<Props>(), {
  dotClass: 'bg-neutral-500 dark:bg-neutral-300',
});

</script>
<!--
  ╦ ╦╔╦╗╔╦╗╦
  ╠═╣ ║ ║║║║
  ╩ ╩ ╩ ╩ ╩╩═╝
  -->
<template>
  <div class="flex w-5 space-x-0.5 py-2 animate-jumping-dots">
    <div
      class="h-1.5 w-1.5 rounded-full dot"
      :class="dotClass"></div>
    <div
      class="h-1.5 w-1.5 rounded-full dot"
      :class="dotClass"></div>
    <div
      class="h-1.5 w-1.5 rounded-full dot"
      :class="dotClass"></div>
  </div>
</template>

<!--
  ╔═╗╔╦╗╦ ╦╦  ╔═╗
  ╚═╗ ║ ╚╦╝║  ║╣
  ╚═╝ ╩  ╩ ╩═╝╚═╝
 -->
<style>
@keyframes jumpingAnimation {
  0% {
    transform: translate3d(0, 0, 0);
  }
  20% {
    transform: translate3d(0, -3px, 0);
  }
  40% {
    transform: translate3d(0, 3px, 0);
  }
  50% {
    transform: translate3d(0, 0, 0);
  }
}
.animate-jumping-dots .dot:nth-child(1) {
  animation: jumpingAnimation 1s 0.1s ease-in infinite;
}
.animate-jumping-dots .dot:nth-child(2) {
  animation: jumpingAnimation 1s 0.2s ease-in infinite;
}
.animate-jumping-dots .dot:nth-child(3) {
  animation: jumpingAnimation 1s 0.3s ease-in infinite;
}
</style>
