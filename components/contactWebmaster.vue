<script setup lang="ts">
import type { RouterInput } from '~~/functions/api/[[trpc]]';

//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
const { $trpc } = useNuxtApp();
const error = ref<string|null>(null);
const response = ref<string|null>(null);
const cloudSync = ref(false);

const formData = ref<RouterInput['contact']['webmaster']>({
  name: 'mat',
  email: 'mat@example.com',
  message: 'Hello World!',
});

//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
const handelSubmit = async() => {
  console.log('handel sent email');
  cloudSync.value = true;
  error.value = null;
  response.value = null;
  try {
    console.log('sending', formData.value);
    const result = await $trpc.contact.webmaster.mutate(formData.value);
    response.value = result.message ?? null;
    console.log('result', result);
  } catch (e) {
    console.error(e);
    error.value = JSON.stringify(e);
  }
  cloudSync.value = false;
};
</script>
<!--
  ╦ ╦╔╦╗╔╦╗╦
  ╠═╣ ║ ║║║║
  ╩ ╩ ╩ ╩ ╩╩═╝
  -->
<template>
  <div class="mt-4">
    <UiButton
      :disabled="cloudSync"
      @click="handelSubmit">
      contact
    </UiButton>
    <div
      v-if="response"
      class="bg-green-500/50 w-full">
      Response: {{ response }}
    </div>
    <div
      v-if="error"
      class="bg-red-500 w-full">
      <p>Error:  {{ error }}</p>
    </div>
  </div>
</template>
