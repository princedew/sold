import {
  REFRESH_TKN_COOKIE_CONFIG,
  REFRESH_TOKEN_EXPIRES_IN_MS,
} from "@/config/config";
import { createAccessToken, createRefreshToken } from "@/helpers/helper";
import { AppError } from "@packages/middlewares/errorMiddleware";
import {
  createSession,
  findSessions,
  revokeSession,
} from "@packages/query/session";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

type Session = {
  id: number;
  userId: number;
  hashedRefreshToken: string;
  expireIn: Date;
  revokeAt: Date | null;
  createdAt: Date;
};

type RefreshResponse = {
  success: true;
  data: {
    accessToken: string;
  };
};

export async function refresh(
  req: Request,
  res: Response<RefreshResponse>,
): Promise<Response<RefreshResponse>> {
  const refToken = req.cookies.refreshToken;

  if (!refToken) {
    throw new AppError("refresh token missing.", 400);
  }

  const sessions: Session[] = await findSessions();
  if (!sessions) {
    throw new AppError("sessions not found", 400);
  }

  const secret: string | null = process.env.JWT_SECRET ?? null;

  if (!secret) {
    throw new AppError("JWT not configured", 409);
  }

  let session: Session | null = null;

  for (const s of sessions) {
    const found = await bcrypt.compare(refToken, s.hashedRefreshToken);
    if (found) {
      session = s;
      break;
    }
  }

  if (session === null) {
    throw new AppError("session not found", 404);
  }

  if (session.expireIn <= new Date()) {
    throw new AppError("session expire", 400);
  }

  const accessToken: string | null = createAccessToken(session.userId, secret);
  if (!accessToken) {
    throw new AppError("Failed to create access token", 400);
  }

  const refreshToken: string | null = createRefreshToken();
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

  return res.status(200).json({ success: true, data: { accessToken } });
}
