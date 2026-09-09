import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import appRouter from "./main/router/authRouter.js";
import { errorHandler } from "./main/middlewares/errorMiddleware.js";
import { authMiddleware } from "./main/middlewares/authMiddleware.js";

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
app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("app running...");
});

app.use("/api/v1", appRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
