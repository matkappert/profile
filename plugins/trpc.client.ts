import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '~~/functions/api/[[trpc]]';

export default defineNuxtPlugin(() => {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api',
      }),
    ],

  });

  return {
    provide: {
      trpc: client,
    },
  };
});
