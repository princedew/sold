import crypto from "crypto";
import type { Request, Response } from "express";
import { userExist } from "../../../../packages/query/userExist";
import { sendMagicLink } from "../../../../packages/utils/sendMagicLink";
import { magicLinkTokenStore } from "../../../../packages/utils/magicLinkTokenStore";

export async function login(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) {
    return res
      .status(409)
      .json({ success: false, error: "missing required data" });
  }
  const isExist: boolean = await userExist(email);
  if (!isExist) {
    return res.status(409).json({ success: false, error: "user not exist" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  magicLinkTokenStore.push({ email: email, token: token });
  sendMagicLink(email, token);

  return res
    .status(200)
    .json({ success: true, payload: { email: email, token: token } });
}
