<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

// ╔═╗╦  ╔═╗╔═╗╔═╗╔═╗╔═╗
// ║  ║  ╠═╣╚═╗╚═╗║╣ ╚═╗
// ╚═╝╩═╝╩ ╩╚═╝╚═╝╚═╝╚═╝
const chatCVA = cva('', {
  variants: {
    intent: {
      assistant: 'bg-neutral-200 dark:bg-neutral-800 dark:text-white text-black',
      user: 'bg-violet-500 dark:bg-indigo-600 text-white',
      error: 'bg-rose-500 dark:bg-red-600 text-white',
    },
  },
  compoundVariants: [
    { class: 'py-1 px-2 rounded-lg w-3/4 max-w-fit shadow-md whitespace-pre-line break-words overflow-x-hidden truncate ' },
    { intent: 'user', class: 'ml-auto' },
  ],
  defaultVariants: {
    intent: 'assistant',
  },
});
type ChatProps = VariantProps<typeof chatCVA>;

//  ╔═╗╦═╗╔═╗╔═╗╔═╗
//  ╠═╝╠╦╝║ ║╠═╝╚═╗
//  ╩  ╩╚═╚═╝╩  ╚═╝
interface Props {
   value?: string;
   intent?: ChatProps['intent']
}
defineProps<Props>();

</script>
<!--
  ╦ ╦╔╦╗╔╦╗╦
  ╠═╣ ║ ║║║║
  ╩ ╩ ╩ ╩ ╩╩═╝
  -->
<template>
  <div :class="chatCVA({intent})">
    <slot>
      {{ value }}
    </slot>
  </div>
</template>
