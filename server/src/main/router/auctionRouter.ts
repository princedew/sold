import { Router } from "express";
import { createAuction } from "../handlers/auctionHandlers/createAuction";
import { validate } from "../middlewares/reqValidationMiddleware";
import { modifyAuction } from "../handlers/auctionHandlers/modifyAuction";
import {
  createAuctionSchema,
  AuctionIdSchema,
  modifyAuctionSchema,
} from "../zodSchema/auctionSchema";
import { deleteAuction } from "../handlers/auctionHandlers/deleteAuction";
import { getAuctionById } from "../handlers/auctionHandlers/getAuctionById";
import { getAuctionByQuery } from "../handlers/auctionHandlers/getAuctionByQuery";
import { authMiddleware } from "../middlewares/authMiddleware";

const appRouter = Router();

appRouter.get("/auctions", getAuctionByQuery);
appRouter.get("/auctions/:auctionId",validate(AuctionIdSchema), getAuctionById);
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
