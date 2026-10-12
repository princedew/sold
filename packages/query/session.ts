import { prisma } from "../lib/prisma";

export async function createSession(
  userId: number,
  hashedRefreshToken: string,
  expireIn: number,
) {
  return await prisma.session.create({
    data: {
      userId,
      hashedRefreshToken,
      expireIn: new Date(expireIn),
    },
  });
}

export async function findSession(userId: number) {
  return await prisma.session.findFirst({
    where: { userId, revokeAt: null },
    orderBy: { createdAt: "desc" },
  });
}

export async function revokeSession(sessionId: number) {
  return await prisma.session.update({
    where: { id: sessionId },
    data: { revokeAt: new Date(Date.now()) },
    select: { id: true },
  });
}
