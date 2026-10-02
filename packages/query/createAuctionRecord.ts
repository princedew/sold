import { Condition } from "../db/generated/prisma/client";

import { prisma } from "../lib/prisma";

export const createAuctionRecord = async (
  userId: number,
  itemId: number,
  description: string,
  condition: Condition,
  startingTime: Date,
  closingTime: Date,
  startingBid: number,
  minimumBidIncrement: number,
) => {
  return await prisma.auction.create({
    data: {
      itemId: itemId,
      auctioneerId: userId,
      description: description,
      condition: condition,
      startingTime: startingTime,
      closingTime: closingTime,
      startingBid: startingBid,
      minimumBidIncrement: minimumBidIncrement,
    },
  });
};
