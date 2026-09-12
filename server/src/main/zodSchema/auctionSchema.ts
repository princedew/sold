import {z} from "zod";

export const createAuctionSchema = z.object({
  itemId: z.number().int().positive(),
  description: z.string().trim().min(1).max(1200),
  condition: z.number().int().min(1).max(5),
  startingTime: z.coerce.date(),
  closingTime: z.coerce.date(),
  startingBid: z.number().nonnegative(),
  minimumBidIncrement: z.number().positive(),
});

export const modifyAuctionSchema = z.object({
  description: z.string().max(1200).optional(),
  condition: z.number().int().min(1).max(5).optional(),
  startingTime: z.coerce.date().optional(),
  closingTime: z.coerce.date().optional(),
  minimumBidIncrement: z.number().positive().optional(),
}).refine((data) => 
  !data.startingTime ||
  !data.closingTime ||
  data.closingTime > data.startingTime, {
  path:["closingTime"],
  message:"Closing time should be greater than starting time."
})




















