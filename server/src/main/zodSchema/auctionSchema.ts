import { z } from "zod";
import { AuctionStatus, Condition } from "../../generated/prisma/enums";

const conditionSchema = z
  .string()
  .min(1)
  .max(5)
  .transform((value: string) => {
    switch (value) {
      case "1":
        return Condition.ONE;
      case "2":
        return Condition.TWO;
      case "3":
        return Condition.THREE;
      case "4":
        return Condition.FOUR;
      case "5":
        return Condition.FIVE;

      default:
        break;
    }
  });

export const createAuctionSchema = z.object({
  params: z.object({}),
  query: z.object({}),
  body: z.object({
    itemId: z.number().int().positive(),
    description: z.string().trim().min(1).max(1200),
    condition: conditionSchema,
    startingTime: z.coerce.date(),
    closingTime: z.coerce.date(),
    startingBid: z.number().nonnegative(),
    minimumBidIncrement: z.number().positive(),
  }),
});

export const modifyAuctionSchema = z.object({
  params: z.object({
    auctionId: z.coerce.number().int().positive(),
  }),
  query: z.object({}),
  body: z
    .object({
      description: z.string().max(1200).optional(),
      condition: z.number().int().min(1).max(5).optional(),
      startingTime: z.coerce.date().optional(),
      closingTime: z.coerce.date().optional(),
      minimumBidIncrement: z.number().positive().optional(),
    })
    .refine(
      (data) =>
        !data.startingTime ||
        !data.closingTime ||
        data.closingTime > data.startingTime,
      {
        path: ["closingTime"],
        message: "Closing time should be greater than starting time.",
      },
    ),
});

export const AuctionIdSchema = z.object({
  params: z.object({ auctionId: z.coerce.number().int().positive() }),
  query: z.object({}),
  body: z.object({}).optional(),
});

const auctionStatusSchema = z.string().refine(
  (value) => {(Object.values(AuctionStatus) as string[]).includes(value)},
  {
    message: "Invalid auction status",
  },
);

// export const getAuctionQuerySchema = z.object({
//   params: z.object({}),
//   body: z.object({}),
//   query: z.object({
//     search: z.string().default(""),
//     status:auctionStatusSchema,
//    sortBy: z.string(),
//     order: z.enum(["asc", "desc"]),
//     limit: z.,
//     offset: ,
//     condition: ,
//     minBid: ,
//   }),
// });
