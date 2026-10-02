import { Router } from "express";
import { createAuction } from "../handlers/auctionHandlers/createAuction.js";
import { validate } from "../../../../packages/middlewares/reqValidationMiddleware.js";
import { modifyAuction } from "../handlers/auctionHandlers/modifyAuction.js";
import {
  createAuctionSchema,
  AuctionIdSchema,
  modifyAuctionSchema,
} from "../../../../packages/zodSchema/auctionSchema.js";
import { deleteAuction } from "../handlers/auctionHandlers/deleteAuction.js";
import { getAuctionById } from "../handlers/auctionHandlers/getAuctionById.js";
import { getAuctionByQuery } from "../handlers/auctionHandlers/getAuctionByQuery.js";
import { authMiddleware } from "../../../../packages/middlewares/authMiddleware.js";

const appRouter = Router();

appRouter.get("/auctions", getAuctionByQuery);
appRouter.get("/auctions/:auctionId", validate(AuctionIdSchema), getAuctionById);
appRouter.post(
  "/auctions",
  validate(createAuctionSchema),
  authMiddleware,
  createAuction,
);
appRouter.patch(
  "/auctions/:auctionId",
  validate(modifyAuctionSchema),
  authMiddleware,
  modifyAuction,
);
appRouter.delete(
  "/auctions/:auctionId",
  validate(AuctionIdSchema),
  authMiddleware,
  deleteAuction,
);

export default appRouter;
