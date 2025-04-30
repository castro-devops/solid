import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { FetchNearbyGymsService } from "../fetch-nearby-gyms";

export function makeNearbyGymsRepository() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const gymsService = new FetchNearbyGymsService(prismaGymsRepository);
  return gymsService;
}
