import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { checkToken } from "../../utils/checkToken";
import { getUser } from "../../query/findUser";

export async function magicLink(req: Request, res: Response) {
  try {
    const { email, token } = req.body;
    if (!token) {
      return res
        .status(409)
        .json({ success: false, error: "missing required data" });
    }
    const isExist = checkToken(token);
    if (!isExist) {
      return res.status(404).json({ success: false, token: "token expire" });
    }
    const user = await getUser(email);

    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }
    if (!process.env.JWT_SECRET) {
      return res
        .status(404)
        .json({ success: false, error: "secret not found" });
    }
    const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    if (!jwtToken) {
      return res
        .status(400)
        .json({ success: false, error: "jwt token not found" });
    }
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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
