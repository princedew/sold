import type { Request, Response } from "express";
import { AppError } from "../../../../../packages/middlewares/errorMiddleware";
import { findAuctionById } from "../../../../../packages/query/findAuctionById";

export async function getAuctionById(req: Request, res: Response) {
  const { auctionId } = req.params;
  if (!auctionId) {
    throw new AppError("AuctionId not found", 401);
  }

  const auction = await findAuctionById(Number(auctionId));
  if (!auction) {
    throw new AppError("Auction not found", 404);
  }
  return res.status(200).json({ success: true, auction: auction });
}
