import { prisma } from "../lib/prisma";

export const getAuctionsStartingClosingTimeAndStatus = async (
  auctionId: Number,
) => {
    return await prisma.auction.findUnique({
    where: { id: Number(auctionId) },
    select: {
      startingTime: true,
      closingTime: true,
      status:true,
    },
  });
};
