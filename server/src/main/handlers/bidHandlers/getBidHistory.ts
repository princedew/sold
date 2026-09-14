import type { Request, Response } from "express";
import { AppError } from "../../middlewares/errorMiddleware";
import { getBidHistoryById } from "../../../query/getBidHistoryFromHistory";

export async function getBidHistory(req: Request, res: Response) {
  const { auctionId } = req.params;
  const bids = await getBidHistoryById(Number(auctionId), Number(req.query.limit));
  if (!bids) {
    throw new AppError("Failed to fetch bid", 409);
  }
  return res.status(200).json({ success: true, bids });
}
