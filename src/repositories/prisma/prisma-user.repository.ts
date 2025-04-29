import { IUsersRepository } from "@/@types/users.repository";
import { db } from "@/lib/prisma";
import { Prisma, User } from "generated/prisma";

export class PrismaUsersRepository implements IUsersRepository {
  async findById(id: string): Promise<User | null> {
    const userById = await db.user.findUnique({
      where: {
        id,
      },
    });

    return userById;
  }

  async create(data: Prisma.UserCreateInput) {

    const user = await db.user.create({
      data,
    });

    return user;
  }

  async findByEmail( email: string ) {
    const userWithSameEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    return userWithSameEmail;
  }
}
