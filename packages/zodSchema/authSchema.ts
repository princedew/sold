import { z } from "zod";

export const signupSchema = {
  body: z.object({
    email: z.email(),
    name: z.string().trim().min(2).max(100),
    password: z.string().trim().min(2).max(20),
  }),
};

export const loginSchema = {
  body: z.object({
    email: z.email(),
  }),
};

export const loginPwasswordSchema = {
  body: z.object({
    email: z.email(),
    password: z.string().trim().min(2).max(20),
  }),
};

export const magicLinkSchema = {
  body: z.object({
    email: z.email(),
    token: z.string(),
  }),
};
