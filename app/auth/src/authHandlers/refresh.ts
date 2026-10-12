import {
  REFRESH_TKN_COOKIE_CONFIG,
  REFRESH_TOKEN_EXPIRES_IN_MS,
} from "@/config/config";
import {
  createAccessToken,
  createRefreshToken,
  decodeRefreshToken,
} from "@/helpers/helper";
import { AppError } from "@packages/middlewares/errorMiddleware";
import {
  createSession,
  findSession,
  revokeSession,
} from "@packages/query/session";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { redis } from "@packages/lib/redis";

type Session = {
  id: number;
  userId: number;
  hashedRefreshToken: string;
  expireIn: Date;
};

type RefreshResponse = {
  success: true;
  data: {
    accessToken: string;
  };
};
type MyPayload = {
  userId: number;
  type: string;
};

export async function refresh(
  req: Request,
  res: Response<RefreshResponse>,
): Promise<Response<RefreshResponse>> {
  const refToken = req.cookies.refreshToken;
  if (!refToken) {
    throw new AppError("refresh token missing.", 400);
  }

  const secret: string | null = process.env.JWT_SECRET ?? null;
  if (!secret) {
    throw new AppError("JWT not configured", 409);
  }

  const payload = decodeRefreshToken(refToken, secret) as MyPayload;
  if (!payload || payload.type !== "refresh") {
    throw new AppError(
      "Failed to decode refresh token | decoded the wrong one",
      409,
    );
  }

  let session: Session | null = null;
  const isKeyExist = await redis.exists(String(payload.userId));
  if (isKeyExist === 1) {
    const val = await redis.get(String(payload.userId));
    if (!val) throw new AppError("Failed to get value from redis", 400);
    session = JSON.parse(val);
  } else {
    session = await findSession(payload.userId);
  }
  if (!session) {
    throw new AppError("sessions not found", 404);
  }

  if (session.expireIn <= new Date()) {
    throw new AppError("session expire", 400);
  }

  const accessToken: string | null = createAccessToken(session.userId, secret);
  if (!accessToken) {
    throw new AppError("Failed to create access token", 400);
  }

  const refreshToken: string | null = createRefreshToken(
    session.userId,
    secret,
  );
  if (!refreshToken) {
    throw new AppError("Failed to create refresh token", 400);
  }

  res.cookie("refreshToken", refreshToken, REFRESH_TKN_COOKIE_CONFIG);
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  const isRevoke = await revokeSession(session.id);
  if (!isRevoke) {
    throw new AppError("Failed to revoke session", 400);
  }

  const isSessionCreated = await createSession(
    session.userId,
    hashedRefreshToken,
    Date.now() + REFRESH_TOKEN_EXPIRES_IN_MS,
  );

  if (!isSessionCreated) {
    throw new AppError("Failed to create session", 400);
  }

  redis.set(
    String(session.userId),
    JSON.stringify({
      userId: session.userId,
      hashedRefreshToken,
      expireIn: Date.now() + REFRESH_TOKEN_EXPIRES_IN_MS,
    }),
    "EX",
    3600,
  );

  return res.status(200).json({ success: true, data: { accessToken } });
}
