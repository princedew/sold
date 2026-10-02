import type { Request, Response } from "express";
import { AppError } from "../../../../../packages/middlewares/errorMiddleware";
import { makeBid, returnReason } from "../../../../../packages/query/makeBid";

export async function bidLiveAuction(req: Request, res: Response) {
  const userId = req.userId;
  const { auctionId } = req.params;
  if (!userId) {
    throw new AppError("UserId not found", 404);
  }
  if (!auctionId) {
    throw new AppError("AuctionId not found", 404);
  }
  const { bid } = req.body;

  const bidInAuction = await makeBid(
    Number(userId),
    Number(auctionId),
    Number(bid),
  );
  if (typeof bidInAuction === "string" && returnReason.includes(bidInAuction)) {
    throw new AppError(bidInAuction, 400);
  }
  if (!bidInAuction) {
    throw new AppError("Failed to bid", 409);
  }
  return res.status(200).json({ success: true, bid: bidInAuction });
}
