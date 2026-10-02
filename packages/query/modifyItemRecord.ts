import { prisma } from "../lib/prisma";

export async function modifyItemRecord(
  itemId: number,
  ownerId: number,
  data: { name: string; description: string },
) {
  return prisma.item.update({ where: { id: itemId, ownerId }, data });
}
