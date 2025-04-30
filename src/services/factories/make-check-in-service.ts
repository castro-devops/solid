import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";
import { CheckInsService } from "../check-in";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";

export function makeCheckInService() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const prismaGymsRepository = new PrismaGymsRepository();
  const checkInsService = new CheckInsService(prismaCheckInsRepository ,prismaGymsRepository);
  return checkInsService;
}
