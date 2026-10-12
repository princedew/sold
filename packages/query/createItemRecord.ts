import { prisma } from "../lib/prisma";

export async function createItemRecord(
  ownerId: number,
  name: string,
  description: string,
) {
  return prisma.item.create({ data: { ownerId, name, description } });
}