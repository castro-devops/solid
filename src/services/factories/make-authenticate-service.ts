import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user.repository";
import { AuthenticateService } from "../authenticate";

export function makeAuthenticateService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new AuthenticateService(prismaUsersRepository);
  return service;
}
