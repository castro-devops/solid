import { env } from "@/env";
import { PrismaClient } from "generated/prisma";

export const db = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
