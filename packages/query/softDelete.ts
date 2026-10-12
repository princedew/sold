import { prisma } from "../lib/prisma";

export const softDelete = async (auctionId: number) => {
  return await prisma.auction.update({
    where: { id: auctionId },
    data: {
      softDeletedAt: new Date(Date.now()),
    },
  });
};
