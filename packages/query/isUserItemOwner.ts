import { prisma } from "../lib/prisma";

export const isUserItemOwner = async (
  userId: number,
  auctionId: number,
): Promise<boolean> => {
  const isAuctioner = await prisma.item.findFirst({
    where: { id: auctionId, auctioneerId: userId },
  });
  return isAuctioner !== null;
};
