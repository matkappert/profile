<script setup lang="ts">
import { ContactSchema } from '~/schemas';
import type { RouterInput } from '~/functions/api/[[trpc]]';
type ContactInput = RouterInput['contact']['webmaster']

//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
const { $trpc } = useNuxtApp();
const syncing = ref(false);
const cloudErrors = ref<string|null>(null);
const sender = ref<string|null>(null);

//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
const sendForm = async(data: ContactInput) => {
  syncing.value = true;
  cloudErrors.value = null;
  try {
    await $trpc.contact.webmaster.mutate(data);
    sender.value = data.name;
  } catch (err) {
    console.error(err);
    cloudErrors.value = JSON.stringify(err);
  }
  syncing.value = false;
};

</script>
<!--
  ╦ ╦╔╦╗╔╦╗╦
  ╠═╣ ║ ║║║║
  ╩ ╩ ╩ ╩ ╩╩═╝
  -->
<template>
  <div class="dark:text-white text:black ">
    <div class="rounded-lg p-4 bg-gray-50 dark:bg-gray-900 shadow-xl">
      <UiForm
        v-if="!sender"
        id="contact"
        class=" flex flex-col space-y-2"
        :schema="ContactSchema"
        :syncing="syncing"
        @submit="$event => sendForm($event as ContactInput)">
        <h2 class="text-lg font-semibold">
          Get in touch
        </h2>
        <UiFormInputHeader
          id="name"
          title="full name">
          <UiFormInputText :disabled="syncing" />
        </UiFormInputHeader>

        <UiFormInputHeader
          id="email"
          title="email">
          <UiFormInputText :disabled="syncing" />
        </UiFormInputHeader>

        <UiFormInputHeader
          id="message"
          title="message">
          <UiFormInputText
            class="h-24"
            as="textarea"
            :disabled="syncing" />
        </UiFormInputHeader>

        <div
          v-if="cloudErrors"
          class="bg-red-500/50 rounded-md p-2 text-sm overflow-scroll">
          Error: <pre>{{ cloudErrors }}</pre>
        </div>
      </UiForm>
      <p
        v-else
        class="text-center">
        Thanks {{ sender }}, message has be sent.
      </p>
    </div>
  </div>
</template>
