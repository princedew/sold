import type { Request, Response } from "express";
import { findAuctionByQuery } from "../../../query/findAuctionByQuery";
import { AppError } from "../../middlewares/errorMiddleware";

// get GET /auctions?search=&status=&sortBy=&order=&limit=20&offset=0&condition=&minBid=
// const { search, status, sortBy, order, limit, offset, condition, minBid } = req.query;

export async function getAuctionByQuery(req: Request, res: Response) {
  console.log("reaching ..");
  
  const auction = await findAuctionByQuery(req.query);
  if (!auction) {
    throw new AppError("Auction not found", 404);
  }
  return res.status(200).json({ success: true, auction: auction });
}
