import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { checkToken } from "../../../../packages/utils/checkToken";
import { getUser } from "../../../../packages/query/findUser";
import { AppError } from "@packages/middlewares/errorMiddleware";

export async function magicLink(req: Request, res: Response) {
  const { email, token } = req.body;
  if (!token) {
    return res
      .status(409)
      .json({ success: false, error: "missing required data" });
  }
  const isExist = checkToken(token);
  if (!isExist) {
    throw new AppError("Token expire", 409);
  }
  const user = await getUser(email);

  if (!user) {
    throw new AppError("User not found", 409);
  }

  if (!process.env.JWT_SECRET) {
    throw new AppError("JWT is not configured", 409);
  }

  const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  if (!jwtToken) {
    throw new AppError("Failed to sign token", 409);
  }
  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "dev" ? false : true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ success: true, payload: { email: email } });
}
