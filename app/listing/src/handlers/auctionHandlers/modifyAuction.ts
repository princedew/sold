import type { Request, Response } from "express";
import { modifyAuctionRecord } from "../../../../../packages/query/modifyAuctionRecord";
import { isUserAuctioneer } from "../../../../../packages/query/isUserAuctioneer";

export async function modifyAuction(req: Request, res: Response) {
  const userId = req.userId;
  const { auctionId } = req.params;
  if (!auctionId) {
    return res.status(401).json({ success: false, error: "auctionId not found" });
  }

  const hasAuthority = await isUserAuctioneer(Number(userId), Number(auctionId));
  if (!hasAuthority) {
    return res.status(403).json({success:false, error:"forbidden"});
  }

  const allowedFields = [
    "description",
    "condition",
    "startingTime",
    "closingTime",
    "minimumBidIncrement",
  ] as const;
  type random=[string,number,number];
  const newobj:random=["hellowr",34,56];
  const newarr:random[]=[newobj,["prince",34,67]]

  let fieldsToUpdate:Record<string, unknown> = {};

  for (const field in allowedFields) {
    if (req.body[field] !== undefined) {
      fieldsToUpdate[field] = req.body[field];
    }
  }
  if (Object.keys(fieldsToUpdate).length === 0) {
    return res
      .status(400)
      .json({ success: false, error: "no field to update" });
  }

  const auction = await modifyAuctionRecord(Number(auctionId), fieldsToUpdate);
  if (!auction) {
    return res.status(404).json({ success: false, error: "auction not found" });
  }
  return res.status(200).json({ success: true, auction: auction });
}
