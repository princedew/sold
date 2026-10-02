import { prisma } from "../lib/prisma";

export async function getItemsByQueryRecord(
  userId: number,
  querys: Record<string, unknown>,
) {
  const { search, page } = querys;
  console.log("querys :", querys);
  
  const LIMIT = 40;
  const where: any = { ownerId: userId };
  const skip = (Number(page || 1) - 1) * Number(LIMIT);
  console.log("skip :", skip);
  if (search) {
    where.description = {
      contains: String(search),
      mode: "insensitive",
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    const items = await tx.item.findMany({
      where,
      skip,
      take: Number(LIMIT),
      orderBy: { createdAt: "desc" },
    });

    const totalRows = await tx.item.count({ where });

    return { itemsArray: items, totalRows };
  });

  return result;
}