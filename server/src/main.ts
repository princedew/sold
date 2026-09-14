import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./main/router/authRouter.js";
import auctionRouter from "./main/router/auctionRouter.js";
import bidRouter from "./main/router/bidRouter.js";
import itemsRouter from "./main/router/itemsRouter.js";
import { errorHandler } from "./main/middlewares/errorMiddleware.js";
import { logger } from "./main/middlewares/loggerMiddleware.js";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);  
app.use(cookieParser());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("app running...");
});

// app.get("/autologin", (req, res) => {
//   autoLogin(req, res);
// });

app.use("/api/v1", authRouter);
app.use("/api/v1", auctionRouter);
app.use("/api/v1", bidRouter);
app.use("/api/v1", itemsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
