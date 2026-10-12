import { Router } from "express";
import { validate } from "@packages/middlewares/reqValidationMiddleware.js";
import { bidLiveAuctionSchema } from "@packages/zodSchema/bidSchema.js";
import { bidLiveAuction } from "../handlers/bidHandlers/bidLiveAuction.js";
import { authMiddleware } from "@packages/middlewares/authMiddleware.js";
import { getBidHistory } from "../handlers/bidHandlers/getBidHistory.js";
import { bidIdSchema } from "@packages/zodSchema/commonSchema.js";

const appRouter = Router();

appRouter.post(
  "/bid/:auctionId",
  authMiddleware,
  validate(bidLiveAuctionSchema),
  bidLiveAuction,
);
appRouter.get(
  "/bid/:auctionId",
  authMiddleware,
  validate(bidIdSchema),
  getBidHistory,
);

export default appRouter;
