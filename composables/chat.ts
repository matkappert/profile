import { ref } from 'vue';
import { z } from 'zod';
import { ChatSchema } from '~~/schemas';

export interface ChatMessage {
  role:'assistant'|'user'|'error';
  content: string;
}

/**
* Chat composable
*/
export const useChat = () => {
  const { $trpc } = useNuxtApp();
  const isSyncing = ref(false);
  const isIntroducing = ref(false);
  const inputValue = ref('');
  const { textarea, triggerResize } = useTextareaAutosize({ input: inputValue });

  /* session storage */
  const uid = useSessionStorage<string|undefined>('uid', undefined);
  const convocation = useSessionStorage<ChatMessage[]>('convocation', []);

  /**
  * POST a message to the chat.
  */
  const postMessage = async() => {
    if (isSyncing.value) { return; }
    isSyncing.value = true;

    const value = ChatSchema.pick({ content: true }).safeParse({ content: inputValue.value });

    if (!value.success) { return; }

    const data: z.infer<typeof ChatSchema> = {
      // context: convocation.value.slice(-5).map(convocation => `${convocation.role}: ${convocation.content}`).join('\n'),
      content: value.data.content,
      sessionId: uid.value,
    };

    inputValue.value = '';
    nextTick(triggerResize);
    convocation.value.push({ role: 'user', content: data.content });

    try {
      const response = await $trpc.chat.post.mutate(data);
      convocation.value.push({ role: 'assistant', content: response.response });
      uid.value = response.sessionId;
    } catch (err) {
      console.error(err);
      convocation.value.push({ role: 'error', content: JSON.stringify(err) });
    }
    // isBusy.value = false;
    isSyncing.value = false;
  };

  /**
  * Chat introduction module.
  * @returns {Object} An object containing methods to start and stop the introduction.
  */
  const introduction = () => {
    const introduction: ChatMessage[] = [
      { role: 'assistant', content: 'Hi there! 👋' },
      { role: 'assistant', content: 'I\'m Mat, a chat bot designed to provide information about myself.' },
      { role: 'assistant', content: 'What would you like to know about me?' },
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

    const nextMessage = async() => {
      isSyncing.value = false;

      const message = introduction.shift();
      if (!message) {
        isIntroducing.value = false;
        return;
      }

      if (message?.role === 'user') {
        // wait: read last message.
        await useSleep(convocation.value.slice(-1)[0].content.length * 10);
        const words = message.content.split(/\s+/);
        for (const word of words) {
          inputValue.value += word + ' ';
          nextTick(triggerResize);
          // wait: typing speed.
          await useSleep(word.length * 40);
        }
        inputValue.value = '';
        nextTick(triggerResize);
        convocation.value.push(message);
        nextMessage();
      } else {
        isSyncing.value = true;
        // wait: fixed time for response.
        await useSleep(1_500);
        isSyncing.value = false;
        message && convocation.value.push(message);
        nextMessage();
      }
    };

    const stopEvent = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        stop();
      }
    };

    const start = () => {
      isSyncing.value = false;
      isIntroducing.value = true;
      window.addEventListener('keydown', stopEvent);
      nextMessage();
    };

    const stop = () => {
      isSyncing.value = false;
      isIntroducing.value = false;
      removeEventListener('keydown', stopEvent);
    };

    return {
      start,
      stop,
    };
  };

  return {
    inputValue,
    textarea,

    isIntroducing,
    introduction,

    convocation,
    isSyncing,
    postMessage,
  };
};
