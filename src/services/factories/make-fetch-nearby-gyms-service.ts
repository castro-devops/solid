import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { FetchNearbyGymsService } from "../fetch-nearby-gyms";

export function makeNearbyGymsRepository() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const service = new FetchNearbyGymsService(prismaGymsRepository);
  return service;
}
