import { prisma } from "../lib/prisma";

export const isUserAuctioneer = async (
  userId: number,
  auctionId: number,
): Promise<boolean> => {
  const isAuctioner = await prisma.auction.findFirst({
    where: { id: auctionId, auctioneerId: userId },
  });
  return isAuctioner !== null;
};
