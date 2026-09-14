import { prisma } from "../lib/prisma";

export async function deleteItemRecord(itemId: number, ownerId: number) {
  return prisma.item.deleteMany({ where: { id: itemId, ownerId } });
}
