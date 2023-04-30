<script setup lang="ts">
import { ChatSchema } from '~~/schemas';

type Message = {role:'assistant'|'user'|'error', content: string};
const messages = ref<Message[]>([]);

const { $trpc } = useNuxtApp();
const isSyncing = ref(false);
const inputValue = ref('');
const { textarea, triggerResize } = useTextareaAutosize({ input: inputValue });

let sessionId: string|undefined;
// TODO: store sessionID and convocations.

const askQuestion = async() => {
  const value = ChatSchema.pick({ content: true }).safeParse({ content: inputValue.value });

  if (!value.success || isRunningDemo.value) {
    return;
  }
  const data = {
    // context: messages.value.slice(-5).map(messages => `${messages.role}: ${messages.content}`).join('\n'),
    content: value.data.content,
    sessionId,
  };

  inputValue.value = '';
  nextTick(triggerResize);
  messages.value.push({ role: 'user', content: data.content });

  isSyncing.value = true;

  try {
    const response = await $trpc.chat.post.mutate(data);
    messages.value.push({ role: 'assistant', content: response.response });
    sessionId = response.sessionId;
  } catch (err) {
    console.error(err);
    messages.value.push({ role: 'error', content: JSON.stringify(err) });
  }
  isSyncing.value = false;
};

const introduction: Message[] = [
  { role: 'assistant', content: 'Hi there! 👋' },
  { role: 'assistant', content: 'I\'m Mat, a chat bot designed to provide information about myself.' },
  { role: 'assistant', content: 'What would you like to know about me?' },
  { role: 'user', content: 'Can you tell me more about your work experience?' },
  { role: 'assistant', content: 'Sure! Here are some highlights of my work experience:' },
  { role: 'assistant', content: '- Full-stack software developer at Great Big Events from 2022 to 2023.' },
  { role: 'assistant', content: '- Electronic/service technician at EI Productions from 2012 to 2022.' },
  { role: 'assistant', content: '- Vision technician at EI Productions from 2012 to 2022.' },
  { role: 'assistant', content: '- Developer/electronic technician for my own business from 2011 to 2022.' },
  { role: 'user', content: 'What technical skills do you possess?' },
  { role: 'assistant', content: 'I have a diverse skill set and experience in several areas of web development. Here are some of my technical skills:' },
  { role: 'assistant', content: '- JavaScript, TypeScript, GraphQL, C/C++, and Bash.' },
  { role: 'assistant', content: '- Backend technologies such as Nuxt, Sails.JS, AWS CDK, Cloudflare Workers, and Express.JS.' },
  { role: 'assistant', content: '- Frontend technologies like Vue, URQL, Pinia, Tauri, and Tailwind.' },
  { role: 'user', content: 'Where are you located?' },
  { role: 'assistant', content: 'I\'m currently located in the Greater Sydney region of New South Wales, Australia.' },
  { role: 'user', content: 'Are you available for hire?' },
  { role: 'assistant', content: 'Yes, I am currently available for hire.' },
  { role: 'assistant', content: 'If you\'re interested in working with me, you can contact me through my email\nmail@matkappert.com' },
  { role: 'user', content: 'Thank you.' },
  { role: 'assistant', content: 'You\'re welcome! Do you have any more questions?' },
];

const isRunningDemo = ref(true);
const convocationStarter = async() => {
  isSyncing.value = false;

  if (!introduction.length || !isRunningDemo.value) {
    isRunningDemo.value = false;
    return;
  }
  const message = introduction.shift();
  if (!message) { return; }

  if (message?.role === 'user') {
    // wait: read last message.
    await useSleep(messages.value.slice(-1)[0].content.length * 10);
    const words = message.content.split(/\s+/);
    for (const word of words) {
      inputValue.value += word + ' ';
      // wait: typing speed.
      await useSleep(word.length * 40);
    }
    inputValue.value = '';
    nextTick(triggerResize);
    messages.value.push(message);
    convocationStarter();
  } else {
    isSyncing.value = true;
    // wait: fixed time for response.
    await useSleep(1_500);
    isSyncing.value = false;
    message && messages.value.push(message);
    convocationStarter();
  }
};

onMounted(() => {
  convocationStarter();
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isRunningDemo.value) {
      isRunningDemo.value = false;
      messages.value.push(...introduction);
    }
  });
});

</script>
<!--
  ╦ ╦╔╦╗╔╦╗╦
  ╠═╣ ║ ║║║║
  ╩ ╩ ╩ ╩ ╩╩═╝
  -->
<template>
  <div class="w-full text-black dark:text-white">
    <div class="flex lg:h-screen justify-center items-center">
      <div class="flex flex-col w-full min-h-screen lg:min-h-min lg:max-w-3xl 2xl:max-w-6xl lg:h-5/6 2xl:h-3/4 bg-neutral-50 dark:bg-neutral-900 lg:rounded-xl lg:m-4 lg:overflow-hidden relative shadow-xl">
        <!-- Chat Container -->
        <div class="h-full flex flex-col space-y-1 overflow-y-scroll  px-4 py-20 lg:py-24 snap-y scrollbar scrollbar-thin dark:scrollbar-thumb-neutral-800 scrollbar-thumb-neutral-300 scrollbar-track-transparent scrollbar-thumb-rounded-lg">
          <div
            v-auto-animate
            class="pb-1 last:snap-end scroll-m-20 space-y-4">
            <ChatMessage
              v-for="(message, index) in messages"
              :key="index"
              :value="message.content"
              :intent="message.role" />

            <ChatMessage v-if="isSyncing">
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
              ref="textarea"
              v-model="inputValue"
              :disabled="isRunningDemo"
              class="resize-none block w-full min-h-12 lg:min-h-8 bg-neutral-50 dark:bg-neutral-900 rounded-xl focus:ring-violet-500 focus:dark:ring-indigo-600 focus:ring-1 border-none"
              @keydown.ctrl.enter="askQuestion"
              @keydown.meta.enter="askQuestion"></textarea>

            <button
              class="bg-violet-500 dark:bg-indigo-600 text-white rounded-xl h-12 lg:h-7 w-20 lg:w-16 overflow-hidden "
              @click="askQuestion">
              <ChatJumpingDots
                v-if="isRunningDemo"
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
