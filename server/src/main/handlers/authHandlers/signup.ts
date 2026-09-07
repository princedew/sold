import type { Request, Response } from "express";
import { emailChecker } from "../../../utils/emailChecker";
import { createUser } from "../../../query/createUser";
import { userExist } from "../../../query/userExist";

export async function signUp(req: Request, res: Response) {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res
        .status(409)
        .json({ success: false, error: "missing required data" });
    }
    if (!emailChecker(email)) {
      return res.status(409).json({ success: false, error: "invalid email" });
    }
    const isExist: boolean = await userExist(email);
    if (isExist) {
      return res
        .status(409)
        .json({ success: false, error: "user already exist" });
    }
    const newUser = await createUser(email, name);
    if (!newUser) {
      return res
        .status(400)
        .json({ success: true, error: "faild to create user" });
    }
    return res.send({success:true, message: "signup successful"});
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
