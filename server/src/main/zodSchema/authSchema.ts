import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    email: z.email(),
    name: z.string().trim().min(2).max(100),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
  }),
});

export const magicLinkSchema = z.object({
  body: z.object({
    email: z.email(),
    token: z.string(),
  }),
});