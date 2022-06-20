import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";

declare global {
  var prisma: PrismaClient | undefined;
}

const opts: PrismaClientOptions = {
  log: ["error", "info", "query", "warn"],
  datasources: {
    db: {
      url: process.env.DATABASE_MIGRATE_URL
    }
  }
};

const prisma = global.prisma || new PrismaClient(opts as any);

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
