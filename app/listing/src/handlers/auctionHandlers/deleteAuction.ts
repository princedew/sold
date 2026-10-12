import type { Request, Response } from "express";
import { AppError } from "../../../../../packages/middlewares/errorMiddleware";
import { deleteAuctionRecord } from "../../../../../packages/query/deleteAuctionRecord";
import { isUserAuctioneer } from "../../../../../packages/query/isUserAuctioneer";
import { getAuctionsStartingClosingTimeAndStatus } from "../../../../../packages/query/findAuctionForDeleteRoute";
import { softDelete } from "../../../../../packages/query/softDelete";

export async function deleteAuction(req: Request, res: Response) {
  const userId = req.userId;
    if (!userId) {
    throw new AppError("UserId not found", 401);
  }
  const { auctionId } = req.params;
  if (!auctionId) {
    throw new AppError("AuctionId not found", 401);
  }

  const hasAuthority = await isUserAuctioneer(Number(userId), Number(auctionId));
  if (!hasAuthority) {
    throw new AppError("Forbidden", 403);
  }

  const auction = await getAuctionsStartingClosingTimeAndStatus(
    Number(auctionId),
  );
  if (!auction) {
    throw new AppError("Auction not found", 404);
  }

  if (auction.status === "LIVE") {
    throw new AppError("Can't delete auction while it is Live", 403);
  }

  if (auction.status === "CLOSED") {
    const deletedAuction = await softDelete(Number(auctionId));
    if (!deletedAuction) {
      throw new AppError("Failed to delete auction", 404);
    }
  }else{
    const deletedAuction = await deleteAuctionRecord(Number(auctionId));
    if (!deletedAuction) {
      throw new AppError("Failed to delete auction", 404);
    }
  }
  return res.status(200).json({ success: true, auction: auction });
}
