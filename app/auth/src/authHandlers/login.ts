import crypto from "crypto";
import type { Request, Response } from "express";
import { userExist } from "../../../../packages/query/userExist";
import { sendMagicLink } from "../../../../packages/utils/sendMagicLink";
import { magicLinkTokenStore } from "../../../../packages/utils/magicLinkTokenStore";
import { AppError } from "@packages/middlewares/errorMiddleware";

export async function login(req: Request, res: Response) {
  const { email } = req.body;
  const isExist: boolean = await userExist(email);
  if (!isExist) {
    throw new AppError("user not exist", 400);
  }

  const token = crypto.randomBytes(32).toString("hex");
  magicLinkTokenStore.push({ email: email, token: token });
  sendMagicLink(email, token);

  return res
    .status(200)
    .json({ success: true, payload: { email: email, token: token } });
}
