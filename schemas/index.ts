import { z } from 'zod';

export const ContactSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(128),
  message: z.string().min(3).max(512),
});

export const ChatSchema = z.object({
  sessionId: z.string().max(50).optional(),
  content: z.string().min(3).max(50),
  context: z.string().max(255).optional(),
});
