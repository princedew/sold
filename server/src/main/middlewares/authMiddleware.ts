import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

interface JwtPayloadWithUserId extends jwt.JwtPayload {
  userId: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("cookies :", req.cookies);
  
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ success: false, error: "unauthorized" });
  }
  if (!process.env.JWT_SECRET) {
    return res.status(404).json({ success: false, error: "secret not found" });
  }
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET,
  ) as JwtPayloadWithUserId;
  console.log("decoded :", decoded);
  req.userId = decoded.userId as number;
  next();
};
