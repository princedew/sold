import bcrypt from "bcrypt";
import { AppError } from "@packages/middlewares/errorMiddleware.js";
import type { Request, Response } from "express";
import { createUser } from "@packages/query/createUser.js";
import { userExist } from "@packages/query/userExist.js";

export async function signUp(req: Request, res: Response) {
  const { email, name, password } = req.body;
  console.log(email, name, password);
  if (!email || !name || !password) {
    return res
      .status(409)
      .json({ success: false, error: "missing required data" });
  }
  const isExist: boolean = await userExist(email);
  if (isExist) {
    throw new AppError("user already exist", 409);
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await createUser(email, name, hashedPassword);
  if (!newUser) {
    return res
      .status(400)
      .json({ success: false, error: "faild to create user" });
  }
  return res.status(200).json({ success: true, message: "signup successful" });
}
