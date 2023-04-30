<script setup lang="ts">

const chat = useChat();
const introduction = chat.introduction();

//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
onMounted(() => {
  if (!chat.convocation.value.length) {
    introduction.start();
  }
});

</script>
<!--
  ╦ ╦╔╦╗╔╦╗╦
  ╠═╣ ║ ║║║║
  ╩ ╩ ╩ ╩ ╩╩═╝
  -->
<template>
  <div class="w-full text-black dark:text-white">
    <!-- social links -->
    <div class="fixed top-0 w-full">
      <div class="hidden lg:flex max-w-6xl content-end mx-auto px-4">
        <Social class="ml-auto" />
      </div>
    </div>
    <div class="flex lg:h-screen justify-center items-center">
      <div class="flex flex-col w-full min-h-screen lg:min-h-min lg:max-w-3xl 2xl:max-w-6xl lg:h-5/6 2xl:h-3/4 bg-neutral-50 dark:bg-neutral-900 lg:rounded-xl lg:m-4 lg:overflow-hidden relative shadow-xl">
        <!-- Chat Container -->
        <div class="h-full flex flex-col space-y-1 overflow-y-scroll  px-4 py-20 lg:py-24 snap-y scrollbar scrollbar-thin dark:scrollbar-thumb-neutral-800 scrollbar-thumb-neutral-300 scrollbar-track-transparent scrollbar-thumb-rounded-lg">
          <div
            v-auto-animate
            class="pb-1 last:snap-end scroll-m-20 space-y-4">
            <ChatMessage
              v-for="(message, index) in chat.convocation.value"
              :key="index"
              :value="message.content"
              :intent="message.role" />

            <ChatMessage v-if="chat.isSyncing.value">
              <ChatJumpingDots class="mx-2" />
            </ChatMessage>
          </div>
        </div>

        <!-- Header -->
        <div class="fixed lg:absolute top-0 inset-x-0 bg-neutral-200/70 dark:bg-neutral-800/70 backdrop-blur-2xl h-16 lg:h-20 shadow-md p-1 overflow-hidden">
          <div class="flex items-center h-full py-1 px-2">
            <img
              src="/ca00804e326f4163acd8d592524352c7.png"
              alt="Avatar of Mat Kappert"
              class="object-scale-down h-full aspect-square bg-neutral-300 dark:bg-neutral-700 rounded-full p-1" />

            <div class=" flex flex-col justify-center ml-2">
              <h2 class="font-bold">
                Mat Kappert
              </h2>
              <p class="text-neutral-500  -mt-1 lg:mt-0">
                Full-Stack Software Developer
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="fixed lg:absolute bottom-0 inset-x-0 bg-neutral-200/70 dark:bg-neutral-800/70 backdrop-blur-2xl py-2 shadow-md px-2 lg:px-4 overflow-hidden ">
          <div class="flex items-center space-x-2 h-full">
            <textarea
              :ref="chat.textarea"
              v-model="chat.inputValue.value"
              class="resize-none block w-full min-h-12 lg:min-h-8 bg-neutral-50 dark:bg-neutral-900 rounded-xl focus:ring-violet-500 focus:dark:ring-indigo-600 focus:ring-1 border-none"
              @keydown.ctrl.enter="chat.postMessage"
              @keydown.meta.enter="chat.postMessage"></textarea>

            <button
              class="bg-violet-500 dark:bg-indigo-600 text-white rounded-xl h-12 lg:h-7 w-20 lg:w-16 overflow-hidden "
              @click="chat.postMessage">
              <ChatJumpingDots
                v-if="chat.isIntroducing.value"
                class="mx-auto"
                dot-class="bg-white" />
              <span v-else>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
