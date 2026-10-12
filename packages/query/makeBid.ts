import { prisma } from "../lib/prisma";
import { queueConfig } from "../queue/config";
import { JOB_NAME } from "../queue/jobNames";
import { bidQueue, databaseQueue } from "../queue/queue";

export const returnReason = [
  "bid is lesser than minimum required bid",
  "auction not found",
] as const;

export const makeBid = async (
  userId: number,
  auctionId: number,
  bid: number,
) => {
  const result = await prisma.$transaction(async (tx) => {
    const auction = await tx.$queryRaw<
      {
        id: number;
        status: string;
        startingBid: number;
        minimumBidIncrement: number;
      }[]
    >`SELECT "id", "status", "startingBid", "minimumBidIncrement" FROM "Auction" WHERE id = ${auctionId} FOR UPDATE`;
    if (!auction[0]) {
      return returnReason[1];
    }
    const highestBid = await tx.bid.findFirst({
      where: { auctionId: auctionId },
      select: { bid: true },
      orderBy: { bid: "desc" },
      take: 1,
    });
    const minimumBid = highestBid
      ? highestBid.bid + auction[0].minimumBidIncrement
      : auction[0].startingBid;
    if (bid < minimumBid) {
      return returnReason[0];
    }

    const bidCreation = await tx.bid.create({
      data: { userId: userId, auctionId: auctionId, bid: bid },
    });

    bidQueue.add(
      JOB_NAME.UPDATE_BID_IN_UI,
      { userId: userId, auctionId: auctionId, bid: bid },
      queueConfig,
    );

    databaseQueue.add(
      JOB_NAME.RGISTER_BID,
      { userId: userId, auctionId: auctionId, bid: bid },
      queueConfig,
    );

    return bidCreation;
  });
  return result;
};
