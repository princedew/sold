import { prisma } from "../lib/prisma";

export const modifyAuctionRecord = async (
  auctionId: number,
  fieldsToUpdate: Record<string, unknown>,
) => {
  return await prisma.auction.update({
    where: {
      id: auctionId,
    },
    data: fieldsToUpdate,
  });
};
