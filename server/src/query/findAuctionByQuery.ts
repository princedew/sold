import { AuctionStatus, Condition } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";

export const findAuctionByQuery = async (
  querys: Record<string, unknown>,
) => {
  console.log("reaching ..");
  const { search, status, sortBy, order, page=1, condition, minBid } =
    querys;

  const where: any = {};
  
  if (search) {
    where.description = { contains: String(search), mode: "insensitive" };
  }
  if (status) {
    where.status = status;
  }
  if (condition) {
    where.condition = condition;
  }
  if (minBid) {
    where.startingBid = { gte: Number(minBid) };
  }

  return await prisma.auction.findMany({
    take: 40,
    where,
    orderBy: {
      [String(sortBy) || "createdAt"]: order === "asc" ? "asc" : "desc",
    },
    skip: Number((Number(page)-1)*40),
  });
};
