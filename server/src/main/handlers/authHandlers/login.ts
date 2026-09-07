import crypto from "crypto";
import type { Request, Response } from "express";
import { userExist } from "../../../query/userExist";
import { emailChecker } from "../../../utils/emailChecker";
import { sendMagicLink } from "../../../utils/sendMagicLink";
import { magicLinkTokenStore } from "../../../utils/magicLinkTokenStore";

export async function login(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(409)
        .json({ success: false, error: "missing required data" });
    }
    if (!emailChecker(email)) {
      return res.status(409).json({ success: false, error: "invalid email" });
    }
    const isExist: boolean = await userExist(email);
    if (!isExist) {
      return res.status(409).json({ success: false, error: "user not exist" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    magicLinkTokenStore.push({ email: email, token: token });
    sendMagicLink(email, token);

    return res.status(200).json({ success: true, payload: { email: email } });
  } catch (error) {
    if (error instanceof Error) {
      console.log("ERROR : ", error.message);
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
