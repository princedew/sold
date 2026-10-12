import express from "express";
import cookieParser from "cookie-parser";
import auctionRouter from "./router/auctionRouter.js";
import bidRouter from "./router/bidRouter.js";
import itemsRouter from "./router/itemsRouter.js";
import {logger} from "@packages/middlewares/loggerMiddleware.js";

const app = express();
const port = process.env.LISTING_PORT || 5002;
const url = process.env.BASE_URL || "/api/v1/list";

app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use(url, auctionRouter);
app.use(url, itemsRouter);
app.use(url, bidRouter);

app.listen(port, () => {
  console.log(`Listing Service running on port ${port}`);
});