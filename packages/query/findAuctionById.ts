import { AuctionStatus, Condition } from "../db/generated/prisma/enums";
import { prisma } from "../lib/prisma";

export const findAuctionById = async (auctionId: number) => {
  return await prisma.auction.findUnique({
    where: { id: auctionId },
  });
};
