import { IUsersRepository } from "@/@types/users.repository";
import { Prisma, User } from "generated/prisma";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements IUsersRepository {

  public users: User[] = [];

  async findById(id: string) {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      return null;
    };

    return user;
  }

  async create(data: Prisma.UserCreateInput){
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ?? "MEMBER",
      created_at: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email);

    if (!user) {
      return null;
    };

    return user;
  }
}
