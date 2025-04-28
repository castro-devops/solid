import { db } from "@/lib/prisma";
import { Prisma } from "generated/prisma";

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {

    await db.user.create({
      data,
    });

    return data;
  }
}
