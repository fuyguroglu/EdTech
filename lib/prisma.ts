import { PrismaClient } from "@/lib/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

// Create adapter for database connection
const getAdapter = () => {
  const databaseUrl = process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder";

  if (!globalForPrisma.pool) {
    globalForPrisma.pool = new Pool({ connectionString: databaseUrl });
  }

  return new PrismaPg(globalForPrisma.pool);
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: getAdapter(),
} as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
