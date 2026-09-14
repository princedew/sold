import { z } from "zod";

export const createItemSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).max(200),
    description: z.string().trim().min(1).max(1200),
  }),
});

export const modifyItemSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(1).max(200).optional(),
      description: z.string().trim().min(1).max(1200).optional(),
    })
    .refine(
      (data) => data.name !== undefined || data.description !== undefined,
      {
        message: "At least one field is required",
      },
    ),
});

export const getItemsByQuerySchema = z.object({
  query: z.object({
    search: z.string().trim().optional(),
    page: z.coerce.number().int().default(1),
  }),
});

export const getItemByIdSchema = z.object({
  params: z.object({
    itemId: z.coerce.number().int().positive(),
  }),
});

