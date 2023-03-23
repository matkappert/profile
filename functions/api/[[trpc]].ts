/**
 * Handles every request call with the `api/*` pattern and makes a decision based on the `appRouter`
 * provided to tRPC.
 */
import tRPCPlugin from 'cloudflare-pages-plugin-trpc';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { router, createContext } from '../trpc/trpc';

// ┬─┐┌─┐┬ ┬┌┬┐┌─┐┬─┐
// ├┬┘│ ││ │ │ ├┤ ├┬┘
// ┴└─└─┘└─┘ ┴ └─┘┴└─
const appRouter = router({
});

export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export const onRequest: PagesFunction = tRPCPlugin({
  router: appRouter,
  endpoint: '/api',
  createContext,
});
