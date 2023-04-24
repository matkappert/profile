import { z } from 'zod';

export const ContactSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(128),
  message: z.string().min(3).max(512),
});
