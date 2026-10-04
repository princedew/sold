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

export async function findSessions() {
  return await prisma.session.findMany({
    where: { revokeAt: null },
  });
}

export async function revokeSession(sessionId: number) {
  return await prisma.session.update({
    where: { id: sessionId },
    data: { revokeAt: new Date(Date.now()) },
    select: { id: true },
  });
}
