import { prisma } from "../lib/prisma";

export async function getItemByIdRecord(itemId: number) {
  return prisma.item.findUnique({ where: { id: itemId } });
}