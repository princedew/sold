import type { CookieOptions } from "express";

export const ACCESS_TOKEN_EXPIRES_IN = "15m";
export const REFRESH_TOKEN_EXPIRES_IN_MS = 30 * 24 * 60 * 60 * 1000;

export const ACCESS_TKN_SIGN_OPTION_IN_MIN = {
  expiresIn: 15 * 60 * 1000,
};

export const REFRESH_TKN_SIGN_OPTION = {
  expiresIn: 30 * 24 * 60 * 60 * 1000,
};

export const REFRESH_TKN_COOKIE_CONFIG: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: REFRESH_TOKEN_EXPIRES_IN_MS,
};
