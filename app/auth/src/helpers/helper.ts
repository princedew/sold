import {
  ACCESS_TKN_SIGN_OPTION_IN_MIN,
  REFRESH_TKN_SIGN_OPTION,
} from "@/config/config";
import jwt from "jsonwebtoken";
import crypto from "crypto";

function log(str: string, fileName: string, val: any): void {
  console.log(`\n> ${str} [${fileName}]: ${val}\n`);
}

export const createRefreshToken = (userId: number, secret: string): string | null => {
  const token = jwt.sign(
    { userId, type: "refresh" },
    secret,
    REFRESH_TKN_SIGN_OPTION,
  );
  if (!token) {
    return null;
  }
  return token;
};

export const createAccessToken = (
  userId: number,
  secret: string,
): string | null => {
  const token = jwt.sign(
    { userId, type: "access" },
    secret,
    ACCESS_TKN_SIGN_OPTION_IN_MIN,
  );
  if (!token) {
    return null;
  }
  return token;
};

export function decodeRefreshToken(refToken: string, secret:string) {
  // log("refToken", "helper.ts", refToken);
  return jwt.verify(refToken, secret);
}
