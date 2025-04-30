import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user.repository";
import { GetUserProfileService } from "../get-user-profile";

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfileService = new GetUserProfileService(usersRepository);
  return getUserProfileService;
}
