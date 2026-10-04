import { ACCESS_TKN_SIGN_OPTION_IN_MIN } from "@/config/config";
import jwt from "jsonwebtoken";

function log(str: string, fileName: string, val: any): void {
  console.log(`\n> ${str} [${fileName}]: ${val}\n`);
}

export const createRefreshToken = (): string => {
  return crypto.randomBytes(64).toString("hex");
};

type TokenType = "access" | "refresh";

function payload(
  userId: number,
  type: TokenType,
): { userId: number; type: TokenType } {
  return { userId, type };
}

export const createAccessToken = (
  userId: number,
  secret: string,
): string | null => {
  const token = jwt.sign(
    payload(userId, "access"),
    secret,
    ACCESS_TKN_SIGN_OPTION_IN_MIN,
  );
  if (!token) {
    return null;
  }
  return token;
};

export function decodeRefreshToken(refToken: string) {
  log("refToken", "helper.ts", refToken);
  jwt.compare(refToken, )
}
