import { z } from "zod";

export const bidLiveAuctionSchema = z.object({
  params: z.object({
    auctionId: z.coerce.number().int().positive(),
  }),
  body: z.object({
    bid: z.number().positive().min(1),
  }),
});
