import bcrypt from "bcrypt";
import { AppError } from "@packages/middlewares/errorMiddleware.js";
import type { Request, Response } from "express";
import { createUser } from "@packages/query/createUser.js";
import { userExist } from "@packages/query/userExist.js";

export async function signUp(req: Request, res: Response) {
  const { email, name, password } = req.body;

  const isExist: boolean = await userExist(email);
  if (isExist) {
    throw new AppError("user already exist", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await createUser(email, name, hashedPassword);
  if (!newUser) {
    throw new AppError("Failed to create user", 409);
  }
  return res.status(200).json({ success: true, message: "signup successful" });
}
