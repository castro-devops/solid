import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { GymsService } from "../create-gym";

export function makeCreateGymService() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const gymsService = new GymsService(prismaGymsRepository);
  return gymsService;
}
