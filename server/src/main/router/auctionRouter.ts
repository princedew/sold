import { Router } from "express";
import { createAuction } from "../handlers/auctionHandlers/createAuction";
import { validate } from "../middlewares/reqValidationMiddleware";
import { modifyAuction } from "../handlers/auctionHandlers/modifyAuction";
import {
  createAuctionSchema,
  modifyAuctionSchema,
} from "../zodSchema/auctionSchema";
import { deleteAuction } from "../handlers/auctionHandlers/deleteAuction";
import { getAuctionById } from "../handlers/auctionHandlers/getAuctionById";
import { getAuctionByQuery } from "../handlers/auctionHandlers/getAuctionByQuery";
import { authMiddleware } from "../middlewares/authMiddleware";

const appRouter = Router();

appRouter.get("/auctions", getAuctionByQuery);
appRouter.get("/auctions/:auctionId", getAuctionById);
appRouter.post(
  "/auctions",
  authMiddleware,
  validate(createAuctionSchema),
  createAuction,
);
appRouter.patch(
  "/auctions/:auctionId",
  authMiddleware,
  validate(modifyAuctionSchema),
  modifyAuction,
);
appRouter.delete("/auctions/:auctionId", authMiddleware, deleteAuction);

export default appRouter;
