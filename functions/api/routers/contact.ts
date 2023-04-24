import { ofetch } from 'ofetch';
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../../trpc/trpc';
import { replaceText } from '~/utils';
import { ContactSchema } from '~/schemas';

const template = `
<!DOCTYPE html>
<html>
  <head>
    <title>Message Information</title>
  </head>
  <body>
    <h2>Message Information</h2>
    <ul>
      <li><strong>Host:</strong> {{ host }} </li>
      <li><strong>From:</strong> {{name}} &lt;{{email}}&gt; </li>
      <li><strong>IP Address:</strong> {{ ipAddress }}  &lt;{{asOrganization}}&gt; </li>
      <li><strong>Region:</strong> {{ region }} &lt;{{ timezone }}&gt; </li>
      <li><strong>User-Agent:</strong> {{ userAgent }} </li>
      </ul>
    <hr>
    <h2>Message Content</h2>
    <pre>
  {{ message }}
    </pre>
  </body>
</html>
`;

interface ReturnType {
   id?: string,
   message?: string,
}

// ╔═╗╔═╗╔╗╔╔╦╗╔═╗╔═╗╔╦╗
// ║  ║ ║║║║ ║ ╠═╣║   ║
// ╚═╝╚═╝╝╚╝ ╩ ╩ ╩╚═╝ ╩
export default router({
  /**
   * Sends an email to the webmaster with the data submitted through the contactUs form
   * and additional client meta information.
   */
  webmaster: publicProcedure
    // ┬┌┐┌┌─┐┬ ┬┌┬┐
    // ││││├─┘│ │ │
    // ┴┘└┘┴  └─┘ ┴
    .input(ContactSchema)

    // ┌┬┐┬ ┬┌┬┐┌─┐┌┬┐┬┌─┐┌┐┌
    // ││││ │ │ ├─┤ │ ││ ││││
    // ┴ ┴└─┘ ┴ ┴ ┴ ┴ ┴└─┘┘└┘
    .mutation<ReturnType>(async({ input, ctx }) => {
      // @ts-expect-error: ignore cf not existing
      const cloudflare = ctx.req.cf as object ?? {};
      console.log('got your message');

      console.log(ctx.env);

      const html = replaceText(template, {
        name: input.name,
        email: input.email,
        message: input.message,
        host: ctx.req.headers.get('host'),
        ipAddress: ctx.req.headers.get('cf-connecting-ip') ?? ctx.req.headers.get('x-real-ip') ?? ctx.req.headers.get('x-forwarded-for'),
        userAgent: ctx.req.headers.get('user-agent'),
        ...{
          ...(cloudflare && {
            timezone: 'timezone' in cloudflare ? cloudflare?.timezone : null,
            region: 'region' in cloudflare ? cloudflare?.region : null,
            asOrganization: 'asOrganization' in cloudflare ? cloudflare.asOrganization : null,
          }),
        },
      });

      const data = new URLSearchParams({
        to: ctx.env.WEBMASTER_EMAIL,
        subject: 'Contact Us',
        from: input.email,
        text: `Name: ${input.name}\nEmail: ${input.email}\nMessage: ${input.message}`,
        html,
      });

      try {
        const result = await ofetch<ReturnType>(ctx.env.MAILGUN_API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${btoa(`api:${ctx.env.MAILGUN_API_KEY}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data.toString(),
        });

        return result;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
        });
      }
    }),
});
