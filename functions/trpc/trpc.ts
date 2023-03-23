/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextWithCloudflareEnvFnOptions } from 'cloudflare-pages-plugin-trpc';

export interface Env {
  MAILGUN_API_ENDPOINT: string,
  MAILGUN_API_KEY: string;
  WEBMASTER_EMAIL: string;
}
export const createContext = ({
  req,
  env,
}: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  return {
    req,
    env,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

// // ┌─┐┬ ┬┌┬┐┬ ┬
// // ├─┤│ │ │ ├─┤
// // ┴ ┴└─┘ ┴ ┴ ┴
// // Authentication middelware
// const isAuthed = t.middleware(({ next, ctx }) => {
//   if (!ctx.session?.user.email) {
//     throw new TRPCError({
//       code: 'UNAUTHORIZED',
//     });
//   }
//   return next({
//     ctx: {
//       session: ctx.session,
//     },
//   });
// });

// // ┌─┐┬─┐┌─┐┌┬┐┌─┐─┐ ┬┌┬┐┌─┐┌┬┐
// // ├─┘├┬┘│ │ │ ├┤ ┌┴┬┘ │ ├┤  ││
// // ┴  ┴└─└─┘ ┴ └─┘┴ └─ ┴ └─┘─┴┘
// export const privetProcedure = t.procedure.use(isAuthed);

// ┬ ┬┌┐┌┌─┐┬─┐┌─┐┌┬┐┌─┐┌┬┐┌┬┐┌─┐┌┬┐
// │ ││││├─┘├┬┘│ │ │ ├┤  ││ │ ├┤  ││
// └─┘┘└┘┴  ┴└─└─┘ ┴ └─┘─┴┘ ┴ └─┘─┴┘
export const publicProcedure = t.procedure;

export const router = t.router;
export const middleware = t.middleware;
