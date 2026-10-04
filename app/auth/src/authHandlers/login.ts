import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { createAccessToken, createRefreshToken } from "../helpers/helper";
import {
  REFRESH_TOKEN_EXPIRES_IN_MS,
  REFRESH_TKN_COOKIE_CONFIG,
} from "../config/config";
import { createSession } from "@packages/query/session";
import { getUser } from "@packages/query/findUser";
import { AppError } from "@packages/middlewares/errorMiddleware";

type LoginRequest = {
  email: string;
  password: number;
};
type LoginResponse = {
  success: true;
  data: {
    accessToken: string;
  };
};

export async function login(
  req: Request<LoginRequest>,
  res: Response<LoginResponse>,
): Promise<Response<LoginResponse>> {
  const { email, password } = req.body;

  const user = await getUser(email);
  if (!user) {
    throw new AppError("User not exist", 409);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email & password", 401);
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AppError("JWT is not configured", 409);
  }

  const accessToken = createAccessToken(user.id, secret);
  if (!accessToken) {
    throw new AppError("Failed to create access token", 400);
  }

  const refreshToken = createRefreshToken();
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await createSession(
    user.id,
    hashedRefreshToken,
    Date.now() + REFRESH_TOKEN_EXPIRES_IN_MS,
  );

  res.cookie("refreshToken", refreshToken, REFRESH_TKN_COOKIE_CONFIG);

  return res.status(200).json({ success: true, data: { accessToken } });
}
