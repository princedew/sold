import { prisma } from "../lib/prisma";

export const getBidHistoryById = async (auctionId: number, limit: number) => {
  return await prisma.bid.findMany({
    where: {  auctionId: auctionId, },
    orderBy:{bidAt:"desc"},
    take: limit ? limit : 20,
  });
};
