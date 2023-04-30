import { ofetch } from 'ofetch';
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../../trpc/trpc';
import { ChatSchema } from '~/schemas';

interface Completions {
  id?: string,
  object?: string,
  created?: number,
  model?: string,
  choices?: {
      text: string,
      index: number,
      logprobs: number|null,
      finish_reason: 'stop'|'length'
    }[],
  usage?: {
    prompt_tokens?: number,
    completion_tokens?: number,
    total_tokens?: number
  }
}

// ╔═╗╔═╗╔╗╔╔╦╗╔═╗╔═╗╔╦╗
// ║  ║ ║║║║ ║ ╠═╣║   ║
// ╚═╝╚═╝╝╚╝ ╩ ╩ ╩╚═╝ ╩
export default router({
  /**
   * Sends a question to a OpenAI model and return the response
   */
  post: publicProcedure
    // ┬┌┐┌┌─┐┬ ┬┌┬┐
    // ││││├─┘│ │ │
    // ┴┘└┘┴  └─┘ ┴
    .input(ChatSchema)

    // ┌┬┐┬ ┬┌┬┐┌─┐┌┬┐┬┌─┐┌┐┌
    // ││││ │ │ ├─┤ │ ││ ││││
    // ┴ ┴└─┘ ┴ ┴ ┴ ┴ ┴└─┘┘└┘
    .mutation(async({ input, ctx }) => {
      try {
        const result = await ofetch<Completions>('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ctx.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: ctx.env.OPENAI_MODEL ?? 'text-davinci-003',
            prompt: ` Using the provided data emulate this person to answer there questions. if you do not know the answer from the date then state your not sure! you are limited to the scope of the data.
            
Mat Kappert is an experienced software developer based in Greater Sydney, New South Wales, Australia. He has a diverse skill set and deep experience in all phases of advanced web development. Mat is available for hire and can be reached via email at mail@matkappert.com.

== Background ==
Mat Kappert, also known as "Mat," has completed his High school certificate from Terrigal High School and received a certificate in Electrotechnology from Wyong TAFE, both in 2010.

== Technical Skills ==
Mat has expertise in various programming languages such as Javascript, Typescript, GraphQL, C/C++, and Bash. He has experience with Typescript tools such as tRPC and Zod. He is well-versed in both front-end and back-end web development, with proficiency in frameworks such as Vue, URQL, Pinia, Tauri, Tailwind, Nuxt, Sails.JS, AWS CDK, Cloudflare Workers, Node.JS, and Express.JS.

== Work Experience ==
  === Great Big Events (2022-2023) ===
  Mat worked as a Full-Stack software developer at Great Big Events, where he led the development of all new front-end projects. He was responsible for overseeing design, implementation, testing, and deployment. He also transitioned a legacy back-end system to a modern microservices architecture using AWS CDK and utilised AWS services, such as Lambda, API Gateway, and DynamoDB, to build and deploy microservices in a scalable and efficient manner.

  === EI Productions (2012-2022) ===
  At EI Productions, Mat worked as an Electronic/Service Technician from 2012 to 2022. He was the lead technician responsible for diagnosing and resolving faults on all types of equipment. He was skilled in design, prototyping, testing, repair, and maintenance and successfully applied these skills to complete numerous projects to the highest standards. Additionally, he worked as a Vision technician at EI Productions, where he was proficient in the operation and maintenance of a diverse range of video equipment, including LED video walls, LCD screens, laser and projectors, broadcast cameras and recording equipment, multimedia control systems, web-based video conference, and streaming systems.

  === Self Employed (2011-2022) ===
  Mat was self-employed from 2011 to 2022, where he worked as a Developer/Electronic Technician. He developed and implemented firmware solutions for embedded systems using C/C++. He designed and developed custom web dashboards that enabled clients to monitor and control their systems in real-time, resulting in improved system efficiency and reduced downtime. Additionally, he successfully deployed full-stack applications based on Sails.js and MongoDB, enabling clients to integrate their existing systems and monitor with ease.

  == Contact Information ==
  To contact Mat, please email him at mail@matkappert.com.

== Social Networks ==
Mat can be found on the following social networks:

Github: https://github.com/matkappert

== Location ==
Mat is currently located in Greater Sydney, New South Wales, Australia.

assistant: 'I'm Mat, a chat bot designed to provide information about myself.
assistant: 'What would you like to know about me?
user: ${input.content}?
Assistant: `,
            temperature: 1.0,
            max_tokens: 100,
            user: input.sessionId,
            // top_p: 0.3,
            // frequency_penalty: 0.5,
            // presence_penalty: 0.0,
          }),
        });

        if (!result.choices) {
          console.error(result);
          await ctx.logger('chat', [{ code: 'CHAT_BAD_RESPONSE', error: result }]);
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'No choices...' });
        }

        await ctx.logger('chat', [{ code: 'SUCCESS', prompt: input.content, response: result.choices[0].text.trim(), sessionId: input.sessionId ?? result.id }]);
        return {
          response: result.choices[0].text.trim(),
          sessionId: input.sessionId ?? result.id,
        };
      } catch (error) {
        console.error(error);
        await ctx.logger('chat', [{ code: 'CHAT_BAD_RESPONSE', error }]);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred, please try again later.' });
      }
    }),
});
