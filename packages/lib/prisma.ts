import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../db/generated/prisma/client";
import { fileURLToPath } from "node:url";

dotenv.config({
	path: fileURLToPath(new URL("../../.env", import.meta.url)),
	override: true,
});

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL is required to initialize Prisma");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };