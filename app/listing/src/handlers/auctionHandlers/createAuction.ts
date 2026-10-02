import type { Request, Response } from "express";
import { createAuctionRecord } from "../../../../../packages/query/createAuctionRecord";

export async function createAuction(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ success: true, error: "userId not found" });
  }
  const {
    itemId,
    description,
    condition,
    startingTime,
    closingTime,
    startingBid,
    minimumBidIncrement,
  } = req.body;

  if (startingTime >= closingTime) {
    return res.status(400).json({
      success: false,
      error: "invalid startingtime, closingtime data",
    });
  }

  const auction = await createAuctionRecord(
    Number(userId),
    itemId,
    description,
    condition,
    startingTime,
    closingTime,
    startingBid,
    minimumBidIncrement,
  );
  if (!auction) {
    return res
      .status(500)
      .json({ success: false, error: "failed to create auction" });
  }
  return res.status(200).json({ success: true, auction: auction });
}
