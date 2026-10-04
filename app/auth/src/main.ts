import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./authRouter.js";
import { logger } from "@packages/middlewares/loggerMiddleware.js";
import { errorHandler } from "@packages/middlewares/errorMiddleware.js";
import { prisma } from "@packages/lib/prisma.js";

const app = express();

const port = process.env.AUTH_PORT ?? 8001;

app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use("/health", (req, res) => res.json({ success: true }));

app.use("/api/auth", authRouter);

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Auth Service running on port ${port}`);
});

process.on("SIGTERM", () => {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});
