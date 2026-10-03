import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { getUser } from "@packages/query/findUser";
import { AppError } from "@packages/middlewares/errorMiddleware";

export async function loginWithPassword(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await getUser(email);
  if (!user) {
    throw new AppError("User not exist", 409);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email & password", 401);
  }

  if (!process.env.JWT_SECRET) {
    throw new AppError("JWT is not configured", 409);
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ success: true, payload: { email: email } });
}
