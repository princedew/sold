import z from "zod";

export const itemIdSchema = z.object({
  params: z.object({
    itemId: z.coerce.number().int().positive(),
  }),
});

export const auctionIdSchema = z.object({
  params: z.object({
    auctionId: z.coerce.number().int().positive(),
  }),
});

export const bidIdSchema = z.object({
  params: z.object({
    auctionId: z.coerce.number().int().positive(),
  }),
  query: z.object({
    limit: z.coerce.number().int().positive().optional(),
  }),
});
