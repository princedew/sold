import type { Request, Response, NextFunction } from "express";

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("----- Incoming Request -----");

  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  console.log("Body:", req.body);

  console.log("----------------------------");

  next();
};