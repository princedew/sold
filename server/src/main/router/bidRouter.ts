import {Router} from "express";
import { validate } from "../middlewares/reqValidationMiddleware";
import { bidLiveAuctionSchema } from "../zodSchema/bidSchema";
import { bidLiveAuction } from "../handlers/bidHandlers/bidLiveAuction";
import { authMiddleware } from "../middlewares/authMiddleware";

import { getBidHistory } from "../handlers/bidHandlers/getBidHistory";
import { bidIdSchema } from "../zodSchema/commonSchema";

const appRouter = Router();

appRouter.post("/bid/:auctionId", authMiddleware, validate(bidLiveAuctionSchema), bidLiveAuction);
appRouter.get("/bid/:auctionId", authMiddleware, validate(bidIdSchema), getBidHistory);

export default appRouter;